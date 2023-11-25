import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { SocialIcon } from 'react-social-icons';
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
            <span className='deleteIcon'>
              <IconButton color="primary" onClick={() => deleteNote(index)}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </span>
            
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
