export interface ICoupon {
  couponId: string;
  code: string;
  imageUrl: string;
  description: string;
  condition: string;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
}
