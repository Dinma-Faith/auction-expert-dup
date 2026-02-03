// components/footer/footer-contact.tsx

import Link from "next/link"
import { Mail, Phone } from "lucide-react"

export default function FooterContact() {
  return (
    <div>
      <h4 className="mb-4 text-base font-semibold text-white">
        Contact
      </h4>

      <div className="space-y-3 text-sm text-gray-300">
        <p className="flex items-center gap-2">
          <Mail size={16} />
          support@auctionexpert.com
        </p>

        <p className="flex items-center gap-2">
          <Phone size={16} />
          +1 (234) 567-8900
        </p>

        <Link
          href="/contact"
          className="inline-block pt-2 text-blue-500 hover:underline"
        >
          Contact Us →
        </Link>
      </div>
    </div>
  )
}
