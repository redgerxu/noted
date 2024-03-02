import React from "react";
import {View, Text} from "react-native"
import { Folder } from "../types";

interface FolderProps {
    path: string[];
    current: Folder;
}

export default function FolderView(props: FolderProps) {
    return (
        <View>
            <Text>FolderView</Text>
        </View>
    );
}