import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pathed, Folder, Note } from "../extra/types";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function PathedDisplay({
  props,
}: {
  props: Pathed<Folder | Note>;
}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderChild = (item: Pathed<Folder | Note>) => {
    return <PathedDisplay props={item} key={item.path.join("/")} />;
  };

  if (props.value && (props.value as Folder).children !== undefined) {
    return (
      <View
        style={
          props.path.length === 1
            ? [styles.container]
            : [styles.padLeft, styles.container]
        }
      >
        <View style={styles.element}>
          <Ionicons
            style={{ paddingRight: 4 }}
            name="folder-open"
            size={30}
            color="blue"
          />
          <Text>{props.displayName}</Text>
        </View>

        <SafeAreaView>
          {(props.value as Folder).children.map((child) => renderChild(child))}
        </SafeAreaView>
      </View>
    );
  } else if (props.value && (props.value as Note).content !== undefined) {
    return (
      <TouchableOpacity
        style={[styles.padLeft, styles.note]}
        onPress={() => {
          navigation.navigate("note", { note: props as Pathed<Note> });
        }}
      >
        <Ionicons
          style={{ paddingRight: 4 }}
          name="document-text"
          size={30}
          color="blue"
        />
        <Text>{props.displayName}</Text>
      </TouchableOpacity>
    );
  }

  return <></>;
}

const styles = StyleSheet.create({
  padLeft: {
    paddingLeft: 30,
  },
  element: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    width: "100%",
    borderWidth: 1,
  },
  container: {
    flexDirection: "column",
  },
  note: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
});
