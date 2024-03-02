import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { createContext, useEffect } from "react";
import { Folder, Note, Pathed } from "./types";
import { DefaultRoot } from "./globals";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FolderView from "./components/FolderScreen";
import NoteView from "./components/NoteView";

export type RootStackParamList = {
  folderview: undefined;
  note: { note: Pathed<Note> };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export const FolderContext = createContext(DefaultRoot);

export default function App() {
  let rootFolder = DefaultRoot;

  useEffect(() => {
    async function load() {
      rootFolder = await loadData();
    }

    load();
  }, []);

  return (
    <FolderContext.Provider value={rootFolder}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="folderview">
          <Stack.Screen
            name="folderview"
            component={FolderView}
            options={{ title: "Notes" }}
          />
          <Stack.Screen name="note" component={NoteView} />
        </Stack.Navigator>
      </NavigationContainer>
    </FolderContext.Provider>
  );
}

/**
 * Loads data from AsyncStorage and returns root folder
 * @returns root folder as Folder object
 */
async function loadData(): Promise<Pathed<Folder>> {
  const sData = await AsyncStorage.getItem("data");
  if (sData) {
    return JSON.parse(sData) as Pathed<Folder>;
  } else {
    return DefaultRoot;
  }
}

async function saveData(root: Pathed<Folder>): Promise<void> {
  await AsyncStorage.setItem("data", JSON.stringify(root));
}
