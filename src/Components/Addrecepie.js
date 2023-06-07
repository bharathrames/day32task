import React, { useState } from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'
import { Appstates } from '../Context/Appprovider'
import { Input, InputGroup, InputLeftElement, Stack, WrapItem, Button, Box } from '@chakra-ui/react'
import * as yup from 'yup'
import { useFormik } from 'formik'

const fieldvalidation = yup.object({
  name: yup.string().required("Please fill the Food Name"),
  type: yup.string().required("Please fill the Food Type ").min(3, "please type Veg or Non-veg"),
  time: yup.string().required("Please fill the making Time"),
  price: yup.string().required("Please fill the Food price")
})


function Addreceipe() {

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: {
      name: "",
      type: "",
      price: "",
      time: ""
    },
    validationSchema: fieldvalidation,
    onSubmit: (newrecepiedata) => {
      createrecepie(newrecepiedata)
    }

  })

  const { recepie, setRecepie } = Appstates()
  const history = useHistory()
  // const [name, setName] = useState("")
  // const [type, setType] = useState("")
  // const [price, setPrice] = useState("")
  // const [time, setTime] = useState("")

  const createrecepie = async (newrecepie) => {
    // creating object from Input states
    // const newrecepie = {
    //   name: name,
    //   type: type,
    //   time: time,
    //   price: price,
    // }

    const response = await fetch("https://647ae66fd2e5b6101db09f25.mockapi.io/recepie", {
      method: "POST",
      body: JSON.stringify(newrecepie),
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json()
    setRecepie([...recepie, data])
    history.push("/recepie")
  }

  return (
    <Base
      title={"Add New Foods"}
      description={"We can able to add new Food data here"}
    >
      <div className='inputbox'>
        <Stack spacing={4}>
          <form onSubmit={handleSubmit}>
            <Input
              variant='filled'
              placeholder='Enter Food Name'
              type="name"
              name='name'
              onBlur={handleBlur}
              value={values.name}
              onChange={handleChange}
            />
            <div style={{ color: "crimson" }}>{touched.name && errors.name ? errors.name : ""}</div>

            <Input
              variant='filled'
              placeholder='Enter Food Type'
              type="type"
              name='type'
              onBlur={handleBlur}
              value={values.type}
              onChange={handleChange}
            />
            <div style={{ color: "crimson" }}> {touched.type && errors.type ? errors.type : ""}</div>

            <Input
              variant='filled'
              placeholder='Enter Making time'
              type="times"
              name='time'
              onBlur={handleBlur}
              value={values.time}
              onChange={handleChange}
              
            />
            <div style={{ color: "crimson" }}>{touched.time && errors.time ? errors.time : ""}</div>

            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children='$'
              />
              <Input placeholder='Enter price'
                type="price"
                name='price'
                onBlur={handleBlur}
                value={values.price}
                onChange={handleChange}
              />
            </InputGroup>
            <div style={{ color: "crimson" }}>{touched.price && errors.price ? errors.price : ""}</div>
            
       
      <div className='inputboxbutton'>
        <WrapItem>
          <Button colorScheme='messenger' type='submit'>Add Food</Button>
        </WrapItem>
      </div>
      </form>
        </Stack>
      </div>
    </Base>
  )
}

export default Addreceipe