import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import "../CSS/Home.css"

function Home(userDetails) {
  const displayName = userDetails.user;
  const [notes, setNotes] = useState([]);

  const [newNote, setNewNote] = useState({
    title: "Title",
    text: "Note",
  });


	const getNotes = async () => {
		try {
			const url = `http://localhost:8080/user/notes`;
			const { data } = await axios.get(url, { withCredentials: true });
      console.log(data.info)
			setNotes(data.info.notes);
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
      };

      console.log(requestData)

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

      console.log(requestData)

      const response = await axios.post(url, requestData, { withCredentials: true });
      getNotes()
      return (response.status===200)
		} catch (err) {
			console.log(err);
		}
	};


	useEffect(() => {
		getNotes();
	}, []);

  const handleTitleChange = (index, event) => {
    const newNotes = [...notes];
    newNotes[index].title = event.target.innerText;
    setNotes(newNotes);
  };

  const handleTextChange = (index, event) => {
    const newNotes = [...notes];
    newNotes[index].text = event.target.innerText;
    setNotes(newNotes);
  };

  const addNewNote = async() => {

    const status = await addNotesToDatabase()
    
    if(status){

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

        <Button variant="contained" size="small" onClick={addNewNote}>
          New Note
        </Button>
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
            <span className='deleteIcon'>
              <IconButton color="primary" onClick={() => deleteNote(index)}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </span>
          </div>
        ))}
      </div>
  </div>
  );
}

export default Home;
