import {
  CategoryList,
  ImageCarousel,
  OptionList,
  CouponList,
} from "@/components/home";
import NewPaintings from "@/components/home/NewPaintings";

export default function HomePage() {
  return (
    <div>
      <ImageCarousel />
      <OptionList />
      <CouponList />
      <NewPaintings />
      <CategoryList />
    </div>
  );
}
