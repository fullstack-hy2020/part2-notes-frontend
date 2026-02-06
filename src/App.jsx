import Note from './components/Note'
import {useState} from 'react'

const App = ({ notes }) => {
  const {notes, setNotes} = useState(notes)
  const {newNote, setNewNote} = useState("a new note...")
  const {showAll, setShowAll} = useState(true) 

  const notesToShow = showAll? notes : notes.filter(note => note.important) 
  
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value))
  }
   
   const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1), 
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange} 
        />
        <button type="submit">save</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll? 'all' : 'important'} 
      </button>
    </div>
  )
}

export default App
