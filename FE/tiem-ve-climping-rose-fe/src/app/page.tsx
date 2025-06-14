import {
  CategoryList,
  ImageCarousel,
  OptionList,
  CouponList,
} from "@/components/home";

export default function HomePage() {
  console.log("BUILD TIME ENV CHECK:", process.env.NEXT_PUBLIC_API_URL);
  return (
    <div>
      <ImageCarousel />
      <OptionList />
      <CouponList />
      <CategoryList />
    </div>
  );
}
