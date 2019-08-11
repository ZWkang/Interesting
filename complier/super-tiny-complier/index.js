// (add 2 (subtract 4 2))
let str = "(add 2 (subtract 4 2))";
function tokenizer(input) {
  let current = 0;
  let tokens = [];
  while (current < input.length) {
    let char = input[current];
    if (char === "(") {
      tokens.push({
        type: "paren",
        value: "("
      });
      current++;
      continue;
    }
    if (char === ")") {
      tokens.push({
        type: "paren",
        value: ")"
      });
      ++current;
      continue;
    }
    if (/\s/.test(char)) {
      ++current;
      continue;
    }

    if (/[0-9]/.test(char)) {
      let value = "";

      while (/[0-9]/.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: "number",
        value: value
      });
      continue;
    }

    if (char === '"') {
      let value = "";
      char = input[++current];
      while (char !== '"') {
        value += char;
        // ++current;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({
        type: "string",
        value: value
      });
      continue;
    }
    if (/[a-z]/i.test(char)) {
      let value = "";
      while (/[a-z]/i.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: "name",
        value: value
      });
      continue;
    }
    // ++current;
    throw new TypeError("I dont know what this character is: " + char);
  }
  return tokens;
}

function parser(tokens) {
  let current = 0;
  function walk() {
    let token = tokens[current];
    if (token.type === "number") {
      ++current;
      return {
        type: "NumberLiteral",
        value: token.value
      };
    }
    if (token.type === "string") {
      ++current;
      return {
        type: "StringLiteral",
        value: token.value
      };
    }

    if (token.type === "paren" && token.value === "(") {
      token = tokens[++current];
      let node = {
        type: "CallExpression",
        name: token.value,
        params: []
      };
      token = tokens[++current];
      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        node.params.push(walk());
        token = tokens[current];
      }

      ++current;
      return node;
    }
  }
  let ast = {
    type: "Program",
    body: []
  };
  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
}

function traverser(ast, visitor) {
  function traverseArray(array, parent) {
    array.forEach(item => {
      traverserNode(item, parent);
    });
  }
  function traverserNode(node, parent) {
    let methods = visitor[node.type];
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }
    console.log(node.type);
    switch (node.type) {
      case "Program":
        traverseArray(node.body, node);
        break;
      case "NumberLiteral":
        // traverserNode(node.params, node);
        break;
      case "StringLiteral":
        // traverserNode(node.params, node);
        break;
      case "CallExpression":
        traverseArray(node.params, node);
        break;
    }
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }
  traverserNode(ast, null);
}
let tokens = tokenizer(str);
let ast = parser(tokens);
const visitor = {
  CallExpression: {
    enter: function(params, parent) {
      //   console.log(params);
      params.name = "xixi";
    }
  }
};
let newAst = traverser(ast, visitor);
console.log(JSON.stringify(ast));
