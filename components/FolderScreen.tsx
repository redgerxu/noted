import React, { useContext } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { FolderContext } from "@/App";
import PathedDisplay from "./PathedDisplay";

export default function FolderView() {
  const state = useContext(FolderContext);

  if (state?.rootFolder)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Folders</Text>
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
    padding: 8,
  },
});
