import React, { useState, useContext, useCallback  } from 'react';
import {useNavigate} from 'react-router-dom';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const navigate = useNavigate();
  const [key, setKey] = useState('0ba4a247cd0d46999763a79a7df4f993');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = useCallback( async () => {
    setLoading(true);
    try {
      const checkKey = localStorage.getItem('key');
      if (checkKey) {
        setKey(JSON.parse(checkKey))
      }
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&diet=vegetarian&query=${searchTerm}&number=100`);
      if (response.status === 402) {
        navigate('/limit');
        return
      }
      const data = await response.json();
      const {results} = data;

      if (results) {
        const newRecipes = results.map((item) => {
          return {
            id: item.id,
            title: item.title,
            image: item.image
          }
        })
        setRecipes(newRecipes);
      } else {
        setRecipes([]);
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }, [searchTerm]);

  return (
    <AppContext.Provider
    value={{
      loading,
      recipes,
      searchTerm,
      setSearchTerm,
      fetchRecipes,
      setLoading,
      setRecipes,
      key,
      setKey,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
return useContext(AppContext)
}

export { AppContext, AppProvider }