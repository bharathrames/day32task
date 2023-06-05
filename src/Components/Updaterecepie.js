import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../Base/Base';
import { useHistory } from 'react-router-dom';
import { Appstates } from '../Context/Appprovider';

function Updaterecepie() {
  const [recepie, setRecepie] = Appstates()
    const {id} = useParams();
     const editrecepie = recepie[id]
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [time, setTime] = useState("")
    const [price, setPrice] = useState("")
    const history = useHistory();

    useEffect(()=>{
       setName(editrecepie.name)
       setType(editrecepie.type)
       setTime(editrecepie.time)
       setPrice(editrecepie.price)
    }, [editrecepie])

    async function Updaterecepie (){
         const updatedObject = {
            name : name,
            type : type,
            time: time,
            price :price
         }
     const response = await fetch(`https://647ae66fd2e5b6101db09f25.mockapi.io/recepie/${editrecepie.id}`, {
      method:"PUT",
      body:JSON.stringify(updatedObject),
      headers:{
        "Content-Type":"application/json"
      }
     })

     const data = await response.json()
     if(data){
         console.log(updatedObject)
         recepie[id] = updatedObject
         setRecepie([...recepie])
         history.push("/recepie")
     }
    }

  return (
    <Base
    title={"Edit a recepie"}
    description={"Edit recepie here"}
    >
    <div>
    <input
    placeholder='Enter Name'
    type ="text"
    value = {name}
    onChange={(e)=>setName(e.target.value)}
    />
    <input
    placeholder='Enter Type'
    type ="text"
    value ={type}
    onChange={(e)=>setType(e.target.value)}
    />

    <input
    placeholder='Enter cooking time'
    type ="text"  
    value ={time}
    onChange={(e)=>setTime(e.target.value)}
    />

    <input
    placeholder='Enter Price'
    type ="text" 
    value= {price}
    onChange={(e)=>setPrice(e.target.value)}
    />

    <button
    onClick={Updaterecepie}
    >Update recepie</button>
</div>
</Base>
  )
}

export default Updaterecepie