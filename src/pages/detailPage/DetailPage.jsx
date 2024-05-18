import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {axiosInstance} from "../../utils/API/API";
import './style.css'

const DetailPage = () => {

  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [character, setCharacter] = useState({})

  const getCharacter = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(`api/v2/Characters/${id}`)
      setCharacter(response.data)
    } catch (e) {
      if (e.response.status === 400) {
        alert('В запросе есть синтаксическая ошибка. Код ошибки 400')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    (async () => {
      await getCharacter()
    })()
  }, [])

  return (
    <div className='container'>
      {isLoading ?
        <h1>LOADING....</h1>
        :
        <div>
          <h2>{character.fullName}</h2>
          <div className='big-photo'>
            <img src={character.imageUrl} alt=""/>
          </div>
          <div>{character.family}</div>
        </div>
      }
    </div>
  );
};

export default DetailPage;