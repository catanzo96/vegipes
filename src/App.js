import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import RecipesList from "./pages/RecipesList";
import Recipe from "./pages/Recipe";
import About from "./pages/About";
import Error from "./pages/Error";
import Key from "./pages/Key";
import Limit from "./pages/Limit";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/searched/:searchTerm' element={<RecipesList/>} />
        <Route path='/recipe/:id' element={<Recipe/>} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Error />} />
        <Route path='/key' element={<Key />} />
        <Route path='/limit' element={<Limit />} />
      </Routes>
    </>
  )
}

export default App;
