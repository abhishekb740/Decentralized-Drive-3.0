import Home from "./components/Home"
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
      </Routes>
    </>
  )
}

export default App