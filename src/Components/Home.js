import React, { useState } from 'react';
import Button from '@mui/material/Button';
import "../CSS/Home.css"

function Home() {

  const [notes, setNotes] = useState([
    { title: 'Note Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor eleifend velit a lobortis. Curabitur vitae porta enim. Cras scelerisque tristique diam ut placerat. Cras eleifend euismod odio at rutrum. Morbi porttitor quis augue quis egestas. Cras a elementum lectus. Integer id tempor augue, sit amet elementum nibh. Nam cursus enim ut nunc hendrerit lobortis. Aenean sed dui dictum, tempus risus non, finibus purus. Suspendisse vel nisl et ligula pulvinar aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst.' },
    { title: 'Note Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor eleifend velit a lobortis. Curabitur vitae porta enim. Cras scelerisque tristique diam ut placerat. Cras eleifend euismod odio at rutrum. Morbi porttitor quis augue quis egestas. Cras a elementum lectus. Integer id tempor augue, sit amet elementum nibh. Nam cursus enim ut nunc hendrerit lobortis. Aenean sed dui dictum, tempus risus non, finibus purus. Suspendisse vel nisl et ligula pulvinar aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst.' },
    { title: 'Note Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor eleifend velit a lobortis. Curabitur vitae porta enim. Cras scelerisque tristique diam ut placerat. Cras eleifend euismod odio at rutrum. Morbi porttitor quis augue quis egestas. Cras a elementum lectus. Integer id tempor augue, sit amet elementum nibh. Nam cursus enim ut nunc hendrerit lobortis. Aenean sed dui dictum, tempus risus non, finibus purus. Suspendisse vel nisl et ligula pulvinar aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst.' },
  ]);

  const [newNote, setNewNote] = useState(
    {
      title:"Title",
      text:"Note"
    }
  )

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
  return (
    <div className="main">

      <div className="main-title">
        <p>My Notes</p>
      </div>

      <div  className='input-note'>
        
            <p
              className='note-title'
              contentEditable
              onBlur={(event) => {
                newNote.title = event.target.innerText;
                setNewNote(newNote)
              }}
            >
              {newNote.title}
            </p>
            <p
              className='note-text'
              contentEditable
              onBlur={(event) => {
                newNote.text = event.target.innerText;
                setNewNote(newNote)
              }}
            >
              {newNote.text}
            </p>

            <Button variant="contained" size="small"  onClick={addNewNote}>
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
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;
