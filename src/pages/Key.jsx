import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Key() {
  const [invalid, setInvalid] = useState(false);
  const [message, setMessage] = useState('');
  const searchValue = React.useRef('');
  const navigate = useNavigate();

  const tryGetData = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${searchValue.current.value}`);
      if (response.status === 401) {
        setMessage('');
        setInvalid(true);
        return
      } else {
        localStorage.setItem('key', JSON.stringify(searchValue.current.value));
        setMessage('');
        setInvalid(false);
        alert('Key inserted correctly');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }


  function handleSubmit(e) {
    e.preventDefault();

    if (searchValue.current.value === '') {
      setInvalid(false);
      setMessage('');
      return
    };

    const checkKey = localStorage.getItem('key');
    if (checkKey === searchValue.current.value) {
      setMessage('Key already inserted');
    }

    tryGetData();

  }
  
  return (
    <div className='page'>
      <div className='page-center key'>
        <h2 className='page-title'>Insert your key</h2>
        <p>In this page you can enter your key to access the recipes.</p>
        <p>Once registered on <a href='https://spoonacular.com/food-api' target='_blank'>Spoonacular</a> go to the 'MY CONSOLE'. At 'Profile' section you can find your personal key.</p>
        <p>Insert it below to get more daily recipes.</p>

        <form onSubmit={handleSubmit}>
        <input
            className={`input ${invalid ? 'red-input' : ''}`}
            type='text'
            ref={searchValue}
          />
        </form>
        {message}
        {invalid && <p className='error'>The key inserted is wrong.</p>}
        <p>Attention, the key is saved locally on the device so if you change devices make sure to insert your key again.</p>
      </div>
    </div>
  )
}