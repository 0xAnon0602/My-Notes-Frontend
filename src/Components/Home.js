import Button from '@mui/material/Button';
import "../CSS/Home.css"

function Home() {
    return (
      <div className="main">

        <div className="main-title">
            <p>My Notes</p>
        </div>
        
        {/* <Button className='google-button' variant="contained">
          Sign in with Google
        </Button> */}

        <div className='allNotes'>

          <div className='note'>

            <p className='note-title'>Note Title</p>
            <p className='note-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor eleifend velit a lobortis. Curabitur vitae porta enim. Cras scelerisque tristique diam ut placerat. Cras eleifend euismod odio at rutrum. Morbi porttitor quis augue quis egestas. Cras a elementum lectus. Integer id tempor augue, sit amet elementum nibh. Nam cursus enim ut nunc hendrerit lobortis. Aenean sed dui dictum, tempus risus non, finibus purus. Suspendisse vel nisl et ligula pulvinar aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst.</p>

          </div>

          <div className='note'>

            <p className='note-title'>Note Title</p>
            <p className='note-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor eleifend velit a lobortis. Curabitur vitae porta enim. Cras scelerisque tristique diam ut placerat. Cras eleifend euismod odio at rutrum. Morbi porttitor quis augue quis egestas. Cras a elementum lectus. Integer id tempor augue, sit amet elementum nibh. Nam cursus enim ut nunc hendrerit lobortis. Aenean sed dui dictum, tempus risus non, finibus purus. Suspendisse vel nisl et ligula pulvinar aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst.</p>

          </div>
          
          <div className='note'>

            <p className='note-title'>Note Title</p>
            <p className='note-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor eleifend velit a lobortis. Curabitur vitae porta enim. Cras scelerisque tristique diam ut placerat. Cras eleifend euismod odio at rutrum. Morbi porttitor quis augue quis egestas. Cras a elementum lectus. Integer id tempor augue, sit amet elementum nibh. Nam cursus enim ut nunc hendrerit lobortis. Aenean sed dui dictum, tempus risus non, finibus purus. Suspendisse vel nisl et ligula pulvinar aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst.</p>

          </div>
          

        </div>
      
      </div>
    );
  }
  
  export default Home;
  