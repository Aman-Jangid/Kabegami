const baseUrl = "https://wallhaven.cc/api/v1/";

export default getWallpapers = async (url) => {
  const response = await fetch(baseUrl + url, {
    headers: { Accept: "application/json" },
  }).then((res) => res.json());

  const data = await response.data;

  return data;
};
