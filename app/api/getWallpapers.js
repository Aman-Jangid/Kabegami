import keys from "../keys";
import storage from "../services/storage";

const baseUrl = "https://wallhaven.cc/api/v1/";

const getApiKey = async () => {
  const key = await storage.getData(keys.API_KEY);

  return key;
};

let apiKey = "";
export default getWallpapers = async (url) => {
  apiKey = await getApiKey();

  const response = await fetch(baseUrl + url + `apikey=${apiKey}`, {
    headers: { Accept: "application/json" },
  }).then((res) => res.json());

  const data = await response.data;

  return data;
};

const getWallpaperInfo = async (id) => {
  apiKey = await getApiKey();

  const response = await fetch(baseUrl + "w/" + id + "?apikey=" + apiKey, {
    headers: { Accept: "application/json" },
  }).then((res) => res.json());

  const data = await response.data;
  return data;
};

export { getWallpaperInfo };
