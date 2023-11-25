import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { SocialIcon } from 'react-social-icons';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import "../CSS/Home.css"


function Home(userDetails) {

  const filter = createFilterOptions();

  const [categoriesFilter, setCategoriesFilter] = useState([{name:"Home"}]);
  const displayName = userDetails.user;
  const [notes, setNotes] = useState([]);
  const [value, setValue] = useState({name:categoriesFilter[0].name});



  const [newNote, setNewNote] = useState({
    title: "Title",
    text: "Note",
    category:value.name
  });



	const getNotes = async () => {
		try {
			const url = `http://localhost:8080/user/notes`;
			const { data } = await axios.get(url, { withCredentials: true });
			setNotes(data.info.notes);

      var temp = []
      for(const category of data.info.categories){
        temp.push(
          {
            'name':category
          }
        )
      }

      setCategoriesFilter(temp)

		} catch (err) {
			console.log(err);
		}
	};

  const addNotesToDatabase = async () => {
		try {
			const url = `http://localhost:8080/user/addNote`;

      const requestData = {
        title: newNote.title,
        text: newNote.text,
        category:value.name
      };

      const response = await axios.post(url, requestData, { withCredentials: true });
      getNotes()
      return (response.status===200)
		} catch (err) {
			console.log(err);
		}
	};

  const deleteNotesFromDatabase = async (_id) => {
		try {
			const url = `http://localhost:8080/user/deleteNote`;
      const requestData = {
        noteId: _id,
      };

      const response = await axios.post(url, requestData, { withCredentials: true });
      getNotes()
      return (response.status===200)
		} catch (err) {
			console.log(err);
		}
	};

  const updateNote = async (noteId, newTitle, newText) => {
    try {
      const url = `http://localhost:8080/user/updateNote`;
      const requestData = {
        noteId: noteId,
        newTitle: newTitle,
        newText: newText,
      };
  
      const response = await axios.post(url, requestData, { withCredentials: true });
      // Handle response as needed
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTitleChange = async(index, event) => {

    const newNotes = [...notes];
    newNotes[index].title = event.target.innerText;

    await updateNote(newNotes[index]._id,newNotes[index].title,notes[index].text)

    setNotes(newNotes);
  };

  const handleTextChange = async(index, event) => {

    const newNotes = [...notes];
    newNotes[index].text = event.target.innerText;

    await updateNote(newNotes[index]._id,newNotes[index].text,notes[index].title)

    setNotes(newNotes);
  };

  const addNewNote = async() => {

    const status = await addNotesToDatabase()
    
    if(status){

      const newNotes = [...notes];
      newNotes.push({ ...newNote });
      console.log(newNote)
      setNotes(newNotes);
  
      setNewNote({
        title: "Title",
        text: "Note",
      });
  
      const titleInput = document.querySelector('.input-note .note-title');
      const textInput = document.querySelector('.input-note .note-text');
  
      if (titleInput && textInput) {
        titleInput.innerText = "Title";
        textInput.innerText = "Note";
      }

    }


  };

  const deleteNote = async(index) => {

    const status = await deleteNotesFromDatabase(notes[index]._id)

    if(status){

      const updatedNotes = [...notes];
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);

    }
  };

  const logout = () => {
    window.open(
        `http://localhost:8080/auth/logout`,
        "_self"
    );
  };

	useEffect(() => {
		getNotes();
	}, []);

  return (
  <div className="main">

      <div className='navbar'>
        <Button variant="contained" size="small">
            {displayName.name}
        </Button>
        <div style={{ marginLeft: '10px' }}></div>
        <Button variant="contained" size="small" onClick={logout}>
            Log Out
        </Button>
      </div>

      <div className="main-title">
        <p>My Notes</p>
      </div>

      <div className='input-note'>
    <div className='note-header'>
      <p
        className='note-title'
        contentEditable
        onBlur={(event) => {
          newNote.title = event.target.innerText;
          setNewNote(newNote);
        }}
      >
        {newNote.title}
      </p>
    </div>
    <p
      className='note-text'
      contentEditable
      onBlur={(event) => {
        newNote.text = event.target.innerText;
        setNewNote(newNote);
      }}
    >
      {newNote.text}
    </p>

    <span className='category-text'>
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }

        console.log(newValue)
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add ${inputValue}`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={categoriesFilter}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{ width: 300}}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Category" />
      )}
    />
    </span>


      <div style={{ marginTop: '10px' }}></div>
    <Button variant="contained" size="small" onClick={addNewNote}>
      New Note
    </Button>
    <div style={{ marginTop: '10px' }}></div>
  </div>


      <div className='allNotes'>
        {notes.map((note, index) => (
          <div key={index} className='note'>
            <p
              className='note-title'
              contentEditable
              onBlur={(event) => handleTitleChange(index, event)}
            >
              {note.title}
            </p>
            <p
              className='note-text'
              contentEditable
              onBlur={(event) => handleTextChange(index, event)}
            >
              {note.text}
            </p>

            <div className='note-actions'>
              <span className='deleteIcon'>
                <IconButton color="primary" onClick={() => deleteNote(index)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </span>
              <Chip className='note-chip' label={note.category} color="primary" />

            </div>
                    
          </div> 
        ))}
      </div>

      <div className="footer">
          <SocialIcon url="https://twitter.com/0xAnon0602" style={{ height: 30, width: 30 }} />
          <SocialIcon url="https://github.com/0xAnon0602" style={{ height: 30, width: 30 }} />
      </div>
      <p>Created by 0xAnon</p>


  </div>
  );
}

export default Home;
