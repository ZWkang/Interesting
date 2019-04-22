const fs = require('fs');
const path = require('path');
const babylon = require('babylon');//AST 解析器
const traverse = require('babel-traverse').default; //遍历工具
const {transformFromAst} = require('babel-core'); // babel-core

let ID = 0;

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  // 获得文件内容， 从而在下面做语法树分析
  const ast = babylon.parse(content, {
    sourceType: 'module',
  });
  
  // 解析内容至AST
  // This array will hold the relative paths of modules this module depends on.
  const dependencies = [];
  // 初始化依赖集
  // 使用babel-traverse基础知识，需要找到一个statement然后定义进去的方法。
  // 这里进ImportDeclaration 这个statement内。然后对节点import的依赖值进行push进依赖集
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      // We push the value that we import into the dependencies array.
      dependencies.push(node.source.value);
    },
  });
  // id自增
  const id = ID++;

  const {code} = transformFromAst(ast, null, {
    presets: ['env'],
  });

  // 返回这么模块的所有信息
  // 我们设置的id filename 依赖集 代码
  return {
    id,
    filename,
    dependencies,
    code,
  };
}

function createGraph(entry) {
  // 从一个入口进行解析依赖图谱
  // Start by parsing the entry file.
  const mainAsset = createAsset(entry);

  // 最初的依赖集
  const queue = [mainAsset];

  // 一张图常见的遍历算法有广度遍历与深度遍历
  // 这里采用的是广度遍历
  for (const asset of queue) {
    // 给当前依赖做mapping记录
    asset.mapping = {};
    // 获得依赖模块地址
    const dirname = path.dirname(asset.filename);
    // 刚开始只有一个asset 但是dependencies可能多个
    asset.dependencies.forEach(relativePath => {
      // 这边获得绝对路径
      const absolutePath = path.join(dirname, relativePath);
      // 这里做解析
      // 相当于这层做的解析扩散到下一层，从而遍历整个图
      const child = createAsset(absolutePath);

      // 相当于当前模块与子模块做关联
      asset.mapping[relativePath] = child.id;
      // 广度遍历借助队列
      queue.push(child);
    });
  }

  // 返回遍历完依赖的队列
  return queue;
}
function bundle(graph) {
  let modules = '';
  graph.forEach(mod => {
    modules += `${mod.id}: [
      function (require, module, exports) { ${mod.code} },
      ${JSON.stringify(mod.mapping)},
    ],`;
  });
  // CommonJS风格
  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        function localRequire(name) {
          return require(mapping[name]);
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports);
        return module.exports;
      }

      require(0);
    })({${modules}})
  `;
  return result;
}