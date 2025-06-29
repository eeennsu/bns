
export const extractUploadThingFileKey = (url: string): string | null => {
  const match = url.match(/\/f\/([^/?]+)/); // ?나 query string 있을 수도 있으니 잘라줌
  return match ? match[1] : null;
}
