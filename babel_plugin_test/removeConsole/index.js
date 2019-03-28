module.exports = function removeConsole (babel) {
  const { types: t } = babel; 
  return {
    name: "remove-console", // not required
    visitor: {
      CallExpression(node) {
      	const isConsoleCall = looksLike(node, {
          node: {
            callee:{
              type: 'MemberExpression',
              object: {
                  type: 'Identifier',
                  name: 'console'
              }
            }
          }
        })
        if(!isConsoleCall) return 
        const { line, column } = node.node.callee.object.loc.start
      	const funcName = node.node.callee.property.name
        const prefix = `${line}: ${column}  console.${funcName} remove`
        if(process.env.NODE_ENV !== 'development') {
            console.log(prefix)
        }
       	node.remove()
       }
    }
  };
}
function looksLike(a, b) {
    return (
      a &&
      b &&
      Object.keys(b).every(bKey => {
        const bVal = b[bKey]
        const aVal = a[bKey]
        //console.log(b)
        if (typeof bVal === 'function') {
          return bVal(aVal)
        }
        return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
      })
    )
}
function isPrimitive(val) {
    // eslint-disable-next-line
    return val == null || /^[sbn]/.test(typeof val)
}