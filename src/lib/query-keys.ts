export const commonKeys = {
  all: ["common"] as const,
  countries: () => [...commonKeys.all, "countries"] as const,
  regions: () => [...commonKeys.all, "regions"] as const,
  imageHome: () => [...commonKeys.all, "imageHome"] as const,
  profile: () => [...commonKeys.all, "profile"] as const,
};

export const promotionKeys = {
  all: ["promotion"] as const,
  supplierTypes: () => [...promotionKeys.all, "supplierTypes"] as const,
  voucherCategories: () =>
    [...promotionKeys.all, "voucherCategories"] as const,
  list: (params: Record<string, unknown>) =>
    [...promotionKeys.all, "list", params] as const,
};

export const newsKeys = {
  all: ["news"] as const,
  topPosts: (regionId: string, page: number) =>
    [...newsKeys.all, "topPosts", regionId, page] as const,
  relatedPosts: () => [...newsKeys.all, "relatedPosts"] as const,
  byRegion: (regionId: string, cateId: number) =>
    [...newsKeys.all, "byRegion", regionId, cateId] as const,
  toursRecommend: () => [...newsKeys.all, "toursRecommend"] as const,
};

export const searchKeys = {
  all: ["search"] as const,
  location: (keyword: string, type: number) =>
    [...searchKeys.all, "location", keyword, type] as const,
  general: (keyword: string) =>
    [...searchKeys.all, "general", keyword] as const,
  regions: () => [...searchKeys.all, "regions"] as const,
  hashtags: () => [...searchKeys.all, "hashtags"] as const,
};

export const destinationKeys = {
  all: ["destination"] as const,
  popular: (categoryId: number) =>
    [...destinationKeys.all, "popular", categoryId] as const,
};

export const hotelKeys = {
  all: ["hotel"] as const,
  list: (params: Record<string, unknown>) =>
    [...hotelKeys.all, "list", params] as const,
  voteSupplier: (hotelCode: string) =>
    [...hotelKeys.all, "voteSupplier", hotelCode] as const,
  comments: (hotelCode: string, page: number) =>
    [...hotelKeys.all, "comments", hotelCode, page] as const,
  policies: (slug: string) =>
    [...hotelKeys.all, "policies", slug] as const,
  imageLibrary: (supplierCode: string) =>
    [...hotelKeys.all, "imageLibrary", supplierCode] as const,
};

export const bookingKeys = {
  all: ["booking"] as const,
  history: (params: Record<string, unknown>) =>
    [...bookingKeys.all, "history", params] as const,
  detail: (id: string) =>
    [...bookingKeys.all, "detail", id] as const,
  detailTour: (id: string) =>
    [...bookingKeys.all, "detailTour", id] as const,
};

export const tourKeys = {
  all: ["tour"] as const,
  list: (params: Record<string, unknown>) =>
    [...tourKeys.all, "list", params] as const,
  detail: (slug: string) =>
    [...tourKeys.all, "detail", slug] as const,
  policies: (slug: string) =>
    [...tourKeys.all, "policies", slug] as const,
  services: (supplierCode: string, date: string) =>
    [...tourKeys.all, "services", supplierCode, date] as const,
};
