import { Folder, Note, NoteType } from "./types";

const WelcomeNote: Note = {
    name: "Welcome",
    path: ["", "root", "welcome.note"],
    type: NoteType.NOTE,
    content: "Welcome to Noted!",
    lastModified: 0,
    definitions: []
};

export const DefaultRoot: Folder = {
    name: "root",
    path: [""],
    children: [WelcomeNote],
}