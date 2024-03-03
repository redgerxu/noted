import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { Pathed, Folder, Note } from "../extra/types";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// recursive display of folder structure
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

  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [renderChildren, setRendering] = useState(false);

  if (props.value && (props.value as Folder).children !== undefined) {
    return (
      <TouchableOpacity
        style={
          props.path.length === 1
            ? [styles.container]
            : [styles.padLeft, styles.container]
        }
        onPress={() => setRendering(!renderChildren)}
      >
        <View style={styles.element}>
          <Ionicons
            style={{ paddingRight: 4 }}
            name="folder-open"
            size={30}
            color="blue"
          />
          <Text>{props.displayName}</Text>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
              flex: 1,
              flexDirection: "row",
              alignItems: "flex-start",
            }}
            onPress={() => {
              if (!renderChildren) setRendering(true);
              if (!editing) {
                setEditing(true);
              } else {
                const newName = name.replace(/^\s+|\s+$|\s+/g, "");
                const id = Math.floor(Math.random() * 10 ** 15);
              }
            }}
          >
            <AntDesign name="plus" size={30} color="gray" />
          </TouchableOpacity>
        </View>

        {renderChildren && (
          <SafeAreaView>
            {(props.value as Folder).children.map((child) =>
              renderChild(child)
            )}
            {editing && (
              <TextInput
                style={{
                  marginLeft: 30,
                  borderColor: "#000000",
                  borderBottomWidth: 1,
                  paddingLeft: 2,
                }}
                onChangeText={(text) => setName(text)}
                value={name}
              />
            )}
          </SafeAreaView>
        )}
      </TouchableOpacity>
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
