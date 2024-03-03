import React, { createContext, useState } from "react";
import { Folder, Note, Pathed } from "@/extra/types";
import { DefaultRoot } from "@/extra/globals";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FolderStuff from "./components/FolderStuff";
import Flashcards from "./components/Flashcards";
import AsyncStorage from "@react-native-async-storage/async-storage";

// weird navigation types and context stuff

export type RootStackParamList = {
  folderview: undefined;
  note: { note: Pathed<Note> };
};

export type FolderContextType = {
  rootFolder: Pathed<Folder>;
  updateRoot: React.Dispatch<React.SetStateAction<Pathed<Folder>>>;
};

export const FolderContext = createContext<FolderContextType | undefined>(
  undefined
);

const headerStyle = { backgroundColor: "#3333ff" };

const Tab = createBottomTabNavigator();

export default function App() {
  const [rootFolder, updateRoot] = useState(DefaultRoot);

  return (
    <FolderContext.Provider value={{ rootFolder, updateRoot }}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerStyle: headerStyle }}>
          <Tab.Screen
            name="folderstuff"
            component={FolderStuff}
            options={{ title: "Noted" }}
          />
          <Tab.Screen
            name="flashcards"
            component={Flashcards}
            options={{ title: "Flashcards" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FolderContext.Provider>
  );
}

/**
 * Loads data from AsyncStorage and returns root folder
 * @returns root folder as Folder object
 */
export async function loadData(): Promise<Pathed<Folder>> {
  const sData = await AsyncStorage.getItem("data");

  if (sData) {
    return JSON.parse(sData) as Pathed<Folder>;
  } else {
    return DefaultRoot;
  }
}
