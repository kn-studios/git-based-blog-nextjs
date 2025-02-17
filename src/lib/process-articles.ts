import { slugify } from "./slugify";

const fs = require("node:fs");
const path = require("node:path");

export const articlesDirectory = path.join(process.cwd(), "src", "articles");

const fileNames = fs.readdirSync(articlesDirectory);

export const markdownFiles: string[] = fileNames.filter((fileName: string) =>
  fileName.endsWith(".md"),
);

export const articlePaths = markdownFiles.map((str) =>
  slugify(str.replace(".md", "")),
);

export function getArticleMetadata(
  fileContent: ReturnType<typeof fs.readFileSync>,
) {
  const metadataRegex = /---([\s\S]*?)---/;
  const metadataMatch = fileContent.match(metadataRegex);
  const metadataString = metadataMatch ? metadataMatch[1] : "";
  const metadataPairs = metadataString.split("\n").filter(Boolean);
  const metadata: { [key: string]: string } = {};

  for (const pair of metadataPairs) {
    const [key, value] = pair.split(":").map((item: string) => item.trim());
    metadata[key] = value;
  }

  return metadata;
}
