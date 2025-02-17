import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Markdown from "react-markdown";
import { notFound } from "next/navigation";
import {
  // dark,
  // atomDark,
  // ghcolors,
  materialDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  articlePaths,
  articlesDirectory,
  markdownFiles,
} from "@/lib/process-articles";

const _theme = materialDark;
const fs = require("node:fs");
const path = require("node:path");

export default async function ArticleContentPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const matchIndex = articlePaths.findIndex((_slug) => _slug === slug);
  if (matchIndex < 0) return notFound();
  const fileName = markdownFiles[matchIndex];
  const filePath = path.join(articlesDirectory, fileName);
  const fileContent: string = fs.readFileSync(filePath, "utf-8");
  const metadataRegex = /---([\s\S]*?)---/;
  const content = fileContent.replace(metadataRegex, "").trim();
  return (
    <Markdown
      components={{
        h1: (props) => (
          <div className="mt-5 mb-2 text-2xl text-purple-500" {...props} />
        ),
        h2: (props) => (
          <div className="mt-5 mb-2 text-green-600 text-lg" {...props} />
        ),
        h3: (props) => (
          <div className="mt-5 mb-2 text-base text-green-600" {...props} />
        ),
        code: (props) => {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            // @ts-ignore
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              language={match[1]}
              style={_theme}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
        a: (props) => {
          return (
            <a
              className="text-purple-500 underline"
              target={props.href?.startsWith("/") ? "_self" : "_blank"}
              href={props.href}
            >
              {props.children}
            </a>
          );
        },
      }}
      className="lg:max-w-[600px]"
    >
      {content}
    </Markdown>
  );
}
