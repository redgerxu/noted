import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { FolderContext } from "../App";
import PathedDisplay from "./PathedDisplay";

export default function FolderView({ navigation }: { navigation: any }) {
  const state = useContext(FolderContext);

  return (
    <View style={styles.container}>
      <PathedDisplay navigation={navigation} props={state} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },
});
