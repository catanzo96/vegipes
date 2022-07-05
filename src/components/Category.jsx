import React, { useState, useCallback } from 'react';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';

import { GiItalia, GiIndianPalace } from 'react-icons/gi';
import { BiCookie } from 'react-icons/bi';
import { FaGlobeEurope } from 'react-icons/fa';

export default function Category() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const { setLoading, setRecipes, key } = useGlobalContext();
  
  const fetchCategory = useCallback( async (cat) => {
    const checkCat = localStorage.getItem(cat);
    if (checkCat) {
      setLoading(true);
      setRecipes(JSON.parse(checkCat));
      navigate('/searched/'+cat);
      setLoading(false);
    } else {
      setLoading(true);
      setCategory(cat);
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&diet=vegetarian&query=${cat}&number=100`);
        if (response.status === 402) {
          navigate('/limit')
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
          localStorage.setItem(cat, JSON.stringify(newRecipes));
          setRecipes(newRecipes);
        } else {
          setRecipes([]);
        }
        navigate('/searched/'+cat);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }, [category]);


  return (
    <div className='category-list'>
      <div className='category'>
        <div className='btn'>
        <button onClick={() => fetchCategory('italian')}>
          <GiItalia className='cat-icon'/>
        </button>
        </div>
        <h4 className='cat-title'>Italian</h4>
      </div>

      <div className='category'>
        <div className='btn'>
        <button onClick={() => fetchCategory('american')}>
          <BiCookie className='cat-icon'/>
        </button>
        </div>
        <h4 className='cat-title'>American</h4>
      </div>

      <div className='category'>
        <div className='btn'>
        <button onClick={() => fetchCategory('mediterranean')}>
          <FaGlobeEurope className='cat-icon'/>
        </button>
        </div>
        <h4 className='cat-title'>Mediterranean</h4>
      </div>

      <div className='category'>
        <div className='btn'>
        <button onClick={() => fetchCategory('indian')}>
          <GiIndianPalace className='cat-icon'/>
        </button>
        </div>
        <h4 className='cat-title'>Indian</h4>
      </div>
    </div>
  )
}
