import { useState, useEffect } from 'react'
import noteService from './services/notes'

import {
  Routes, Route, Link, useMatch
} from 'react-router-dom'

import { Container, AppBar, Toolbar, Button } from '@mui/material'

import NoteList from './components/NoteList'
import Home from './components/Home'
import Footer from './components/Footer'
import NoteForm from './components/NoteForm'
import Note from './components/Note'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = noteObject => {
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNotification({ text: `Note '${returnedNote.content}' added!`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 10000)
    })
  }

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setNotification(
          { text: `Note '${note.content}' was already removed from server`, type: 'error' }
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const match = useMatch('/notes/:id')

  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null

  console.log(note)

  const hoverStyle = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/" sx={hoverStyle}>home</Button>
          <Button color="inherit" component={Link} to="/notes" sx={hoverStyle}>notes</Button>
          <Button color="inherit" component={Link} to="/create" sx={hoverStyle}>new note</Button>
        </Toolbar>
      </AppBar>

      <Notification notification={notification} />

      <Routes>
        <Route path="/notes/:id" element={
          <Note
            note={note}
            toggleImportanceOf={toggleImportanceOf}
            deleteNote={deleteNote}
          />
        } />
        <Route path="/notes" element={
          <NoteList notes={notes} setNotification={setNotification} />
        } />
        <Route path="/create" element={
          <NoteForm createNote={addNote} />
        } />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </Container>
  )
}

export default App