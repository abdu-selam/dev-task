const fs = require("fs/promises");
const path = require("path");

const BASE_DIR = path.join(process.cwd(), "data");

const readJson = async (type) => {
  if (!["users", "projects"].includes(type)) {
    throw new Error("Invalid type name");
  }

  const fileName = path.join(BASE_DIR, `${type}.json`);
  const isFile = await isFileExist(fileName);

  if (!isFile) {
    await writeJson([], type);

    return [];
  }

  const fileContent = await fs.readFile(fileName, "utf-8");
  const data = JSON.parse(fileContent);

  return data;
};

const writeJson = async (data, type) => {
  const stringify = JSON.stringify(data);
  if (!["users", "projects"].includes(type)) {
    throw new Error("Invalid type name");
  }

  const fileName = path.join(BASE_DIR, `${type}.json`);

  await createDir();

  await fs.writeFile(fileName, stringify);
};

const isFileExist = async (file) => {
  try {
    await fs.access(file);
    return true;
  } catch (error) {
    return false;
  }
};

const createDir = async () => {
  fs.mkdir(BASE_DIR, {
    recursive: true,
  });
};

module.exports = {
  writeJson,
  readJson,
};
