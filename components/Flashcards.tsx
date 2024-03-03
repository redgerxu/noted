import { DefaultRoot } from "@/extra/globals";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

export default function Flashcards() {
  const [rootFolder] = useState(DefaultRoot);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const str = JSON.stringify(rootFolder);

    console.log(str);

    const regex = /Definition:\s*(\S+)\s*-\s*(\S+)/g;

    let match;
    while ((match = regex.exec(JSON.stringify(rootFolder))) !== null) {
      const value1 = match[1];
      const value2 = match[2];

      console.log("Value 1:", value1);
      console.log("Value 2:", value2);
    }
  }, []);

  return <Text>hi</Text>;
}
