import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Folder } from "./types";
import { DefaultRoot } from "./globals";

export default function App() {
  const [root, setRoot] = React.useState(DefaultRoot);

  useEffect(() => {
    async function load() {
      const data = await loadData();
      setRoot(data);
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/**
 * Loads data from AsyncStorage and returns root folder
 * @returns root folder as Folder object
 */
async function loadData(): Promise<Folder> {
  const sData = await AsyncStorage.getItem("data");
  if (sData) {
    return JSON.parse(sData) as Folder;
  } else {
    return DefaultRoot;
  }
}

async function saveData(root: Folder): Promise<void> {
  await AsyncStorage.setItem("data", JSON.stringify(root));
}
