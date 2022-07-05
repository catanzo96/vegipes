import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { useGlobalContext } from '../context';
import Loading from '../components/Loading';

import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import {TbLeaf} from 'react-icons/tb';

export default function Popular() {
  const {key, setKey} = useGlobalContext();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  function watchWidth() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', watchWidth);
    return function() {
      window.removeEventListener('resize', watchWidth);
    }
  }, []);

  let number;
  if (width <= 550) {
    number = 1
  } else if (width > 550 && width <= 1050) {
    number = 2
  } else if (width > 1050 && width <= 1550) {
    number = 3
  } else {
    number = 4
  }

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular()
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem('popular');

    if (check) {
      setLoad(true);
      setPopular(JSON.parse(check));
      setLoad(false);
    } else {
      const checkKey = localStorage.getItem('key');

      if (checkKey) {
        setKey(JSON.parse(checkKey))
      }

      setLoad(true);
      const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${key}&number=10&tags=vegetarian`);
      if (response.status === 402) {
        navigate('/limit')
        return
      }
      const data = await response.json();

      localStorage.setItem('popular', JSON.stringify(data.recipes))
      setPopular(data.recipes);
      setLoad(false);
    }
  };
  
  return (
    <div>
      <div className='sug-title'>
        <TbLeaf className='sug-icon'/>
        <h3>Popular Recipes</h3>
      </div>
      {load ? 
        <Loading /> 
        :
        <Splide options={{
          perPage: `${number}`,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '2rem',
        }}>
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Link to={`/recipe/${recipe.id}`}>
              <Card>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title}></img>
                <Gradient />
              </Card>
                </Link>
              </SplideSlide>
            )
          })}
        </Splide>
      }
    </div>
  )
}

const Card = styled.div`
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  border: 1px solid green;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 15px;
    bottom: 5px;
    color: white;
  }
`

const Gradient = styled.div`
z-index: 3;
position: absolute;
width: 100%;
height: 100%;
background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`