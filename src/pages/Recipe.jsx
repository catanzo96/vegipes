import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { useGlobalContext } from '../context';
import {motion} from 'framer-motion';
import _ from 'lodash';

import Loading from '../components/Loading';

import {BiCheckCircle, BiXCircle, BiTime} from 'react-icons/bi';
import {TbLeaf} from 'react-icons/tb';

export default function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {setLoading, loading, key} = useGlobalContext();
  const [recipeInfo, setRecipeInfo] = useState([]);
  
  async function getRecipe() {
    setLoading(true);
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}&includeNutrition=false`);

      if (response.status === 402) {
        navigate('/limit');
        return
      };

      const data = await response.json();

      if (data) {
        let infoObj = {
          title: _.get(data, 'title', ''),
          vegan: _.get(data, 'vegan', ''),
          time: _.get(data, 'readyInMinutes', ''),
          milk: _.get(data, 'dairyFree', ''),
          glutenFree: _.get(data, 'glutenFree', ''),
          instruction: _.get(data, 'instructions', ''),
          image: _.get(data, 'image', ''),
          ingredients: _.get(data, 'extendedIngredients', '')
        }

        if (infoObj.ingredients) {
          infoObj = {...infoObj, 
            ingredients: infoObj.ingredients.map((item) => {
            return item.original
          })}
        }
        setRecipeInfo(infoObj);
      } else {
        setRecipeInfo(null);
      };
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipe()
  }, [id]);

  if (loading) {
    return <Loading />
  };
  if (!recipeInfo) {
    return <h2>No recipe info</h2>
  }
  else {
    const {title, vegan, time, milk, glutenFree, instruction, image, ingredients} = recipeInfo;
    return (
      <div className='page'>
        <motion.div
          animate={{opacity: 1}}
          initial={{opacity: 0}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}}
        >
        <div className='page-center recipe'>
          <h2 className='recipe-title'>{title ? title : 'Title not found'}</h2>
            <div className='main-flex'>
              <div className='recipe-div'>
                <div className='subtitle'>
                  <TbLeaf className='icon'/>
                  <h3>Info</h3>
                </div>
                <div className='recipe-dot'>
                  <ul>
                    <li>{vegan ? <BiCheckCircle className='green dot'/> : <BiXCircle className='red dot'/>} Vegan</li>
                    <li>{glutenFree ? <BiCheckCircle className='green dot'/> : <BiXCircle className='red dot'/>} Gluten Free</li>
                    <li>{milk ? <BiCheckCircle className='green dot'/> : <BiXCircle className='red dot'/>} Dairy Free</li>
                    <li><BiTime className='time dot'/> {time ? `${time} min.` : 'Time not found'}</li>
                  </ul>
                </div>
                <div className='subtitle'>
                  <TbLeaf className='icon'/>
                  <h3>Ingredients</h3>
                </div>
                <div className='ingredients-list'>
                  <ul>
                    {ingredients ? ingredients.map((item, index) => {
                      return <li key={index}>{item}</li>}) : 'No ingrendients found'}
                  </ul>
                </div>
              </div>
              <div className='recipe-img'>
                <img src={image ? image : '../../public/food-placeholder.jpg'} alt={`recipe_n_${id}`} />
              </div>
            </div>
            <div className='recipe-instructions'>
              <div className='subtitle'>
                <TbLeaf className='icon'/>
                <h3>Instructions</h3>
              </div>
              <div className='recipe-inst'>
                {instruction ? instruction.replace(/<[^>]*>?/gm, '') : 'Instruction not found'}
              </div>
            </div>
        </div>
        </motion.div>
      </div>
    )
  }
}