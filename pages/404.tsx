import type { ReactElement } from "react";

import { DefaultLayout } from "@/components/layout/default";

export default function Custom404() {
  return (
    <section className="text-center">
      <h1 className="text-5xl">404</h1>
      <p className="mt-8 text-xl">Page Not Found</p>
    </section>
  );
}

Custom404.getLayout = (page: ReactElement) => DefaultLayout(page, "");
