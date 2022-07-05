import React from 'react';
import Loading from '../components/Loading';
import Form from '../components/Form';

import {Link} from 'react-router-dom';
import { useGlobalContext } from '../context';

import styled from 'styled-components';
import {motion} from 'framer-motion'

export default function RecipesList() {
  const {loading, recipes} = useGlobalContext();

  if (loading) {
    return <Loading />
  };
  if (recipes.length < 1) {
    <h2>No recipes found</h2>
  };

  return (
    <>
    <Form />
    <div className='recipes-list'>
      <div className='list-center'>
        <h3>{recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found</h3>
          <div className='recipes-container'>
            {recipes.map((recipe) => {
              return (
                <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                  <motion.div
                    animate={{opacity: 1}}
                    initial={{opacity: 0}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.5}}
                  >
                    <Card>
                      <p>{recipe.title}</p>
                      <img src={recipe.image} alt={recipe.title}></img>
                      <Gradient />
                    </Card>
                  </motion.div>
                </Link>
              )
            })}
          </div>
      </div> 
    </div>
    </>
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