import React from "react";
import CategoryItem from "./category-item";
import Link from "next/link";

const CategoryList = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl md:text-3xl underline decoration-red-500 underline-offset-8">
          Danh mục sản phẩm
        </p>
        <Link href="#" className="font-normal text-red-400 underline">
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-10 lg:gap-16 md:px-4 mt-4 md:mt-10">
        <CategoryItem
          title="Tranh Phật"
          description="Mang đến sự an yên, tĩnh lặng và giá trị tâm linh sâu sắc."
          image_url="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/490562380_122179121594290227_6834458963602336599_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE_ROmPlwDfH0hTVZ55V5eIkoKkHpFYRqOSgqQekVhGo0lMuIXvW-bZfKeiUFowhe4q8dpc2wkTun6s9jk1Mrl8&_nc_ohc=lUTU3NBSipgQ7kNvwHAkMum&_nc_oc=AdkiLMFYX9Nlm2u6wR5_9UIGveMsUs9uWRQzKPkuQAYmPVCyAtZgLQpDZ3pP-7KNmQ8&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=UixSlQ-WwaaMnB4YpU8lcA&oh=00_AfOksyQVqVF3TnTHWoeZ0H4ZDt8wc2M0_pp-mLOPnGszXA&oe=684D04CC"
          href="/category/thieu-nhi"
        />
        <CategoryItem
          title="Tranh thiên nhiên"
          description="Tái hiện vẻ đẹp trong lành, tự do và thanh mát của đất trời."
          image_url="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/502665512_122187590954290227_6682466610719381001_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEFGXyWpHCrX3HixRIdXaYOHNYOljFCOuoc1g6WMUI66lv1Ltcer5XW3NaPNL2xl01srnoM1gH3FrB2BIZK3ewF&_nc_ohc=u5BaFZEBfokQ7kNvwFCtana&_nc_oc=AdmPOcIZJQ7j_llDxycfdTkO6CYliMSyI0kRC6gmYcOluiMdjNEsHHjaL7DcHyVtxhg&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=UiEMbQcviHVOzDE4hVjOJQ&oh=00_AfPE8YBAKEZ6_cF0Nbo-3xsxxMeGMUxe4D4rA5UyggJAjA&oe=684CF664"
          href="/category/thieu-nhi"
        />
        <CategoryItem
          title="Tranh thiếu nữ"
          description="Dịu dàng, tinh khôi và đầy cảm xúc – tranh thiếu nữ là biểu tượng của nét đẹp nữ tính."
          image_url="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/502524045_122187474656290227_2939151682289433025_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGKcRx2XhQ2ZP5H-CUuQdDrtvXMf6iYkue29cx_qJiS5wBc4gA2NyWxTt1D3Y6qwpARvff6X9mywb4eSasYcU18&_nc_ohc=I9PcQZrGnfQQ7kNvwEAcCS4&_nc_oc=AdnTDbKBcSkqZWM0hAIWhWQQx8ENO55Ie0mO7Kk-lo_XcQ0Tmg3_SANrsgi2si-PAx0&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=Ot5dyAS1u1PE2fYEpxI2-Q&oh=00_AfNWd66B-a_A5GMAdJFZAsjk6vFEcp0BOFhac-DwEJzpkg&oe=684D1155"
          href="/category/thieu-nhi"
        />
        <CategoryItem
          title="Tranh cặp đôi"
          description="Biểu tượng của sự gắn kết, ấm áp và yêu thương – lý tưởng để tặng người thương hoặc trang trí phòng đôi."
          image_url="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/481337652_122171419250290227_5439416045508865494_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHgwPzzvdGHaNuYxwdI3H_CtPaV4H-Rcui09pXgf5Fy6H_3vb7EWp0V6UuXt5YzF4WfIbsouNN2hhVTZTN2SPJ-&_nc_ohc=Ftz4VANDFrYQ7kNvwFJ3skj&_nc_oc=AdnuAnUY3IQLRvT1ILL8FX0xA5_hWDicnFKWsmvf2buwiOqRiz9ZaCeaXf_Ryjkl56A&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=TFgo-APtJadX-eqypDZp1Q&oh=00_AfO2F09p7pkAtdLohmCUnu-nE1XnayVbyME1Wh5m2eCSMg&oe=684D0B87"
          href="/category/thieu-nhi"
        />
      </div>
    </div>
  );
};

export default CategoryList;
