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
