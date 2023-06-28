import { useState } from 'react'
import Schduler from './components/Schduler';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Schduler />
    </>
  )
}

export default App
