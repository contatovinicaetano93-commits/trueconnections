const DEFAULT_BASE44_APP_ID = "6a354520e06c23aeee38bc88";
const BASE44_API = "https://app.base44.com/api/apps";
const BASE44_PAGE_SIZE = 5000;

export type Base44PartnerBrand = {
  id: string;
  name: string;
  offer: string;
  description?: string | null;
  category?: string | null;
  website_url?: string | null;
  logo_url?: string | null;
  created_date?: string;
  updated_date?: string;
};

export type Base44EstudoBiblico = {
  id: string;
  titulo: string;
  capitulos?: string | null;
  conteudo: string;
  video_url?: string | null;
  livro?: string | null;
  categoria?: string | null;
  created_date?: string;
  updated_date?: string;
};

export type Base44Event = {
  id: string;
  title: string;
  date?: string | null;
  location?: string | null;
  description?: string | null;
  price?: string | null;
  image_url?: string | null;
  type?: string | null;
  category?: string | null;
  spots_total?: number | null;
  spots_taken?: number | null;
  created_date?: string;
  updated_date?: string;
};

function appId() {
  return process.env.BASE44_APP_ID?.trim() || DEFAULT_BASE44_APP_ID;
}

export async function fetchBase44Entity<T>(
  entityName: string,
  revalidate = 300,
): Promise<T[]> {
  const records: T[] = [];
  let skip = 0;

  while (true) {
    const response = await fetch(
      `${BASE44_API}/${appId()}/entities/${entityName}?limit=${BASE44_PAGE_SIZE}&skip=${skip}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate },
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(
        `Base44 ${entityName} request failed (${response.status}): ${detail.slice(0, 200)}`,
      );
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
      throw new Error(`Base44 ${entityName} returned unexpected payload`);
    }

    const page = data as T[];
    records.push(...page);
    if (page.length < BASE44_PAGE_SIZE) break;
    skip += BASE44_PAGE_SIZE;
  }

  return records;
}

export async function fetchBase44PartnerBrands(revalidate = 300) {
  return fetchBase44Entity<Base44PartnerBrand>("PartnerBrand", revalidate);
}

export async function fetchBase44Estudos(revalidate = 0) {
  return fetchBase44Entity<Base44EstudoBiblico>("EstudoBiblico", revalidate);
}

export async function fetchBase44Events(revalidate = 300) {
  return fetchBase44Entity<Base44Event>("Event", revalidate);
}
