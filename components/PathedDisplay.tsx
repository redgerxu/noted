import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pathed, Folder, Note } from "../types";

export default function PathedDisplay({
  navigation,
  props,
}: {
  navigation: any;
  props: Pathed<Folder | Note>;
}) {
  if (props.value && (props.value as Folder).children !== undefined) {
    return (
      <TouchableOpacity
        style={[styles.container, styles.shifted]}
        onPress={() => {}}
      >
        <Ionicons name="folder-open" size={30} color="blue" />
        <Text>{props.name}</Text>
        <View style={styles.childrenContainer}>
          {((props.value as Folder).children ?? []).map(
            (child: Pathed<Folder | Note>) => (
              <PathedDisplay
                navigation={navigation}
                props={child}
                key={child.path.join("/")}
              />
            )
          )}
        </View>
      </TouchableOpacity>
    );
  } else if (props.value && (props.value as Note).definitions !== undefined) {
    return (
      <TouchableOpacity
        style={[styles.container, styles.shifted]}
        onPress={() => {
          navigation.navigate("note", { note: props });
        }}
      >
        <Ionicons name="document-text" size={30} color="blue" />
        <Text>{props.name}</Text>
      </TouchableOpacity>
    );
  }

  return <></>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    alignSelf: "flex-start",
  },
  shifted: {
    position: "relative",
    top: 20,
  },
  childrenContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
});
