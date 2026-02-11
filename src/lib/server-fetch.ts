const API_BASE_URL = "https://extapi.okdimall.com/api";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Lang: "vi",
  CurrencyCode: "VND",
};

async function serverFetch<T>(
  path: string,
  options?: { method?: string; body?: unknown }
): Promise<T | null> {
  const { method = "GET", body } = options || {};
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: DEFAULT_HEADERS,
      body: body ? JSON.stringify(body) : undefined,
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    if (json?.success) return json.data as T;
    return null;
  } catch {
    return null;
  }
}

export async function fetchHomeImages() {
  return serverFetch<{
    banners: any[];
    videoURL: string;
    videoBackground: string;
    videoImage: string;
    videoAvt: string;
  }>("/category/categories-imagehome");
}

export async function fetchVoucherCategories() {
  return serverFetch<any[]>("/voucher/categories");
}

export async function fetchRecommendHotelsServer() {
  return serverFetch<any[]>("/supplier/recommend-hotels", {
    method: "POST",
    body: { type: 3 },
  });
}

export async function fetchRegionsServer() {
  return serverFetch<any[]>("/category/regions");
}
