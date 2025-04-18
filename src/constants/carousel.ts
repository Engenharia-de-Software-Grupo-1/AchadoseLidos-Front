export const CARD_SIZES = {
  PRODUCT: {
    BASE_WIDTH: 201,
    MIN_VISIBLE: 1,
    GAP: 10,
  },
  SEBO: {
    BASE_WIDTH: 380,
    MIN_VISIBLE: 1,
    GAP: 24,
  },
} as const; 

export type CardType = keyof typeof CARD_SIZES;