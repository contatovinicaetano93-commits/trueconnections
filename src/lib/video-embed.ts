export function embedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

export function isDirectVideo(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("blob.vercel-storage.com")) return true;
    return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(parsed.pathname);
  } catch {
    return false;
  }
}
