import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import "../CSS/Home.css"

function Home(userDetails) {
  const displayName = userDetails.user;
  const [notes, setNotes] = useState([
    { title: 'Note Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor eleifend velit a lobortis. Curabitur vitae porta enim. Cras scelerisque tristique diam ut placerat. Cras eleifend euismod odio at rutrum. Morbi porttitor quis augue quis egestas. Cras a elementum lectus. Integer id tempor augue, sit amet elementum nibh. Nam cursus enim ut nunc hendrerit lobortis. Aenean sed dui dictum, tempus risus non, finibus purus. Suspendisse vel nisl et ligula pulvinar aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst.' },
    { title: 'Note Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor eleifend velit a lobortis. Curabitur vitae porta enim. Cras scelerisque tristique diam ut placerat. Cras eleifend euismod odio at rutrum. Morbi porttitor quis augue quis egestas. Cras a elementum lectus. Integer id tempor augue, sit amet elementum nibh. Nam cursus enim ut nunc hendrerit lobortis. Aenean sed dui dictum, tempus risus non, finibus purus. Suspendisse vel nisl et ligula pulvinar aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst.' },
    { title: 'Note Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor eleifend velit a lobortis. Curabitur vitae porta enim. Cras scelerisque tristique diam ut placerat. Cras eleifend euismod odio at rutrum. Morbi porttitor quis augue quis egestas. Cras a elementum lectus. Integer id tempor augue, sit amet elementum nibh. Nam cursus enim ut nunc hendrerit lobortis. Aenean sed dui dictum, tempus risus non, finibus purus. Suspendisse vel nisl et ligula pulvinar aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst.' },
  ]);

  const [newNote, setNewNote] = useState({
    title: "Title",
    text: "Note",
  });

  const [isLoggedIn, setLoginStatus] = useState(false)

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

  const addNewNote = () => {
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
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
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
