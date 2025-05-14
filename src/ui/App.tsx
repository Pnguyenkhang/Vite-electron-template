import { useState } from 'react'
import './App.css'
import TestComponent from './TestComponent';

function App() {
  const [count, setCount] = useState(0)
  console.log("app is rendered", count);
  console.log('App component rendered at:', new Date().toLocaleTimeString());
  return (
    <>
    <TestComponent />
    fff
    fff
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
