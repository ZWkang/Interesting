import './App.scss'


const App = {
    data (){
        return {
            message: `test test test message`
        }
    },
    template: `
        <div id="app">
            <p>
                {{message}}
            </p>
        </div>
    `
};


export default App
