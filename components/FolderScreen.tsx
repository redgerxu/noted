import React, { useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { FolderContext } from "../App";
import PathedDisplay from "./PathedDisplay";

export default function FolderView() {
  const state = useContext(FolderContext);

  if (state?.rootFolder)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <PathedDisplay props={state?.rootFolder} />
      </ScrollView>
    );
  return <></>;
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
