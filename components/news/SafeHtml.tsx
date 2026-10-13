"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

const allowedTags = [
  "a", "blockquote", "br", "div", "em", "h1", "h2", "h3", "hr", "img",
  "li", "ol", "p", "span", "strong", "table", "tbody", "td", "th", "thead",
  "tr", "u", "ul",
];

const allowedAttributes = [
  "alt", "colspan", "data-align", "data-columns", "data-image-gallery", "data-width",
  "height", "href", "rel", "rowspan", "src", "target", "title", "width",
];

export default function SafeHtml({ html, className }: { html: string; className?: string }) {
  const [safeHtml, setSafeHtml] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSafeHtml(DOMPurify.sanitize(html, {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: allowedAttributes,
        FORBID_TAGS: ["style", "svg", "math", "iframe", "object", "embed", "form"],
        FORBID_ATTR: ["style"],
      }));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [html]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
