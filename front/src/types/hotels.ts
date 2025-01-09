interface Hotel {
  id: number;
  name: string;
  stars: number;
  preview: string;
  pictureId: string;
  reviewsAvgScore: number;
  reviewsCount: number;
  price: number;
  discountPrice: number;
  isAvailable: boolean;
}

export { Hotel };
