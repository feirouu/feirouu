import Link from "next/link";

import type { PostMeta } from "@/types";
import { formatDate } from "@/lib/format";

export function PostCard({ meta }: { meta: PostMeta }) {
  return (
    <Link href={meta.slug}>
      <section>
        <h2 className="font-semibold text-lg mb-2">{meta.title}</h2>
        <p className="mb-2 line-clamp-2">{meta.description}</p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          {" • "}
          {meta.readingTime} min
        </p>
      </section>
    </Link>
  );
}
