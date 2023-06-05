import React, {  createContext, useContext, useEffect, useState } from 'react'

const recepiecontext = createContext()
const Appprovider = ({children}) => {
    const [recepie, setRecepie] = useState([]);
useEffect(()=>{
  const getrecepie = async () =>{
      const response = await fetch("https://647ae66fd2e5b6101db09f25.mockapi.io/recepie", {
        method:"GET",
      }); 
      const data = await response.json();
      if(data){
        setRecepie(data)
      }
  }
  getrecepie();
}, [])

  return (
    <recepiecontext.Provider 
    value={{recepie, setRecepie}}
    >
     {children}
    </recepiecontext.Provider>
  )
}

export const Appstates = ()=> {
return useContext(recepiecontext)
}
export  default Appprovider