const App = {
    name: 'app',
    data() {
        return {
            message: `test test test message`
        }
    },
    template: `
        <div id="app">
            {{message}}
        </div>
    `
}
export default App