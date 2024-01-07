// crud-admin/client/src/services/shortageService.js

const API_BASE_URL = "http://localhost:3001/api/auth/shortages";
// const API_BASE_URL =
//   "https://chemys-website-api.onrender.com/api/auth/shortages";

export const fetchShortages = async ({
  page,
  limit,
  criteria,
  order,
  searchTerm,
}) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}?page=${page}&limit=${limit}&criteria=${criteria}&order=${order}&search=${searchTerm}`
    );

    const data = await response.json();
    return {
      shortages: data.shortages,
      totalItems: data.totalItems,
    };
  } catch (error) {
    console.error("Error fetching shortages:", error);
    throw error;
  }
};
