import { RootStackParamList } from "@/App";
import React from "react";
import FolderView from "./FolderScreen";
import NoteView from "./NoteView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="folderview">
      <Stack.Screen
        name="folderview"
        component={FolderView}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="note" component={NoteView} />
    </Stack.Navigator>
  );
}
