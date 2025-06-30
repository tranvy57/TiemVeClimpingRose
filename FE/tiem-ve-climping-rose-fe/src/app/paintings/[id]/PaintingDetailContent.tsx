import { getPaitingById } from "@/api/paintingApi";
import AddToCartSection from "@/components/paintings/AddToCartSection";
import { Separator } from "@/components/ui/separator";
import { ICategory, IPainting } from "@/types/implements/painting";
import { BadgeJapaneseYen } from "lucide-react";
import Image from "next/image";

interface PaintingDetailContentProps {
  id: string;
}
export default async function PaintingDetailContent({
  id,
}: PaintingDetailContentProps) {
  const res = await getPaitingById(id);

  if (!res.data) {
    return <p className="text-center mt-10">Không tìm thấy tranh</p>;
  }

  const painting: IPainting = res.data;
  const categories: ICategory[] = painting.categories;

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2 aspect-square mt-4">
          <Image
            src={painting.imageUrl}
            alt={painting.name}
            fill
            className="object-cover rounded"
          />
        </div>

        <div className="py-4 md:px-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-red-500">
            {painting.name}
          </h1>
          <p className=" md:mt-4 text-gray-700">{painting.paintingId}</p>

          <div className="flex items-center">
            <p className="mt-2 text-red-400 font-bold text-2xl lg:text-3xl">
              ¥{painting.price}
            </p>
          </div>

          <div className="flex gap-4">
            {categories.map((c) => (
              <p
                key={c.categoryId}
                className="bg-red-300 font-semibold p-1 rounded-sm"
              >
                {c.name}
              </p>
            ))}
          </div>
          <p className="mt-2">Số lượng sẵn có: {painting.quantity}</p>

          <AddToCartSection
            paintingId={painting.paintingId}
            stock={painting.quantity}
          />
        </div>
      </div>

      {/* Mô tả */}
      <div>
        <Separator className="my-6" />
        <p className="text-xl text-red-400 font-semibold">
          ✅ SẢN PHẨM BAO GỒM:{" "}
        </p>
        <p>
          ️🎨 Bộ màu vẽ có đánh số: Các lọ màu vẽ được đánh số tương ứng với số
          được đánh trên tranh, có chất lượng cao cấp và màu sắc rực rỡ, độ bền
          màu cao, an toàn cho sức khỏe người dùng.{" "}
        </p>

        <p>
          🖌 Bộ bút vẽ: với đầu cọ rất mềm và êm ái, dễ dàng điều khiển theo ý
          muốn, linh hoạt trong các nét tô vẽ, cọ có độ ngậm nước khá tốt giúp
          việc chấm và sử dụng thật tiện lợi không tốn thời gian thấm màu.
        </p>

        <p>
          🖼 Bản vẽ nháp bằng giấy giúp bản có thể đối chiếu nếu bị tô sai trên
          vải hoặc dùng khi bạn muốn dặm thêm một lượt màu nữa cho tranh khi tô
          xong.
        </p>

        <p>🔧Ngoài ra còn có các phụ kiện đi kèm:</p>
        <br />
        <Image
          src="/paintings/phukien.jpg"
          alt="Phụ kiện"
          width={500}
          height={500}
        />

        <br />

        <p className="text-xl text-red-400 font-semibold">
          ✅ HƯỚNG DẪN CÁCH TÔ
        </p>

        <p>
          -Bước 1: Làm sạch khu vực vẽ tranh để tránh bẩn vải, chuẩn bị một cốc
          nước và giấy ăn mềm. Vì bút vẽ sử dụng lần đầu nên bạn có thể ngâm rửa
          nhẹ để đầu lông mềm mại. rửa bút mỗi khi chuyển màu hoặc kết thúc công
          việc để tránh dây màu vẽ. Màu vẽ sơn rất mịn, mượt bay hơi và khô khá
          nhanh là ưu điểm nhưng vì vậy khi vẽ xong cần đóng nắp để tránh khô,
          chất liệu màu rất tốt nếu được bảo quản đúng cách có thể dung tới 10
          năm. Với các màu cần dung nhiều hãng sẽ cung cấp nhiều lọ màu hơn vì
          thế khi vẽ thường màu sẽ dư màu các bạn không cần tiết kiệm hơn nữa
          khi tô đậm thì mới đảm bảo che hết số và viền đen trên tranh.
        </p>

        <p>
          {" "}
          Bước 2: Vẽ các màu cùng số trong 1 sẽ giúp bạn tiết kiệm thời gian rửa
          bút. Nếu cần đẩy nhanh tốc độ 2 đến 3 người có thể vẽ 1 bức tranh cùng
          lúc tùy độ to nhỏ của bức tranh. Người vẽ nên vẽ từ trái sang phải.
          Khi tì tay quá mạnh và làm nhòe mực in của các số chưa vẽ bạn có thể
          dùng tờ A4 đánh số đính kèm để dò lại. Nếu lỡ tô sai thì các bạn chờ
          khô cạo nhẹ cho bay bớt lớp màu và tô đè màu đúng lên nhé.
        </p>
        <br />
        <Image
          src="/paintings/huongdanto.jpg"
          alt="Phụ kiện"
          width={500}
          height={500}
        />

        <br />
        <p className="text-xl text-red-400 font-semibold">
          ✅ HƯỚNG DẪN TREO TRANH
        </p>
        <br />

        <Image
          src="/paintings/huongdantreo.jpg"
          alt="Phụ kiện"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
