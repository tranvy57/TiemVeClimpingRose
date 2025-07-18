import api from "@/libs/axios-config";

export const uploadImage = async (
  file: File,
  folder?: string
): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  if (folder) {
    formData.append("folder", folder);
  }

  try {
    const response = await api.post("/files/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = response.data?.data;

    return {
      url: data.secure_url,
    };
  } catch (error) {
    console.error("Lỗi khi upload ảnh:", error);
    throw new Error("Upload ảnh thất bại");
  }
};
