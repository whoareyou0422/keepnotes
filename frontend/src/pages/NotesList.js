import React,{useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext'

import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

const NotesList = () => {
  let {user, authToken, logoutUser} = useContext(AuthContext)
  
  const usernameTitle = (username)=>{
    const title = username.charAt(0).toUpperCase() + username.slice(1)
    return title
  }

  let [notes, setNotes] = useState([])
  useEffect(()=>{
    getNotes()
  }, [])

  let getNotes = async () =>{
    let response = await fetch("http://localhost:8000/api/notes/", {
      method:"GET",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      }
    })
    let data = await response.json()
    if (response.status === 200){
      setNotes(data)
    }else if(response.statusText === 'Unauthorized'){
      logoutUser()
    }
  }
  return (
    <div className='notes'>
      <h1 className='welcome'>Welcome <span>{usernameTitle(user.username)}</span></h1>      
      <div className='notes-header'>
          <h2 className='notes-title'>&#9782; Notes</h2>
          <p className='notes-count'>{notes.length}</p>
      </div>
      <div className='notes-list'>
          {notes.map((note) =>(
            <ListItem key={note.id} note={note}/>
          ))}
      </div>
      <AddButton />
    </div>
  )
}

export default NotesList