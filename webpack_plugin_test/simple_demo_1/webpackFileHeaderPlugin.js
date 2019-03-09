class webpackFileHeaderPlugin {
    constructor(options) {
		this.options = options || {};
        this.AuthorName = this.options.AuthorName;
	}
    apply (compiler) {
        compiler.hooks.emit.tap('webpackFileHeaderPlugin', (compilation) =>{
            const beforeContent = compilation.assets['main.js'].source();
            compilation.assets['main.js'].source = () => {
                return `/*\n * Author: ${this.AuthorName} \n */\n` + beforeContent
            }
        })
    }
}


module.exports = webpackFileHeaderPlugin