import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Flashcard({
  front,
  back,
}: {
  front: string;
  back: string;
}) {
  const [flipped, setFlipped] = useState(false);

  const onPress = () => {
    setFlipped(!flipped);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {flipped ? <Text>{back}</Text> : <Text>{front}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    width: 200,
    height: 130,
    marginBottom: 10,
  },
});
