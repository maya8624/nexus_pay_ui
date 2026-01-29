import api from "./apiClient";

export async function get<T>(url: string) {
  try {
    const res = await api.get<T>(url);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function post<T>(url: string, body?: any) {
  try {
    const res = await api.post<T>(url, body);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
