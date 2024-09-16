import React,{useContext} from 'react'
import { Box, Typography } from '@mui/material';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import BodyPart from './BodyPart';
import ExerciseCard from './ExerciseCard';


const HorizontalScrollbar = ({data,bodyPart, setBodyPart,isBodyParts}) => {
  return (
    <ScrollMenu>
    {data.map((item) => (
      <Box
        key={item.id || item}
        itemId={item.id || item}
        title={item.id || item}
        sx={{ display: 'inline-block', margin: '0 40px' }} // Use 'inline-block' for horizontal arrangement
      >
        
        {isBodyParts ? <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
        :<ExerciseCard exercise={item}/>}
      </Box>
    ))}
  </ScrollMenu>
  
)
}


export default HorizontalScrollbar;
