export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
};
