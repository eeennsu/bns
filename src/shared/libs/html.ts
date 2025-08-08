import DOMPurify from 'dompurify';

export const sanitizeHtml = (html: string) => {
  const sanitizedHtml = DOMPurify.sanitize(html);

  return sanitizedHtml;
};
