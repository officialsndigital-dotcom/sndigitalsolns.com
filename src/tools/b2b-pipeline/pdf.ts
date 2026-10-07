import type { ReportSection } from "./report";

const NAVY: [number, number, number] = [23, 45, 96];
const AMBER: [number, number, number] = [234, 162, 37];

/** Builds and downloads the PDF in the browser. jsPDF is loaded only when needed. */
export async function downloadReportPdf(sections: ReportSection[], meta: { name: string; company?: string; date: string; siteUrl: string }) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;
  let y = 0;

  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 96, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("B2B Pipeline & Revenue Report", M, 48);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Prepared for ${meta.name}${meta.company ? `, ${meta.company}` : ""} · ${meta.date}`, M, 72);
  y = 130;

  const ensure = (h: number) => {
    if (y + h > H - 60) {
      doc.addPage();
      y = 60;
    }
  };

  // Text containing ₹ etc. falls outside the built-in font; replace currency symbols with codes.
  const safe = (s: string) => s.replace(/₹/g, "INR ").replace(/[^\x20-\x7E•·–]/g, "");

  for (const s of sections) {
    ensure(40);
    doc.setTextColor(...NAVY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(s.title, M, y);
    doc.setDrawColor(...AMBER);
    doc.setLineWidth(2);
    doc.line(M, y + 6, M + 40, y + 6);
    y += 24;
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    if ("rows" in s) {
      for (const [k, v] of s.rows) {
        const lines = doc.splitTextToSize(safe(v), W - M * 2 - 220);
        ensure(lines.length * 14 + 4);
        doc.setFont("helvetica", "normal");
        doc.text(safe(k), M, y);
        doc.setFont("helvetica", "bold");
        doc.text(lines, M + 220, y);
        y += lines.length * 14 + 4;
      }
    } else {
      doc.setFont("helvetica", "normal");
      for (const l of s.lines) {
        const lines = doc.splitTextToSize(safe(l), W - M * 2);
        ensure(lines.length * 14 + 6);
        doc.text(lines, M, y);
        y += lines.length * 14 + 6;
      }
    }
    y += 16;
  }

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(110, 110, 110);
    doc.text(`S N Digital Solns Pvt. Ltd. · ${meta.siteUrl.replace(/^https?:\/\//, "")} · Book a 10 minute free consultation: ${meta.siteUrl}/book-consultation/`, M, H - 30);
  }
  doc.save("b2b-pipeline-report.pdf");
}
