


const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const {transformFromAst} = require('babel-core');
const wss = require('./wsserver')



let ID = 0;

let mapWithPath = new Map()

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8');

  const ast = babylon.parse(content, {
    sourceType: 'module',
  });

  const dependencies = [];

  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value);
    },
  });

  const id = ID++;
  if(!mapWithPath.has(path.resolve(__dirname, filename))) {
    mapWithPath.set(path.resolve(__dirname, filename), id)
  }
  const {code} = transformFromAst(ast, null, {
    presets: ['env'],
  });
  // Return all information about this module.
  const afterid = mapWithPath.get(path.resolve(__dirname, filename))

  return {
    id: afterid,
    filename,
    dependencies,
    code,
  };
}

function createGraph(entry) {
  // Start by parsing the entry file.
  const mainAsset = createAsset(entry);

  const queue = [mainAsset];

  for (const asset of queue) {
    asset.mapping = {};

    const dirname = path.dirname(asset.filename);

    fs.watch(path.join(__dirname,asset.filename), (event, filename) => {
        console.log('watch ',event, filename)
        const assetSource = createAsset(path.join(__dirname,asset.filename))
        wss.emitmessage(assetSource)
    })
    asset.dependencies.forEach(relativePath => {

      const absolutePath = path.join(dirname, relativePath);

      const child = createAsset(absolutePath);

      asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }

  return queue;
}

function bundle(graph) {
  let modules = '';

  graph.forEach(mod => {
    modules += `${mod.id}: [
      function (require, module, exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)},
    ],`;
  });

  const result = `
    (function(modules) {
        window.modules = modules
      function require(id) {
        const [fn, mapping] = modules[id];
        function localRequire(name) {
          return require(mapping[name]);
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports);
        return module.exports;
      }
      window.require = require
      require(0);
    })({${modules}})
  `;

  return result;
}
// // console.log(result);
// eval(result)

module.exports = {
    createGraph,
    bundle
}