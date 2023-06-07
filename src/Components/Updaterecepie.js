import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../Base/Base';
import { useHistory } from 'react-router-dom';
import { Appstates } from '../Context/Appprovider';
import { Stack, Input, WrapItem, Button } from '@chakra-ui/react';
import * as yup from 'yup'
import { useFormik } from 'formik'

const fieldvalidation = yup.object({
  name : yup.string().required("Please fill the Food Name"),
  type : yup.string().required("Please fill the Food Type ").min(3, "please type Veg or Non-veg"),
  time : yup.string().required("Please fill the making Time"),
  price : yup.string().required("Please fill the Food price")
})


function Updaterecepie() {
  const {recepie, setRecepie} = Appstates()
  const {id} = useParams();
  const editrecepie = recepie[id]
  const {handleSubmit, values, handleChange, handleBlur, errors, touched} = useFormik({
    initialValues : {
      name : editrecepie.name ,
      type :  editrecepie.type,
      price :  editrecepie.price,
      time :  editrecepie.time 
    },
    validationSchema : fieldvalidation,
    onSubmit : (editrecepiedata) => {
      Updaterecepie(editrecepiedata)
    }

  })

  const history = useHistory();
    // const [name, setName] = useState("")
    // const [type, setType] = useState("")
    // const [time, setTime] = useState("")
    // const [price, setPrice] = useState("")
   
    // useEffect(()=>{
    //    setName(editrecepie.name)
    //    setType(editrecepie.type)
    //    setTime(editrecepie.time)
    //    setPrice(editrecepie.price)
    // }, [editrecepie])

    async function Updaterecepie (updatedObject){
        //  const updatedObject = {
        //    name,
        //    type,
        //    time,
        //    price
        //  }
     const response = await fetch(`https://647ae66fd2e5b6101db09f25.mockapi.io/recepie/${editrecepie.id}`, {
      method:"PUT",
      body:JSON.stringify(updatedObject),
      headers:{
        "Content-Type":"application/json"
      }
     })

     const data = await response.json()
     if(data){
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
      <div className='editinput'>
      <Stack spacing={3}>
        <form onSubmit={handleSubmit}>
    <Input variant='outline'
    placeholder='Enter Name'
    type ="text"
    name='name'
    value = {values.name}
    onBlur={handleBlur}
    onChange={handleChange}
    />
    <div style={{color:"crimson"}}>{touched.name && errors.name ? errors.name : ""}</div>

    <Input variant='outline'
    placeholder='Enter Type'
    type ="text"
    name='type'
    value = {values.type}
    onBlur={handleBlur}
    onChange={handleChange}
    />
     <div style={{color:"crimson"}}> {touched.type && errors.type ? errors.type : ""}</div>

    <Input variant='outline'
    placeholder='Enter cooking time'
    type ="text"  
    name='time'
    value = {values.time}
    onBlur={handleBlur}
    onChange={handleChange}
    />
      <div style={{color:"crimson"}}>{touched.time && errors.time ? errors.time : ""}</div>

    <Input variant='outline'
    placeholder='Enter Price'
    type ="text" 
    name='price'
    value = {values.price}
    onBlur={handleBlur}
    onChange={handleChange}
    />
    <div style={{color:"crimson"}}>{touched.price && errors.price ? errors.price : ""}</div>

<div className='editinputbutton'>
   <WrapItem>
     <Button colorScheme='messenger'
    type='submit'
    >Update recepie</Button>
    </WrapItem>
  </div>
  </form>
</Stack>
</div>
</Base>
  )
}

export default Updaterecepie