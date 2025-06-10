import CategoryList from "./components/category/category-list";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";

const Home = () => {
  return (
    <div className="gap-4 flex flex-col">
      <Header />
      <main className="pt-[90px] px-2 md:px-20 py-10 flex flex-col gap-10">
        <Hero />
        <CategoryList />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
