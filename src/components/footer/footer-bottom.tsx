import * as React from "react";

interface FooterBottomProps {
  children?: React.ReactNode;
}

export default function FooterBottom({ children }: FooterBottomProps) {
  return (
    <div className="mt-8">
      
      {/* Social links ABOVE the border */}
      {children && (
        <div className="flex justify-center pb-3">
          {children}
        </div>
      )}

      {/* Border acts as underline */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Auction Expert. All rights reserved.
        </div>
      </div>
    </div>
  );
}
