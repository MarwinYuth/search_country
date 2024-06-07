import { fetchJson } from "../utils/baseUrl";

export const list = async () => {
  try {
    const data = await fetchJson.get("/all");

    return data;
  } catch (error) {
    return { status: "error" };
  }
};

export const search = async (name) => {
  try {
    const data = await fetchJson.get(`/name/${name}`);

    return data;
  } catch (error) {
    return { status: "error" };
  }
};
