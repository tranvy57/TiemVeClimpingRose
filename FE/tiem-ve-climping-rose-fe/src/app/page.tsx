import {
  CategoryList,
  ImageCarousel,
  OptionList,
  CouponList,
} from "@/components/home";

export default function HomePage() {
  return (
    <div>
      <ImageCarousel />
      <OptionList />
      <CouponList />
      <CategoryList />
    </div>
  );
}
