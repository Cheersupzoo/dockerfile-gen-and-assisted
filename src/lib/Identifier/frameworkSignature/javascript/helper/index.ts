import fs from "fs";
export type PackageJson = {
  dependencies: { [key: string]: string };
  devDependencies: { [key: string]: string };
};

export function getPackageJson(path: string) {
  const packageJsonPath = `${path}/package.json`;
  if (fs.existsSync(packageJsonPath)) {
    const file = fs.readFileSync(packageJsonPath, "utf8");
    return JSON.parse(file) as PackageJson;
  }
}
