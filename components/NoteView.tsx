import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { FolderContext, FolderContextType, RootStackParamList } from "@/App";
import { RouteProp, useRoute } from "@react-navigation/native";
import { update } from "@/extra/db";
import { Folder, Note, Pathed } from "@/extra/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NoteViewRouteProp = RouteProp<RootStackParamList, "note">;

export default function NoteView() {
  const root = useContext(FolderContext);

  const route = useRoute<NoteViewRouteProp>();
  const { note } = route.params;
  const [text, setText] = useState(note.value.content ?? "");
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    const autoSave = setInterval(() => {
      if (root?.rootFolder && !saved) {
        save(root, note, text);
        saveData(root.rootFolder);
        console.log("saved asdf");
        setSaved(true);
      }
    }, 1000);

    return () => clearInterval(autoSave);
  }, [text]);

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        value={text}
        onChangeText={(newText) => {
          setText(newText);
          setSaved(false);
        }}
        style={styles.textinput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  textinput: {
    flex: 1,
    width: "100%",
    textAlignVertical: "top",
    backgroundColor: "#ffffff",
    padding: 8,
  },
});

const save = (root: FolderContextType, note: Pathed<Note>, text: string) => {
  if (root?.rootFolder) {
    const res = update(root, note.path.slice(2), {
      ...note,
      value: { ...note.value, content: text },
    });

    if (res) root.updateRoot(res);
  }
};

async function saveData(root: Pathed<Folder>): Promise<void> {
  await AsyncStorage.setItem("data", JSON.stringify(root));
  console.log(JSON.stringify(root));
}
