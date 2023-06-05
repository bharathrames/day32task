import Base from '../Base/Base';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Appstates } from '../Context/Appprovider';

 function Recepie () {
  const [recepie, setRecepie] = Appstates()
  const history = useHistory();
  // delete functionality
  const deleterecepie = async (recepieid)=>{
    
    const response = await fetch(`https://647ae66fd2e5b6101db09f25.mockapi.io/recepie/${recepieid}`, {
       method:"DELETE",
    });

    const data = await response.json()
   if(data){
     const remainingrecepie = 
     recepie.filter((res, idx)=> res.id !== recepieid)
     setRecepie(remainingrecepie)
   }
  }
  return (
   <Base
   title={"Recepie Dashboard"}
    description={"The page contains all Recepie data"}
    >

          <div className='card-container'>
            {recepie.map((res, idx)=>(
                     <div className='card' key={idx}>
                        <div className='content'>
                     <h3>{res.name}</h3>
                     <p>{res.type}</p>
                     <p>{res.time}</p>
                     <p>{res.price}</p>
                     </div>

                   <div className='control'>
                   <button onClick={()=>history.push(`/edit/${res.id}`)}>edit</button> {" "}
                    <button onClick={()=>deleterecepie(res.id)}>delete</button>
                     </div>
                 </div>
           ))}
     </div>
   </Base>
 )
}

export default Recepie
