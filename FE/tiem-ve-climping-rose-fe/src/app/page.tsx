import CategoryList from "@/components/home/category/category-list";
import CouponList from "@/components/home/coupons/coupon-list";
import ImageCarousel from "@/components/home/hero";
import OptionList from "@/components/home/options/option-list";

export default function Page() {
  return (
    <div>
      <ImageCarousel />
      <OptionList />
      <CouponList />
      <CategoryList />
    </div>
  );
}
