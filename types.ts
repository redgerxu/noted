export interface Pathed {
    name: string;
    path: string[]; // path segments
}

export interface Note extends Pathed {
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

export interface Folder extends Pathed {
    children: (Folder | Note)[];
}