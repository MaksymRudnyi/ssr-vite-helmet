import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Character from "./pages/Character"
import Posts from './pages/Posts'
import Albums from './pages/Albums'
import "./index.css"
import {Footer} from "./components/Footer.jsx";

const App = ({data, fullUrl}) => {
  return (
    <>
      <Routes>
        <Route index element={<Home characters={data.users}/>}/>
        <Route path="/character/:id" element={<Character characters={data.users}/>}/>
        <Route path="/posts/:id" element={<Posts posts={data.posts}/>}/>
        <Route path="/albums/:id" element={<Albums albums={data.albums}/>}/>
      </Routes>
      <Footer fullUrl={fullUrl}/>
    </>
  )
}

export default App