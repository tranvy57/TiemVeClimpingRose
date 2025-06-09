import axios from "axios";

export const getTours = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_URL_BOOKING_SERVICE}/tours`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
