import { launchImageLibrary } from "react-native-image-picker";

const selectFile = async (type = "photo") => {
  const result = await launchImageLibrary({ mediaType: type, quality: 0.2 });
  //   const uri = await result.assets.uri;
  console.log(result);
};

export default { selectFile };
