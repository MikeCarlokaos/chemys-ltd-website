const API_BASE_URL = import.meta.env.VITE_API_SHORTAGE;

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
