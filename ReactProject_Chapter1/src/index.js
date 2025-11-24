import ReactDOM from 'react-dom/client'
import List from './containers/List'



function App() {

    return (
        <>
            <h1>Page</h1>
            <List />
            
        </>
    )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App />)