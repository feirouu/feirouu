import Link from "next/link";

import { siteLabel } from "@/config";

export function SiteFooter() {
  return (
    <footer className="text-xs text-center py-8">
      <p>
        © {new Date().getFullYear()}{" "}
        <Link
          href="/"
          className="border-transparent hover:border-current border-b-2"
        >
          {siteLabel}
        </Link>
      </p>
    </footer>
  );
}
