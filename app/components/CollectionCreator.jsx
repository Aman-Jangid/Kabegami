import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import color from "../theme/colors";
import IconButton from "./IconButton";
import { Text } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Input from "./Input";
import uuid from "react-native-uuid";

export default function CollectionCreator({ handleExit, handleConfirm }) {
  const [uri, setUri] = useState(null);
  const [value, setValue] = useState();

  // opens gallery to select and image then sets uri to the uri of the selected image
  const selectImage = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: "photo",
        presentationStyle: "fullScreen",
      });
      setUri(res.assets[0].uri);
    } catch (error) {
      console.log(
        "Error occurred trying to pick image (CollectionCreator.jsx) : ",
        error.message
      );
    }
  };

  // confirm the accumulation of a new collection
  const confirm = () => {
    handleConfirm({
      title: value,
      collectionImage: uri,
      numberOfImages: 0,
      id: uuid.v4(),
    });
  };
  return (
    <View style={styles.container}>
      <Input
        backgroundColor={color.color4}
        placeholder="collection title"
        placeholderColor={color.color6}
        lines={1}
        color={color.color8}
        value={value}
        handleChange={(value) => setValue(value)}
      />
      <TouchableOpacity style={styles.imageSelection} onPress={selectImage}>
        <Text style={styles.text}>Select Image</Text>
        <IconButton
          name="image"
          iconPack="II"
          size={32}
          color={color.color7}
          onPress={selectImage}
        />
      </TouchableOpacity>
      {uri && (
        <Image
          source={{ uri: uri }}
          style={{
            width: 200,
            height: 100,
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
      )}
      <View style={styles.buttons}>
        <IconButton
          name="check-circle"
          iconPack="MI"
          size={55}
          color={color.color7}
          onPress={confirm}
        />
        <IconButton
          name="cancel"
          iconPack="MI"
          size={55}
          color={color.color9}
          onPress={handleExit}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: color.color5,
    position: "absolute",
    zIndex: 1010,
    paddingBottom: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    alignSelf: "center",
    top: "20%",
    borderRadius: 10,
    width: 220,
    minHeight: 200,
    backgroundColor: color.color2,
  },
  text: {
    fontSize: 18,
    color: color.color7,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  imageSelection: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    width: "100%",
    padding: 2,
    justifyContent: "space-evenly",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: color.color4,
  },
  buttons: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    backgroundColor: color.color4,
  },
});
