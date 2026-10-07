import { site } from "@/lib/site";

const icons = {
  linkedin: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zm7 0h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z",
  instagram:
    "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.85-7.8a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0zM21.9 8.3c-.07-1.45-.4-2.73-1.46-3.79S18.1 3.13 16.65 3.06C15.15 3 8.85 3 7.35 3.06 5.9 3.13 4.62 3.46 3.56 4.52S2.18 6.85 2.1 8.3C2.03 9.8 2.03 16.1 2.1 17.6c.07 1.45.4 2.73 1.46 3.79s2.34 1.39 3.79 1.46c1.5.08 7.8.08 9.3 0 1.45-.07 2.73-.4 3.79-1.46s1.39-2.34 1.46-3.79c.08-1.5.08-7.8 0-9.3zM19.95 19.2a3 3 0 0 1-1.7 1.7c-1.17.47-3.95.36-5.25.36s-4.08.1-5.25-.36a3 3 0 0 1-1.7-1.7c-.46-1.17-.36-3.95-.36-5.25s-.1-4.08.36-5.25a3 3 0 0 1 1.7-1.7C8.92 6.55 11.7 6.65 13 6.65s4.08-.1 5.25.36a3 3 0 0 1 1.7 1.7c.47 1.17.36 3.95.36 5.25s.11 4.08-.36 5.25z",
  facebook: "M14 8.5V6.7c0-.8.2-1.2 1.4-1.2H17V2.2h-2.6C11.3 2.2 10.4 3.9 10.4 6.5v2H8v3.3h2.4V22H14V11.8h2.7l.4-3.3z",
};

export function SocialIcons({ className = "", size = 18 }: { className?: string; size?: number }) {
  const entries: [keyof typeof icons, string, string][] = [
    ["linkedin", site.social.linkedin, "LinkedIn"],
    ["instagram", site.social.instagram, "Instagram"],
    ["facebook", site.social.facebook, "Facebook"],
  ];
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {entries.map(([key, href, label]) => (
        <li key={key}>
          <a href={href} target="_blank" rel="noopener" aria-label={`${site.shortName} on ${label}`} className="block opacity-80 hover:opacity-100">
            <svg aria-hidden viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
              <path d={icons[key]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
