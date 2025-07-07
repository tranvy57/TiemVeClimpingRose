export const calculateDeliveryCost = (
  orderItems: { paintingId: string; quantity: number }[],
  paintingMap: Record<string, { size: string; quantity: number }>,
  prefecture: string
): number => {
  let allAre2020 = true;
  let count2020 = 0;

  let maxLength = 0;
  let maxWidth = 0;
  let totalThickness = 0;

  for (const item of orderItems) {
    const painting = paintingMap[item.paintingId];
    if (!painting) {
      throw new Error(`Không tìm thấy paintingId: ${item.paintingId}`);
    }

    if (item.quantity <= 0 || item.quantity > painting.quantity) {
      throw new Error(`Số lượng không hợp lệ cho tranh ID: ${item.paintingId}`);
    }

    const sizeInfo = getSize(painting.size);

    if (painting.size !== "SIZE_20x20") {
      allAre2020 = false;
    } else {
      count2020 += item.quantity;
    }

    maxLength = Math.max(maxLength, sizeInfo.length);
    maxWidth = Math.max(maxWidth, sizeInfo.width);
    totalThickness += sizeInfo.thickness * item.quantity;
  }

  let shipping = 0;

  if (allAre2020) {
    if (count2020 === 1) {
      shipping = 430;
    } else if (count2020 <= 3) {
      shipping = 600;
    } else {
      const totalSize = maxLength + maxWidth + totalThickness;
      if (totalSize <= 60) shipping = 840;
      else if (totalSize <= 80) shipping = 1200;
      else if (totalSize <= 100) shipping = 1500;
      else throw new Error("Tổng kích thước kiện hàng vượt quá giới hạn");
    }
  } else {
    const totalSize = maxLength + maxWidth + totalThickness;
    if (totalSize <= 60) shipping = 840;
    else if (totalSize <= 80) shipping = 1200;
    else if (totalSize <= 100) shipping = 1500;
    else throw new Error("Tổng kích thước kiện hàng vượt quá giới hạn");
  }

  const remotePrefectures = ["沖縄", "北海道", "長崎", "大分"];
  if (remotePrefectures.some((keyword) => prefecture.includes(keyword))) {
    shipping += 400;
  }

  return shipping;
};

const getSize = (
  size: string
): { length: number; width: number; thickness: number } => {
  switch (size) {
    case "SIZE_20x20":
      return { length: 20, width: 20, thickness: 2 };
    case "SIZE_30x40":
      return { length: 40, width: 30, thickness: 2 };
    case "SIZE_40x50":
      return { length: 50, width: 40, thickness: 3 };
    default:
      throw new Error(`Kích thước không hỗ trợ: ${size}`);
  }
};
