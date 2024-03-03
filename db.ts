import { FolderContextType } from "./App";
import { Pathed, Folder, Note } from "./types";

export function update(
  rootContext: FolderContextType,
  path: string[],
  value: Pathed<Folder | Note>
): Pathed<Folder> | undefined {
  if (!rootContext.rootFolder) return;
  for (let i = 0; i < rootContext.rootFolder.value.children.length; i++) {
    if (rootContext.rootFolder.value.children[i].name === path[0]) {
      if (path.length > 1) {
        if (rootContext.rootFolder.value.children[i] as Pathed<Folder>) {
          return update(rootContext, path.slice(1), value);
        }
      } else {
        const { rootFolder } = rootContext;
        rootFolder.value.children[i] = value;
        rootContext.updateRoot(rootFolder);
        return rootFolder;
      }
    }
  }

  return undefined;
}
