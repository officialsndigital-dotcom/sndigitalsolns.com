import Link from "next/link";

/**
 * Sticky bar on small screens. The company asked for Case Studies, Portfolio and
 * Book a Call here, with WhatsApp moved to the floating button instead.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white text-center text-sm font-bold text-navy-900 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] md:hidden">
      <Link href="/case-studies/" className="py-3.5">
        Case Studies
      </Link>
      <Link href="/portfolio/" className="border-x border-line py-3.5">
        Portfolio
      </Link>
      <Link href="/book-consultation/" data-track="cta_click" className="bg-amber-500 py-3.5">
        Book a Call
      </Link>
    </div>
  );
}
