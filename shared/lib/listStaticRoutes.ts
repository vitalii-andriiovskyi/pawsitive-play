import { readdirSync, statSync } from "fs";
import path from "path";

const skip = ['dashboard']

export default function listStaticRoutes(directoryPath: string, baseRoute = "/"): string[] {
  let routes: string[] = [];

  // Read all files and folders in the current directory
  const filesAndFolders = readdirSync(directoryPath);


  for (const fileOrFolder of filesAndFolders) {
    const fullPath = path.join(directoryPath, fileOrFolder);
    const stat = statSync(fullPath);

    if (
      stat.isDirectory() &&
      (fileOrFolder.startsWith("_") ||
        fileOrFolder.startsWith("(..)") ||
        (fileOrFolder.startsWith("[") && fileOrFolder.endsWith("]")) ||
        skip.includes(fileOrFolder)
      )
    ) {
      continue;
    }

    if (stat.isDirectory()) {
      const nestedRoutes = listStaticRoutes(
        fullPath,
        path.join(baseRoute, fileOrFolder)
      );
      routes = routes.concat(nestedRoutes);
    } else if (fileOrFolder === "page.js" || fileOrFolder === "page.tsx") {
      // If it's a page.js, add the current route
      const routeWithoutGroups = baseRoute
        .replace(/\(\w+\)/g, "")
        .replace(/\/\//g, "/");
      routes.push(routeWithoutGroups);
    }
  }

  return routes;
}
