import { Folder, Note, NoteType, Pathed } from "./types";

const WelcomeNote: Pathed<Note> = {
    name: "Welcome",
    path: ["", "root", "welcome.note"],
    
    value: {
        type: NoteType.NOTE,
        content: "Welcome to Noted!",
        lastModified: 0,
        definitions: [],
    }
};

export const DefaultRoot: Pathed<Folder> = {
    name: "root",
    path: [""],
    value :{
        children: [WelcomeNote, {name: "temp", path: ["", "root", "temp"], value: {children: [WelcomeNote]}}],

    }
}