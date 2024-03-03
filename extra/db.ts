import { FolderContextType } from "@/App";
import { Pathed, Folder, Note } from "./types";

// used for editing root folder
export function update(
  rootContext: FolderContextType,
  current: Pathed<Folder>,
  path: string[],
  value: Pathed<Folder | Note>
): number {
  if (!rootContext.rootFolder) return -1;
  for (let i = 0; i < current.value.children.length; i++) {
    if (current.value.children[i].name === path[0]) {
      if (path.length > 1) {
        if (current.value.children[i] as Pathed<Folder>) {
          return update(
            rootContext,
            current.value.children[i] as Pathed<Folder>,
            path.slice(1),
            value
          );
        }
      } else {
        current.value.children[i] = value;
        return 0;
      }
    }
  }

  return -1;
}

export function create(
  rootContext: FolderContextType,
  current: Pathed<Folder>,
  path: string[],
  value: Pathed<Folder | Note>
): number {
  if (!rootContext.rootFolder) return -1;

  if (path.length > 1) {
    for (let i = 0; i < current.value.children.length; i++) {
      if (current.value.children[i].name === path[0]) {
        if (current.value.children[i] as Pathed<Folder>) {
          return create(
            rootContext,
            current.value.children[i] as Pathed<Folder>,
            path.slice(1),
            value
          );
        }
      }
    }
  } else {
    current.value.children.push(value);
    return 0;
  }

  return -1;
}
