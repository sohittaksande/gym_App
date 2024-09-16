import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      
        const bodyPartsData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',  
          exerciseOptions
        );
       
        setBodyParts(['all', ...bodyPartsData]);
   
    }

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      try {
        // Fetch exercises data from the API
        const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
  
        console.log("Fetched Exercises Data: ", exercisesData);
  
        // Filter exercises based on search term (case-insensitive)
        const searchedExercises = exercisesData.filter(
          (item) => item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.target.toLowerCase().includes(search.toLowerCase()) ||
                    item.equipment.toLowerCase().includes(search.toLowerCase()) ||
                    item.bodyPart.toLowerCase().includes(search.toLowerCase())
        );
  
        console.log("Searched Exercises: ", searchedExercises);
  
        window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
  
        // Update state with the searched exercises
        setSearch('');
        setExercises(searchedExercises);
      } catch (error) {
        console.error("Error fetching exercises: ", error);
      }
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="49px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          sx={{
            input: {
              fontWeight: '700',
              border: 'none',
              borderRadius: '4px',
            },
            width: { lg: '1170px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '173px', xs: '80px' },
            height: '56px',
            position: 'absolute',
            right: '0px',
            fontSize: { lg: '20px', xs: '14px' },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', overflowX: 'auto', p: '20px' }}>
        {bodyParts.length > 0 ? (
          <HorizontalScrollbar data={bodyParts} isBodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
        ) : (
          <Typography>No body parts available</Typography>
        )}
      </Box>
    </Stack>
  );
};

export default SearchExercises;

