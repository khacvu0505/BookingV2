import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty);
}

// For iframe embeds — allows iframe tags specifically
export function sanitizeIframe(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "src"],
  });
}
