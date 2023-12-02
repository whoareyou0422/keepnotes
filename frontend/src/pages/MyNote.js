import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const MyNote = () => {
  let {authToken, logoutUser} = useContext(AuthContext)
  let {id} = useParams()
  
  let [note, setNote] = useState(null)
  let [error, setError] = useState(null)

  useEffect(()=>{
    getNote()
  }, [id])

  let getNote = async()=>{
    if (id == 'create') return
    let response = await fetch(`http://localhost:8000/api/note/${id}`,{
      method:"GET",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      }
    })
    let data = await response.json()
    if (response.status === 200){
      setNote(data)
    }else{
      setError(response.statusText)
    }
  }

  let updateNote = async () =>{
    if (id === 'create') return 
    let response = await fetch(`http://localhost:8000/api/note/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      },
      body: JSON.stringify({...note})
    })
  }

  let deleteNote = async ()=>{
    let response = await fetch(`http://localhost:8000/api/note/${id}`,{
      method:"DELETE",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      }
    })
  }

  let createNote = async ()=>{
    let response = await fetch("http://localhost:8000/api/create/",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + String(authToken.access)
      },
      body: JSON.stringify({...note})
    })
  }

  let handleSubmit = ()=>{
    if(id !== 'create' && !note.body){
      deleteNote()
    }else if (id !== 'create'){
      updateNote()
    }else if(id === 'create'){
      createNote()
    }
  }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to='/' onClick={handleSubmit}>Back</Link>
        </h3>
        { id === 'create' ?
        <div>
        <Link to='/' onClick={createNote}>Add New</Link>
        </div>
        :
        <div>
        <Link to='/' onClick={deleteNote}>Delete</Link>
        </div>
      }
      </div>
      {
        error ?
        <h1 className='error'>{error}</h1>
        :
        <textarea 
          onChange={(e) => {setNote({...note, 'body':e.target.value})}}
          value={note?.body}>
          
        </textarea>
      }
    </div>
  )
}

export default MyNote
