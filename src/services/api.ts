import { StarshipsResponse } from "../config/types";
import { API_BASE_URL } from "../config/appData";

export const getStarships = async (
  page: number = 1,
): Promise<StarshipsResponse> => {
  const response = await fetch(`${API_BASE_URL}/starships/?page=${page}`);
  const data = await response.json();
  return data;
};
