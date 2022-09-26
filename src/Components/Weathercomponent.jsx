import React from "react";
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { AspectRatio, Box, Button, Flex, Image, Input, InputGroup, InputRightElement, Spinner, Stack, Text } from "@chakra-ui/react";


function  WeatherComponent(){
  const [value,setValue] = useState("");
  const [weather, updateWeather] = useState();
  const [isLoading,setLoading] = useState(true);

  function CallFun(value){
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    },500)
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${value?value:"bangalore"}&cnt=7&appid=43554d014c4c52440c74622ee1aea9db&units=metric`).then((res)=>{
//console.log(res.data)
      updateWeather(res.data)
    })
  },[value])
}
let arr=[];
  const date=new Date()
  arr.push(date)
  console.log(arr[0])
    const handleClick = () =>{
     console.log("clicked")
     CallFun(value)
    }
    const handleChange=(e)=>{
      setValue(e.target.value)

    }
    CallFun(value)

    console.log(value)
    console.log(isLoading)
        console.log("!",weather)



      return(<>
      <Box>
        <InputGroup size='md'>
      <Input
        pr='4.5rem'
        placeholder='Enter City Name'
        value={value}
        onChange={handleChange}
        />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          { 'Search'}
        </Button>
      </InputRightElement>
    </InputGroup>
          
             <Box>

             {weather ? (
               
               <Box display="flex" direction="row" flexWrap="nowwrap"   overflowX= "scroll"
               justify="center" gap={3}>
                  {weather.list.map((e) => (
                    <Box key={e.id} >
                      <Stack>
                      <Text fontSize='xs'>{`${e.dt_txt}`}</Text>
                     {weather.list[0].weather[0].main==="Clouds"? <Image
                       boxSize='50px'
                       objectFit='cover'
                       src='https://weatherapp-swanand.netlify.app/img/cloudy.ac49ed24.svg'
                       alt='cloud'
                       />:<Image
                       boxSize='50px'
                       objectFit='cover'
                       src='https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg'
                       alt='clear'
                       />}
                      <Text fontSize='xs'>{`MinTemp${e.main.temp_min}°`}</Text>
                      <Text fontSize='xs'>{`MaxTemp${e.main.temp_max}°`}</Text>
                      
                      </Stack>

                    </Box>
                  ))}
                  
                </Box>
              ) : (
                <Flex justify="center" mt={"5"}>
                  <Spinner
                    thickness="5px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#3182ce" 
                    size="lg"
                    />
                </Flex>
              )}
             </Box>
             <br /><br />
             <div className="shadow">

         <Box display="flex" justifyContent="space-around" >
               <Text fontSize="2xl">{`${weather.list[0].main.feels_like}°`}</Text>
               <Text fontSize='2xl'>{`${weather.city.name}(${weather.city.country})`}</Text>
         </Box>
         <br />
         <br />
           <Text textAlign='center' fontSize='4xl'>{`population: ${weather.city.population}`}</Text>
              <br />
              <br />
         <Box display="flex" justifyContent="space-around" >
               <Text fontSize="2xl">{`sunrise-mins:`}</Text>
               <Text fontSize='2xl'>{`sunset-mins:`}</Text>
         </Box>
         <Box display="flex" justifyContent="space-around" >
               <Text fontSize="2xl">{weather.city.sunrise}</Text>
               <Text fontSize='2xl'>{weather.city.sunset}</Text>
         </Box>
             </div>
             <br /><br />
             <AspectRatio>
             <iframe src={`https://maps.google.com/maps?q=${value?value:"bangalore"}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="2"></iframe>
             </AspectRatio>
             </Box>
        </>
      )
      
    }
    
    
    export default WeatherComponent;