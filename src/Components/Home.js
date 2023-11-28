import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { SocialIcon } from 'react-social-icons';
import Chip from '@mui/material/Chip';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../CSS/Home.css"

function Home(userDetails) {

  const filter = createFilterOptions();
  var [categoriesFilter, setCategoriesFilter] = useState([{name:"Home"}]);
  var displayName = userDetails.user;
  var [notes, setNotes] = useState([]);
  var [value, setValue] = useState({name:categoriesFilter[0].name});
  var [searchOn,setSearchOn] = useState(false)
  var [buttonText,setButtonText] = useState("Search")
  var [categorySearch,setCategorySearch] = useState("")
  var [searchText,setSearchText] = useState("");
  var [searchResults, setSearchResults] = useState([]);

  var [newNote, setNewNote] = useState({
    title: "Title",
    text: "Note",
    category: value.name || "Home"
  });


  const handleTitleSearch = (searchTextTemp) => {

    const filteredNotes = notes.filter((note) => {

      const titleMatch = note.title.toLowerCase().includes(searchTextTemp.toLowerCase());

      var categoryMatch = true;

      if(categorySearch!=='' && categorySearch!== null && categorySearch !== undefined ){
        categoryMatch = note.category.toLowerCase().includes(categorySearch['name'].toLowerCase());
      }

      return titleMatch && categoryMatch
    });

    setSearchResults(filteredNotes);
  };

  const handleCategorySearch = (categorySearchTemp) => {

    const filteredNotes = notes.filter((note) => {

      const titleMatch = note.title.toLowerCase().includes(searchText.toLowerCase());

      var categoryMatch = true;

      if(categorySearch!==''){
        categoryMatch = note.category.toLowerCase().includes(categorySearchTemp['name'].toLowerCase());
      }

      return titleMatch && categoryMatch
    });

    setSearchResults(filteredNotes);
  };

	const getNotes = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/user/notes`;
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
			const url = `${process.env.REACT_APP_API_URL}/user/addNote`;

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
			const url = `${process.env.REACT_APP_API_URL}/user/deleteNote`;
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
      const url = `${process.env.REACT_APP_API_URL}/user/updateNote`;
      const requestData = {
        noteId: noteId,
        newTitle: newTitle,
        newText: newText,
      };
  
      const response = await axios.post(url, requestData, { withCredentials: true });

      if(response.status===200){
        toast.success('Note was updated successfully!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }else{
        toast.error('Something went wrong!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleTitleChange = async(index, event) => {

    if(event.target.value!==notes[index].title){

    const newNotes = [...notes];
    newNotes[index].title = event.target.value;
    await updateNote(newNotes[index]._id,newNotes[index].title,notes[index].text)

    setNotes(newNotes);

    }
  };

  const handleTextChange = async(index, event) => {

    const newNotes = [...notes];
    newNotes[index].text = event.target.value;

    await updateNote(newNotes[index]._id,newNotes[index].text,notes[index].title)

    setNotes(newNotes);
  };

  const addNewNote = async() => {

    const status = await addNotesToDatabase()
    
    if(status){

      toast.success('Note was addded successfully!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      const newNotes = [...notes];
      newNotes.push({ ...newNote });
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

    }else{

      toast.error('Something went wrong!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

    }




  };

  const deleteNote = async(index) => {

    const status = await deleteNotesFromDatabase(notes[index]._id)

    if(status){

      toast.success('Note was deleted successfully!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      const updatedNotes = [...notes];
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);

    }else{

      toast.error('Something went wrong!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

    }

  };

  const logout = () => {
    window.open(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        "_self"
    );
  };

  const toggleSearch = () => {

    if(!searchOn){
      setButtonText("Add Notes")
    }else if(searchOn){
      setButtonText("Search")
    }
    setSearchOn(!searchOn)
    setSearchResults(notes)
    setSearchText("")
    setCategorySearch("")

  }

	useEffect(() => {
		getNotes();
	}, []);

  return (
  <div className="main">

      <div className='navbar'>

        <Button className='navbarButton' variant="contained"  size="small" onClick={toggleSearch}>
              {buttonText}
        </Button>
        <div style={{ marginLeft: '10px' }}></div>
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

    {!searchOn && (


      <div className='input-note'>

            <div style={{ marginTop: '13px' }}></div>
            <TextField className='inputText'
                id="outlined-multiline-flexible"
                label="Title"
                multiline
                maxRows={4}
                onBlur={(event) => {
                  newNote.title = event.target.value;
                  setNewNote(newNote);
                }}
            />

            <div style={{ marginTop: '13px' }}></div>

            <TextField className='inputText'
                id="outlined-multiline-flexible"
                label="Text"
                multiline
                maxRows={4}
                onBlur={(event) => {
                  newNote.text = event.target.value;
                  setNewNote(newNote);
                }}
            />


        <div style={{ marginTop: '13px' }}></div>

          <span className='category-text inputText'>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              console.log(newValue)
              if (typeof newValue === 'string') {
                setValue({
                  name: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                setValue({
                  name: newValue.inputValue,
                });
              }else if (newValue==null) {
                setValue({
                  name: '',
                });
              } else {
                setValue(newValue);
              }
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

    )}

    {searchOn && (
      <>
      
      <TextField
        id="outlined-multiline-flexible"
        label="Search Notes"
        sx={{ width: 300}}
        onChange={(event) => {
          setSearchText(event.target.value)
          handleTitleSearch(event.target.value);
        }}
      />

      <div style={{ marginTop: '15px' }}></div>

      <Autocomplete
            value={categorySearch}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setCategorySearch(newValue);
              } else if (newValue && newValue.inputValue) {
                setCategorySearch(newValue.inputValue);
              }else if (newValue==null) {
                setCategorySearch('');
              }
               else {
                setCategorySearch(newValue);
              }
              handleCategorySearch(newValue)
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={categoriesFilter}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.name;
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            sx={{ width: 300}}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Category" />
            )}
      />

      </>
    )}

    {!searchOn && (
      <div className='allNotes'>
        {notes.map((note, index) => (
          <div key={index} className='note'>

            <div style={{ marginTop: '13px' }}></div>
            <TextField className='noteText'
                label="Title"
                variant='standard'
                multiline
                maxRows={4}
                onBlur={(event) => handleTitleChange(index, event)}
                defaultValue={note.title}
            />

          <div style={{ marginTop: '13px' }}></div>
            <TextField className='noteText'
                label="Text"
                variant='standard'
                multiline
                maxRows={4}
                onBlur={(event) => handleTextChange(index, event)}
                defaultValue={note.text}
            />
          <div style={{ marginTop: '13px' }}></div>

            <div className='note-actions'>
              <span className='deleteIcon'>
                <IconButton color="primary" onClick={() => deleteNote(index)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </span>
              {note.category!=='' && (
              <Chip className='note-chip' label={note.category} color="primary" />
              )}
            </div>
                    
          </div> 
        ))}
      </div>
    )}

    {searchOn && (
          <div className='allNotes'>
            {searchResults.map((note, index) => (
              <div key={note._id} className='note'>

                <div style={{ marginTop: '13px' }}></div>
                <TextField className='noteText'
                    label="Title"
                    variant='standard'
                    multiline
                    maxRows={4}
                    onBlur={(event) => handleTitleChange(index, event)}
                    defaultValue={note.title}
                />

              <div style={{ marginTop: '13px' }}></div>
                <TextField className='noteText'
                    label="Text"
                    variant='standard'
                    multiline
                    maxRows={4}
                    onBlur={(event) => handleTextChange(index, event)}
                    defaultValue={note.text}
                />
              <div style={{ marginTop: '13px' }}></div>

                <div className='note-actions'>
                {note.category!=='' && (
                  <Chip className='note-chip' label={note.category} color="primary" />
                )}
                </div>
                        
              </div> 
            ))}
          </div>
    )}

    <div className="footer">
        <SocialIcon url="https://twitter.com/0xAnon0602" style={{ height: 30, width: 30 }} />
        <SocialIcon url="https://github.com/0xAnon0602" style={{ height: 30, width: 30 }} />
    </div>
    <p>Created by 0xAnon</p>


  </div>
  );
}

export default Home;
