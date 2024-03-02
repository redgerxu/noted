export interface Pathed<T> {
    name: string;
    path: string[]; // path segments
    value: T;
}

export interface Note {
    type: NoteType;
    content: string;
    lastModified: number; // numerical timestamp
    definitions: Definition[]
}

export interface Definition {
    term: string;
    definition: string;
    example: string | undefined;
}

export enum NoteType {
    NOTE = 0,
    DEFINITION
}

export interface Folder {
    children: Pathed<(Folder | Note)>[];
}