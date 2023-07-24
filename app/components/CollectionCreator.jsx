import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import color from "../theme/colors";
import ImageButton from "./ImageButton";
import IconButton from "./IconButton";
import { Text } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import uuid from "react-native-uuid";

export default function CollectionCreator({ handleExit, handleConfirm }) {
  const [uri, setUri] = useState(null);
  const [value, setValue] = useState();

  const inputRef = useRef(null);

  const selectImage = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: "photo",
        presentationStyle: "fullScreen",
      });
      setUri(res.assets[0].uri);
    } catch (error) {
      console.log("Error occurred trying to pick image : ", error.message);
    }
  };

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
      <TextInput
        ref={inputRef}
        style={styles.input}
        numberOfLines={1}
        placeholder="collection title"
        placeholderTextColor={color.color6}
        value={value}
        onChangeText={(value) => setValue(value)}
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
        <ImageButton
          disabled
          uri={uri}
          width={"100%"}
          height={100}
          onPress={selectImage}
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
    borderColor: color.color4,
    position: "absolute",
    zIndex: 1010,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    alignSelf: "center",
    top: "20%",
    borderRadius: 10,
    width: 220,
    gap: 10,
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
  input: {
    alignSelf: "center",
    fontSize: 19,
    width: "100%",
    borderRadius: 10,
    padding: 4,
    color: color.color8,
    backgroundColor: color.color4,
    textAlignVertical: "top",
    paddingHorizontal: 10,
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
