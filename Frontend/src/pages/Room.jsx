import React from 'react'
import Mensaje from '../components/Mensaje'
import Envio from '../components/Envio'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Room() {

    const { id } = useParams();
    
  return (
    <div>
        <h1>Sala de chat</h1>
        <div>

        </div>
        <Envio id={ id }/>
    </div>
  )
}

export default Room