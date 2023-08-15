import keys from "../keys";
import storage from "../services/storage";

const getPurity = async () => {
  const purity = await storage.getData(keys.PURITY);
  return purity;
};

const createURL = async (
  options = {
    q: "",
    sorting: "",
    categories: "",
    purity: "",
    resolutions: "",
    toplist: false,
    // topRange: "1M",
    hot: false,
    seed: "",
    page: "",
  }
) => {
  purity = await getPurity();
  const prefix = "search?";

  const suffix = Array.from(Object.keys(options)).map((key) =>
    options[key] ? key + "=" + options[key] + "&" : ""
  );

  const url = prefix + suffix.join("");

  console.log(url);

  return url;
};

const createFilterURL = (filter) => {
  const searchTypes = {
    color: ["array of colors"],
    purity: [],
  };

  return null;
};

export default { createURL, createFilterURL };
