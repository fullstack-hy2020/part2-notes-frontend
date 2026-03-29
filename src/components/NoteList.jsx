import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

import LoginForm from './LoginForm'
import Togglable from './Togglable'
import loginService from '../services/login'
import noteService from '../services/notes'

const NoteList = ({ notes, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      noteService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setNotification({ text: 'wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  console.log(user)

  return (
    <div>
      {!user && loginForm()}

      <h2>Notes</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>content</TableCell>
              <TableCell>user</TableCell>
              <TableCell>important</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map(note => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </TableCell>
                <TableCell>
                  {note.user.name}
                </TableCell>
                <TableCell>
                  {note.important ? 'yes': ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default NoteList
