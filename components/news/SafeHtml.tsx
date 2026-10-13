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

export default function SafeHtml({
  html,
  className,
  allowLocalBlobImages = false,
}: {
  html: string;
  className?: string;
  allowLocalBlobImages?: boolean;
}) {
  const [safeHtml, setSafeHtml] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const sanitized = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: allowedAttributes,
        ...(allowLocalBlobImages ? {
          ALLOWED_URI_REGEXP: /^(?:(?:(?:https?|mailto|tel|callto|sms|cid|xmpp|matrix):|blob:)|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
        } : {}),
        FORBID_TAGS: ["style", "svg", "math", "iframe", "object", "embed", "form"],
        FORBID_ATTR: ["style"],
      });
      if (!allowLocalBlobImages) {
        setSafeHtml(sanitized);
        return;
      }

      const document = new DOMParser().parseFromString(sanitized, "text/html");
      document.querySelectorAll("[src^='blob:']:not(img), a[href^='blob:']").forEach((element) => {
        if (element.hasAttribute("src") && !element.matches("img")) element.removeAttribute("src");
        if (element.hasAttribute("href")) element.removeAttribute("href");
      });
      setSafeHtml(document.body.innerHTML);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [allowLocalBlobImages, html]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
