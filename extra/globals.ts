import { Folder, Note, NoteType, Pathed } from "./types";

// global values (kind of just filler data)

const WelcomeNote: Pathed<Note> = {
  name: "welcome.note",
  path: ["", "root", "welcome.note"],
  displayName: "Welcome",
  value: {
    type: NoteType.NOTE,
    content: "Welcome to Noted!",
    lastModified: 0,
  },
};

export const DefaultRoot: Pathed<Folder> = {
  name: "root",
  path: [""],
  displayName: "Noted",
  value: {
    children: [WelcomeNote],
  },
};
