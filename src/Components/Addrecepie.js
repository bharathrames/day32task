import React, { useState } from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'
import { Appstates } from '../Context/Appprovider'


function Addreceipe() {
  const [recepie, setRecepie] = Appstates()
  const history = useHistory()
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [price, setPrice] = useState("")
    const [time, setTime] = useState("")

const createrecepie = async () =>{
    // creating object from input states
    const newrecepie = {
      name:name,
      type:type,
      time:time,
      price: price,
}

const response = await fetch("https://647ae66fd2e5b6101db09f25.mockapi.io/recepie", {
  method:"POST",
  body:JSON.stringify(newrecepie),
  headers :{
    "Content-Type":"application/json"
  },
})
const data = await response.json()
  setRecepie([...recepie, data])
  history.push("/recepie")
}

  return (
    <Base
    title={"Add New Recepie"}
    description={"We can able to add new recepie data here"}
    >
    <div>
        <input
        placeholder='Enter Food Name'
        type ="text"
        value = {name}
        onChange={(e)=>setName(e.target.value)}
        />
        <input
        placeholder='Enter type'
        type ="text"
        value ={type}
        onChange={(e)=>setType(e.target.value)}
        />

        <input
        placeholder='Enter price'
        type ="text"  
        value ={price}
        onChange={(e)=>setPrice(e.target.value)}
        />

        <input
        placeholder='Enter Making time'
        type ="text" 
        value= {time}
        onChange={(e)=>setTime(e.target.value)}
        />

        <button
        onClick={createrecepie}
        >Add recepie</button>
    </div>
    </Base>
  )
}

export default Addreceipe