import Image from "next/image";

const Hero = () => {
  return (
    <div className="">
      <Image
        src={
          "https://static.vecteezy.com/system/resources/thumbnails/004/299/834/small/shopping-online-on-phone-with-podium-paper-art-modern-pink-background-gifts-box-illustration-free-vector.jpg"
        }
        alt="logo"
        layout="responsive"
        width={1200} // tỉ lệ gốc (có thể là 16:9, 4:3,...)
        height={600}
        className="rounded-4xl"
      />
    </div>
  );
};

export default Hero;
