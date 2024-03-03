import React, { useContext, useState } from "react";
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
import { Pathed, Folder, Note, NoteType } from "../extra/types";
import { useNavigation } from "@react-navigation/native";
import { FolderContext, RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { create, update } from "@/extra/db";

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
  const [createMode, setCreateMode] = useState(1); // 0 = folder, 1 = note

  const root = useContext(FolderContext);

  // long af function to create a new folder/note
  const createFunc = () => {
    if (!renderChildren) setRendering(true);
    if (!editing) {
      setEditing(true);
    } else {
      const newName = name.replace(/^\s+|\s+$|\s+/g, "");

      setName("");

      const id = Math.floor(Math.random() * 10 ** 15).toString();
      const fileName = createMode === 0 ? id : id + ".note";

      let newPath = [];

      if (props.path.length === 1) {
        newPath = ["", "root", fileName];
      } else {
        newPath = [...props.path, fileName];
      }

      let value: Pathed<Folder | Note>;
      if (createMode === 0) {
        value = {
          name: fileName,
          path: newPath,
          displayName: newName,
          value: {
            children: [],
          },
        };
      } else {
        value = {
          name: fileName,
          path: newPath,
          displayName: newName,
          value: {
            content: "",
            type: NoteType.NOTE,
            lastModified: new Date().getTime(),
          },
        };
      }

      if (root?.rootFolder) {
        const res = create(root, root?.rootFolder, newPath.slice(2), value);

        if (res === 0 && createMode === 1) {
          update(root, root?.rootFolder, newPath.slice(2), value);
          navigation.navigate("note", { note: value as Pathed<Note> });
        }
      }
    }

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
  };

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
