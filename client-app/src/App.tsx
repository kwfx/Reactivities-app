import './App.css'
import { DuckList, ducks} from './demo'

function App() {
  return (
    <>
      <h1>Reactivities</h1>
      <DuckList key={1} listDucks={ducks}></DuckList>
    </>
  )
}

export default App
