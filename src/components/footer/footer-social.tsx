"use client";

import * as React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
}

const socialLinks: SocialLink[] = [
  { name: "Facebook", icon: <FaFacebookF />, url: "https://facebook.com" },
  { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com" },
  { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com" },
  { name: "LinkedIn", icon: <FaLinkedinIn />, url: "https://linkedin.com" },
];

export default function FooterSocial() {
  return (
    <div className="flex gap-3">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="
            bg-[#6E6B70]
            w-10 h-10
            rounded-full
            flex items-center justify-center
            text-white
            hover:bg-gray-500
            transition-colors
          "
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
