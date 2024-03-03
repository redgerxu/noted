import { Folder, Note, NoteType, Pathed } from "./types";

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
    children: [
      {
        name: "temp",
        path: ["", "root", "temp"],
        displayName: "Temp",
        value: {
          children: [
            { ...WelcomeNote, path: ["", "root", "temp", "welcome.note"] },
          ],
        },
      },
      WelcomeNote,
    ],
  },
};
