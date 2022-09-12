import { useCallback, useState } from 'react';
import axios from 'axios';
import './index.scss';
const API_ENDPOINT = `https://algochurn-server.onrender.com/practice/countries`;

export default function CountryList() {
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [options, setOptions] = useState([]);

  const debounce = (callback, delay = 500) => {
    let timer = null;

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const fetchData = async (query) => {
    try {
      const {
        data: { countries },
      } = await axios.get(`${API_ENDPOINT}/${query}`);
      console.log(countries);
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedChange = useCallback(
    debounce((value) => {
      if (value.length > 2) {
        fetchData(value);
      } else {
        setOptions([]);
      }
    }, 500),
    []
  );

  const handleChange = (value) => {
    setSearchText(value);
    debouncedChange(value);
  };

  return (
    <div className='search-container'>
      <div className='search-box'>
        <div className='input-box'>
          <input
            type='text'
            className='search-input'
            onChange={(event) => handleChange(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
