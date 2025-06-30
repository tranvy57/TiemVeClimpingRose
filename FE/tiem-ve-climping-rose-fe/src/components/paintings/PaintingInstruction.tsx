import Image from "next/image";
import React from "react";

const PaintingInstruction = () => {
  return (
    <div>
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
        🖼 Bản vẽ nháp bằng giấy giúp bản có thể đối chiếu nếu bị tô sai trên vải
        hoặc dùng khi bạn muốn dặm thêm một lượt màu nữa cho tranh khi tô xong.
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

      <p className="text-xl text-red-400 font-semibold">✅ HƯỚNG DẪN CÁCH TÔ</p>

      <p>
        -Bước 1: Làm sạch khu vực vẽ tranh để tránh bẩn vải, chuẩn bị một cốc
        nước và giấy ăn mềm. Vì bút vẽ sử dụng lần đầu nên bạn có thể ngâm rửa
        nhẹ để đầu lông mềm mại. rửa bút mỗi khi chuyển màu hoặc kết thúc công
        việc để tránh dây màu vẽ. Màu vẽ sơn rất mịn, mượt bay hơi và khô khá
        nhanh là ưu điểm nhưng vì vậy khi vẽ xong cần đóng nắp để tránh khô,
        chất liệu màu rất tốt nếu được bảo quản đúng cách có thể dung tới 10
        năm. Với các màu cần dung nhiều hãng sẽ cung cấp nhiều lọ màu hơn vì thế
        khi vẽ thường màu sẽ dư màu các bạn không cần tiết kiệm hơn nữa khi tô
        đậm thì mới đảm bảo che hết số và viền đen trên tranh.
      </p>

      <p>
        {" "}
        Bước 2: Vẽ các màu cùng số trong 1 sẽ giúp bạn tiết kiệm thời gian rửa
        bút. Nếu cần đẩy nhanh tốc độ 2 đến 3 người có thể vẽ 1 bức tranh cùng
        lúc tùy độ to nhỏ của bức tranh. Người vẽ nên vẽ từ trái sang phải. Khi
        tì tay quá mạnh và làm nhòe mực in của các số chưa vẽ bạn có thể dùng tờ
        A4 đánh số đính kèm để dò lại. Nếu lỡ tô sai thì các bạn chờ khô cạo nhẹ
        cho bay bớt lớp màu và tô đè màu đúng lên nhé.
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
  );
};

export default PaintingInstruction;
