import { FolderContext } from "@/App";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Flashcard from "./Flashcard";

const extract = (text: string) => {
  const regex = /^Definition:\s*(\S+)\s*-\s*(\S+)$/;

  const match = text.match(regex);

  return match ? [match[1], match[2]] : [];
};

export default function Flashcards() {
  const rootContext = useContext(FolderContext);
  const [flashcards, setFlashcards] = useState<string[][]>([]);

  useEffect(() => {
    if (!rootContext?.rootFolder) return;

    const str = JSON.stringify(rootContext.rootFolder);

    const regex = /Definition:\s*\S+\s*-\s[^\s"]+?/g;

    const matches = str.match(regex) ?? [];

    for (const match of matches) {
      const temp = extract(match);
      if (temp) setFlashcards([...flashcards, temp]);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {flashcards.map(([front, back], index) => (
        <Flashcard front={front} back={back} key={index} />
      ))}
      <View style={styles.cardContainer}></View>
    </ScrollView>
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
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 8,
  },
});
