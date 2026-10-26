export function getLocalProjectPreviewPath(id: string, hasLiveUrl: boolean): string | null {
  if (!hasLiveUrl || !/^[a-z0-9-]{1,90}$/i.test(id)) return null;
  return `/assets/portfolio-previews/${id}.webp`;
}
