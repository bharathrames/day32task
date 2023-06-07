import { Button, WrapItem } from '@chakra-ui/react';
import React from 'react'
import { useHistory } from 'react-router-dom';

const Base = ({title, description, children}) => {
  const history = useHistory();
  
  return (
    
    <div className='main-component base-component'>
      <WrapItem>
      <Button colorScheme='twitter'
      onClick={()=>history.push("/")}
      >Dashboard</Button>
      </WrapItem>
      <WrapItem>
      <Button colorScheme='twitter'
      onClick={()=>history.push("/recepie")}
      >Foods-List</Button>
      </WrapItem>
      <WrapItem>
      <Button colorScheme='twitter'
      onClick={()=>history.push("/add")}
      >Add-Foods</Button>
      </WrapItem>
      
         <header>
            <h1 className='heading'>{title}</h1>
         </header>
         <main className='main-segment'>
             <h2>{description}</h2>
             <div>
               {children}
             </div>
         </main>
    </div>
  )
}

export default Base