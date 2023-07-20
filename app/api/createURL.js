const createURL = (
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
  const prefix = "search?";

  const suffix = Array.from(Object.keys(options)).map((key) =>
    options[key] ? key + "=" + options[key] + "&" : ""
  );

  const url = prefix + suffix.join("");

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
