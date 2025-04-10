import Note from './components/Note'
import { useState } from 'react'

const App = ({ notes }) => {
  const [notess, setNotes] = useState(notes)
  console.log(notess);
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  )
}

export default App
