import Image from "next/image";

const Hero = () => {
  return (
    <div className="">
      <Image
        src={
          "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/468299847_122153378348290227_681816527869430812_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeE8Y1J_qSlLrVDzGlXVF1LLv_bw8KSRy4q_9vDwpJHLiiASZkRYv9Ux0Hlo6SzLO3Yux8XFvTy1pJLxJWKTq0gj&_nc_ohc=gmj4nUjBKH0Q7kNvwGAwfmu&_nc_oc=AdlKKDTySJ5i2zRWOhEn3M4hZPKv48nfJxmemQUAFdVn_P4qEfsSRm1C-9bhQLAyo18&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=4B7I5yduVZ7vgHIm7OMQtA&oh=00_AfNrSMFTlt4s4RrhtlIsQrUMOERTrjwdr7v0WkQzzRZxZg&oe=684CFE6C"
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
