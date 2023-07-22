import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownMenu from "../components/DropDownMenu";
import Input from "../components/Input";
import Button from "../components/Button";
import color from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/IconButton";
import ButtonSelection from "../components/ButtonSelection";
import LinkButton from "../components/LinkButton";
import BackButton from "../components/BackButton";
import Screen from "./Screen";

export default function Customize() {
  const [showLink, setShowLink] = useState(false);
  const toggleLink = () => {
    setShowLink(!showLink);
  };

  const { goBack } = useNavigation();

  const handleGoBack = () => {
    goBack();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <BackButton goTo="Home" />
        <DropDownMenu />
        <Input
          backgroundColor={color.color3}
          color={color.color7}
          placeholder="API KEY"
          placeholderColor={color.color5}
          displayHelp={true}
          iconColor={color.color4}
          toggleLink={toggleLink}
        />
        {showLink && (
          <LinkButton
            description="get an Api-key from the following provider to gain access to all features."
            title="open Wallhaven.cc"
            url={"https://www.wallhaven.cc/help/api"}
          />
        )}
        <Input
          lines={6}
          backgroundColor={color.color3}
          color={color.color7}
          placeholder="Tags (separate using , or space )"
          placeholderColor={color.color5}
        />
        <ButtonSelection />
        <Button
          title="confirm"
          color={color.color9}
          textColor={color.white}
          width="80%"
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.colorPrimary,
    alignItems: "center",
    // paddingTop: 50,
    height: "100%",
    width: "100%",
  },
});
