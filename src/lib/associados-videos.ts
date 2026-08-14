import { and, asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { ruachVideos } from "@/db/schema";
import {
  LUME_VIDEOS,
  RUACH_LESSONS,
  type AssociadosVideo,
} from "@/lib/associados-content";

export type MemberVideoSection = "ruach" | "leme";

export type AssociadosHubVideo = {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  thumbnailUrl: string | null;
  duration: string | null;
};

const DEFAULT_BY_SECTION: Record<MemberVideoSection, readonly AssociadosVideo[]> = {
  ruach: RUACH_LESSONS,
  leme: LUME_VIDEOS,
};

function defaultsForSection(section: MemberVideoSection): AssociadosHubVideo[] {
  return DEFAULT_BY_SECTION[section].map((video, index) => ({
    id: `default-${section}-${index}`,
    title: video.title,
    description: "description" in video ? (video.description ?? null) : null,
    videoUrl: video.videoUrl,
    thumbnailUrl: null,
    duration: video.duration,
  }));
}

export async function getAssociadosVideos(
  section: MemberVideoSection,
): Promise<AssociadosHubVideo[]> {
  const rows = await getDb()
    .select({
      id: ruachVideos.id,
      title: ruachVideos.title,
      description: ruachVideos.description,
      videoUrl: ruachVideos.videoUrl,
      thumbnailUrl: ruachVideos.thumbnailUrl,
      duration: ruachVideos.duration,
    })
    .from(ruachVideos)
    .where(and(eq(ruachVideos.section, section), eq(ruachVideos.published, true)))
    .orderBy(asc(ruachVideos.sortOrder));

  if (rows.length > 0) {
    return rows;
  }

  return defaultsForSection(section);
}

export async function getAdminVideos(section: MemberVideoSection) {
  return getDb()
    .select()
    .from(ruachVideos)
    .where(eq(ruachVideos.section, section))
    .orderBy(asc(ruachVideos.sortOrder));
}
