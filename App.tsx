import React, { createContext, useEffect, useState } from "react";
import { Folder, Note, Pathed } from "@/extra/types";
import { DefaultRoot } from "@/extra/globals";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FolderView from "@/components/FolderScreen";
import NoteView from "@/components/NoteView";

export type RootStackParamList = {
  folderview: undefined;
  note: { note: Pathed<Note> };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export type FolderContextType = {
  rootFolder: Pathed<Folder>;
  updateRoot: React.Dispatch<React.SetStateAction<Pathed<Folder>>>;
};

export const FolderContext = createContext<FolderContextType | undefined>(
  undefined
);

export default function App() {
  const [rootFolder, updateRoot] = useState(DefaultRoot);

  useEffect(() => {
    async function load() {
      updateRoot(await loadData());
    }

    load();
  }, []);
  return (
    <FolderContext.Provider value={{ rootFolder, updateRoot }}>
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
  const sData = undefined; //await AsyncStorage.getItem("data");

  if (sData) {
    return JSON.parse(sData) as Pathed<Folder>;
  } else {
    return DefaultRoot;
  }
}
