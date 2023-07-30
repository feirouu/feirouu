import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteTitle } from "@/config";

export function SiteHeader({ activeNav }: { activeNav: string }) {
  const navs = [
    { uri: "/", name: "says", label: "Blog" },
    { uri: "/sketches", name: "sketches", label: " Sketches" },
    { uri: "/about", name: "about", label: "About" },
  ];

  return (
    <header className="text-center py-8 px-4 md:px-0">
      <section className="mb-2">
        <Link href="/">
          <strong className="font-semibold hover:text-rose-600 dark:hover:text-rose-800">
            {siteTitle}
          </strong>
        </Link>
      </section>
      <nav className="mb-8">
        {/* <ul className="py-2">
          {navs.map((n) => (
            <li
              key={n.uri}
              className={cn(
                "inline-block mr-5 last:mr-0 underline-offset-4 border-transparent border-b-2 hover:border-current",
                activeNav === n.name && "border-current"
              )}
            >
              <Link href={n.uri} passHref={true}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul> */}
      </nav>
    </header>
  );
}
