// components/footer/footer-column.tsx

import Link from "next/link"

type FooterLink = {
  label: string
  href: string
}

export default function FooterColumn({
  title,
  links,
}: {
  title: string
  links: FooterLink[]
}) {
  return (
    <div>
      <h4 className="mb-4 text-base font-semibold text-white">
        {title}
      </h4>

      <ul className="space-y-3 text-sm text-gray-300">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
