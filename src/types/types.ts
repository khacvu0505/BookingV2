export const personType = {
  Adult: "Người lớn",
  Child: "Trẻ em",
  Old: " Người già",
} as const;

export type PersonTypeKey = keyof typeof personType;
