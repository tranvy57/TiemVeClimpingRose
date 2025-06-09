import Header from "./components/header";
import Hero from "./components/hero";

const Home = () => {
  return (
    <div className="px-20 py-10 gap-4 flex flex-col">
      <Header />
      <main className="pt-[72px] px-6 md:px-20 py-10 flex flex-col gap-4">
        <Hero />
        {/* Thêm các section khác */}
      </main>
    </div>
  );
};

export default Home;
