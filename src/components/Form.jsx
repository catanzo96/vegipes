import React from 'react';
import Category from './Category';
import { BiSearch } from 'react-icons/bi';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';

export default function Form() {
  const { setSearchTerm, fetchRecipes} = useGlobalContext();
  const navigate = useNavigate();
  const searchValue = React.useRef('');
  
  function handleWord() {
    setSearchTerm(searchValue.current.value.trim().split(' ').join(',+'))
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (searchValue.current.value.trim().split(' ').join(',+') === '') {
      return
    }
    navigate('/searched/'+searchValue.current.value.trim().split(' ').join(',+'));
    fetchRecipes();
  };

  return (
    <div className='form-center'>
      <h3 className='page-title'>Search for your favorite recipes</h3>
      <form onSubmit={handleSubmit}>
        <BiSearch className='form-lens'></BiSearch>
        <input
            type='text'
            ref={searchValue}
            onChange={handleWord}
          />
      </form>
      <Category/>
    </div>
  )
}