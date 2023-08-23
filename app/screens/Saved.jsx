import React from "react";
import Screen from "./Screen";
import BackButton from "../components/BackButton";
import Downloaded from "./Downloaded";

export default function Saved() {
  return (
    <Screen>
      <BackButton goTo="Favorites" />
      <Downloaded />
    </Screen>
  );
}
