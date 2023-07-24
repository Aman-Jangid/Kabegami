import React, { useState } from "react";
import { View, Image, Button } from "react-native";
import ImagePicker from "react-native-image-picker";

const ImagePickerComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImageHandler = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // You can use the 'uri' property of the response to display the selected image
        setSelectedImage({ uri: response.uri });
      }
    });
  };

  return (
    <View>
      {selectedImage && (
        <Image source={selectedImage} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Select Image" onPress={selectImageHandler} />
    </View>
  );
};

export default ImagePickerComponent;
