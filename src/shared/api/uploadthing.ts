export const extractUploadThingFileKey = (url: string): string | null => {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split('/');
    const key = segments[segments.length - 1];
    return key || null;
  } catch {
    return null;
  }
};
