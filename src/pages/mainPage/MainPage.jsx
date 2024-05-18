import React, {useEffect, useState} from 'react';
import {axiosInstance} from "../../utils/API/API";
import {useNavigate} from "react-router-dom";
import './style.css'

const MainPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [characters, setCharacters] = useState([])
  const navigate = useNavigate()
  const getCharacters = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get('api/v2/Characters')
      setCharacters(response.data)
    } catch (e) {

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    (async () => {
      await getCharacters()
    })()
  }, [])

  return (
    <div>
      {isLoading ?
        <h1 style={{textAlign: 'center'}}>LOADING....</h1>
        :
        <div className='character-list-wrap'>
          {characters.map((item, idx) => {
            return (
              <div
                key={idx}
                className='character-list'
                onClick={() => navigate(`/${item.id}`)}
              >
                <div>
                  {item.id}
                </div>
                <div>
                  {item.fullName}
                </div>
                <div className='photo'>
                  <img src={item.imageUrl} alt=""/>
                </div>
              </div>
            )
          })}
        </div>
      }
    </div>
  );
};

export default MainPage;