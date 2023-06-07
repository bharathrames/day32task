import Base from '../Base/Base';
import { useHistory } from 'react-router-dom';
import { Appstates } from '../Context/Appprovider';
import { Button, ButtonGroup, Divider, Heading, Stack, Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
function Recepie() {
  const { recepie, setRecepie } = Appstates()
  const history = useHistory();
  // delete functionality
  const deleterecepie = async (recepieid) => {

    const response = await fetch(`https://647ae66fd2e5b6101db09f25.mockapi.io/recepie/${recepieid}`, {
      method: "DELETE",
    });

    const data = await response.json()
    if (data) {
      const remainingrecepie =
        recepie.filter((res, idx) => res.id !== recepieid)
      setRecepie(remainingrecepie)
    }
  }
  return (
    <Base
      title={"Foods Dashboard"}
      description={"The page contains all Food data"}
    >

      <div className='card-container'>
        {recepie.map((res, idx) => (
          <div className='card' key={idx}>
            <div className='content'>
              <Card maxW='sm'>
                <CardBody>
                  <Stack mt='6' spacing='3'>
                    <Heading size='md'>{res.name}</Heading>
                    <Text>{res.type}</Text>
                    <Text>{res.time}</Text>
                    <Text color='blue.600' fontSize='2xl'>
                    ₨ {res.price}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='facebook' onClick={() => history.push(`/edit/${idx}`)}>
                      edit
                    </Button>
                    <Button variant='solid' colorScheme='red' onClick={() => deleterecepie(res.id)}>
                      delete
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </div>

            {/* <div className='control'>
              <button onClick={() => history.push(`/edit/${idx}`)}>edit</button> {" "}
              <button onClick={() => deleterecepie(res.id)}>delete</button>
            </div> */}
          </div>
        ))}
      </div>
    </Base>
  )
}

export default Recepie
