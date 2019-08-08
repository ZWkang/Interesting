// deps
const fs = require("fs");
const path = require("path");
const util = require("util");

const babelCore = require("babel-core");

const readdir = util.promisify(fs.readdir);
const lstat = util.promisify(fs.lstat);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const fsExists = util.promisify(fs.exists);

// 1. 解析入口
const entryFloder = path.resolve(__dirname, "src");

// 2. 生成依赖树

// 3. 找出公共依赖

// 4. 写入common 文件

// 5. 重写路径到入口文件内

async function bundle() {
  const entryPoints = await generatorEntryPoints(entryFloder);
  const depsTree = await generatorDepsTree(entryPoints);

  const commonDeps = await findCommonDeps(depsTree);
  await rewriteFileContent(commonDeps, "../package/share.js");
  await handleFileContentReplace(
    entryPoints,
    commonDeps,
    "../package/share.js"
  );
}

async function generatorEntryPoints(floder) {
  const isFloder = await lstat(floder).then(stat => {
    return stat.isDirectory();
  });
  if (isFloder) {
    return await readdir(floder);
  } else {
    return await [floder];
  }
}

async function generatorDepsTree(entryPoints) {
  let deps = [];
  const plugin = {
    visitor: {
      ImportDeclaration(decl) {
        const importedFile = decl.node.source.value;
        deps.concat(
          (async function() {
            return await generatorDepsTree([
              `${path.resolve(entryFloder, importedFile)}`
            ]);
          })()
        );
        deps.push(importedFile);
      }
    }
  };
  async function handleMapingPoint(point, index) {
    // json是直接拼接。resolve 是根据根目录处理
    const isPointExists = await searchExt(path.resolve(entryFloder, point));
    if (!isPointExists) {
      console.warn(point + " is not exist");
      return [];
    }
    let pointFileData = await readFile(isPointExists);
    pointFileData = pointFileData.toString("utf-8");
    babelCore.transform(pointFileData, { plugins: [plugin] });
    const actualDeps = await Promise.all(deps);

    // reset deps
    deps = [];
    return actualDeps;
  }
  return await Promise.all(entryPoints.map(handleMapingPoint));
}

async function findCommonDeps(depsArray) {
  if (!depsArray || depsArray.length <= 1) {
    return depsArray[0] || [];
  }

  let commonArr = depsArray[0];

  for (let index = 1; index < depsArray.length; index++) {
    // console.log(commonArr.length);
    for (
      let commonIndex = commonArr.length - 1;
      commonIndex >= 0;
      commonIndex--
    ) {
      if (depsArray[index].indexOf(commonArr[commonIndex]) < 0) {
        commonArr.splice(commonIndex, 1);
      }
    }
  }
  return commonArr;
}

async function searchExt(pathname, exts = ["js", "json"]) {
  for (let ext of exts) {
    const pathExtname = path.extname(pathname).replace(".", "");
    let fullPath;
    if (~exts.indexOf(pathExtname)) {
      fullPath = pathname;
    } else {
      fullPath = `${pathname}.${ext}`;
    }
    const isPointExists = await fsExists(fullPath);
    // console.log(isPointExists, fullPath);
    if (isPointExists) {
      return fullPath;
    }
  }
  console.warn(`${pathname} not the file exist`);
  return false;
}

async function rewriteFileContent(commonArr, commonFile) {
  async function generatorSingleFile(filename, content, opts) {
    const filepath = path.resolve(entryFloder, filename);
    // const fullPath = await searchExt(filepath);
    // const doesFileExist = await fsExists(fullPath);
    // if (!doesFileExist) {
    //   console.warn(`${fullPath} is exist`);
    //   return false;
    // }
    return await writeFile(filepath, content, opts);
  }

  async function handleSingleFileData(filename) {
    // console.log(filename);
    const filepath = path.resolve(entryFloder, filename);
    const fullPath = await searchExt(filepath);

    const doesFileExist = await fsExists(fullPath);
    if (!doesFileExist) {
      console.warn(`${filename} is exist`);
      return false;
    }
    let fileData = await readFile(fullPath);
    fileData = fileData.toString("utf-8");
    return fileData;
  }

  const fullCommonContent = commonArr.map(async item => {
    return await handleSingleFileData(item);
  });
  let allCommonFilesData = await Promise.all(fullCommonContent);
  allCommonFilesData = allCommonFilesData.join("\n");
  console.log(allCommonFilesData, commonFile);

  await generatorSingleFile(commonFile, allCommonFilesData, {
    encoding: "utf-8"
  });
}

async function handleFileContentReplace(deps, commonArr, commonFile) {
  let plugin = {
    visitor: {
      ImportDeclaration(decl) {
        const importedFile = decl.node.source.value;
        if (commonArr.includes(importedFile)) decl.remove();
      }
    }
  };
  async function handleSingleFileReplace(filename) {
    const filepath = path.resolve(entryFloder, filename);
    const fullPath = await searchExt(filepath);

    if (!fullPath) {
      return false;
    }
    let fileData = await readFile(fullPath);
    fileData.toString("utf-8");
    return fileData;
  }
  async function handleBabelRemove(oldfile, oldCode, index) {
    const filepath = path.resolve(entryFloder, oldfile);
    let fullPath = await searchExt(filepath);

    const { code } = babelCore.transform(oldCode, { plugins: [plugin] });
    let newCode = `import '${commonFile}'; \n${code}`;
    // console.log(path.parse(fullPath));
    let pathParseObj = path.parse(fullPath);
    pathParseObj.name = `_${pathParseObj.name}`;
    pathParseObj.base = `_${pathParseObj.base}`;
    fullPath = path.format(pathParseObj);
    await writeFile(fullPath, newCode, { encoding: "utf-8" });
  }

  async function handleMain(dep, index) {
    const oldCode = await handleSingleFileReplace(dep);
    await handleBabelRemove(dep, oldCode, index);
    return true;
  }

  return await Promise.all(deps.map(handleMain));
}
