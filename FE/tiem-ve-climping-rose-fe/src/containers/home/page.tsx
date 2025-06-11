import CategoryList from "./components/category/category-list";
import CouponList from "./components/coupons/coupon-list";
import Footer from "./components/footer";
import Header from "./components/header/header";
import Hero from "./components/hero";
import OptionList from "./components/options/option-list";

const Home = () => {
  return (
    <div className="gap-4 flex flex-col">
      <Header />
      <main className="pt-[90px] px-0 md:px-20 py-10 flex flex-col md:gap-8">
        <Hero />
        <OptionList />
        <CouponList />
        <CategoryList />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
