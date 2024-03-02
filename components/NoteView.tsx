import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { FolderContext, RootStackParamList } from "../App";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Folder, Note, Pathed } from "../types";

type NoteViewRouteProp = RouteProp<RootStackParamList, "note">;

export default function NoteView() {
  const route = useRoute<NoteViewRouteProp>();
  const { note } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{note.value.content}</Text>
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
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

function getNote(path: string[], current: Pathed<Folder>): Pathed<Note> | null {
  const next = current.value.children.find((child) => child.name === path[0]);

  if (next as Pathed<Folder>)
    return getNote(path.slice(1), next as Pathed<Folder>);
  else if (next as Pathed<Note>) return next as Pathed<Note>;
  return null;
}
