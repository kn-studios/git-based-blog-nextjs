import {
  articlesDirectory,
  getArticleMetadata,
  markdownFiles,
} from "@/lib/process-articles";
import { slugify } from "@/lib/slugify";
import Link from "next/link";
const fs = require("node:fs");
const path = require("node:path");

export default function Home() {
  const items = markdownFiles.map((fileName: string) => {
    const filePath = path.join(articlesDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    // Extract metadata using regular expressions
    const metadata = getArticleMetadata(fileContent);

    // Extract slug from the file name
    const slug = slugify(fileName.replace(".md", ""));
    return { slug, metadata };
  });
  return (
    <div className="flex flex-col">
      {items.map((o) => (
        <Link
          key={o.slug}
          className="mb-3 hover:underline"
          href={`/articles/${o.slug}`}
        >
          {o.metadata?.title || ""}
        </Link>
      ))}
    </div>
  );
}
