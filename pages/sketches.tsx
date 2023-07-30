import type { ReactElement } from "react";
import Head from "next/head";

import { DefaultLayout } from "@/components/layout/default";

export default function Sketches() {
  return <div></div>;
}

Sketches.getLayout = (page: ReactElement) => DefaultLayout(page, "sketches");
