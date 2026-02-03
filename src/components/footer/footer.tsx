import { footerSections } from "./footer-data";
import FooterColumn from "./footer-column";
import FooterContact from "./footer-contact";
import FooterBottom from "./footer-bottom";
import FooterSocial from "./footer-social";

export default function Footer() {
  return (
    <footer className="bg-[#0b0f1a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {footerSections.map((section) => (
            <FooterColumn
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
          <FooterContact />
        </div>
      </div>

      <FooterBottom>
        <FooterSocial />
      </FooterBottom>
    </footer>
  );
}
