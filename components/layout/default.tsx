import type { ReactElement } from "react";

import { SiteHeader } from "@/components/page/site-header";
import { SiteFooter } from "@/components/page/site-footer";

export function DefaultLayout(page: ReactElement, nav: string) {
  return (
    <>
      <SiteHeader activeNav={nav} />
      <main className="max-w-xl mx-auto min-h-screen px-4 md:px-0">{page}</main>
      <SiteFooter />
    </>
  );
}
