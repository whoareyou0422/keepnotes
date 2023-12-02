import React from 'react'
import { Link } from 'react-router-dom'

let getTitle = (body)=>{
    let title = body.split('\n')[0]
    if (title.length > 30){
        return title.slice(0,30)+'...'
    }
    return title
}

let getDate = (date) =>{
    return new Date(date).toLocaleDateString()
}

let getTime = (date)=>{
    return new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
}


const ListItem = (props) => {
  return (
    <Link to={`/my_note/${props.note.id}`}>
        <div className='notes-list-item'>
            <h3>{getTitle(props.note.body)}</h3>
            <p>{getDate(props.note.updated)} - {getTime(props.note.updated)}</p>
        </div>
    </Link>
  )
}

export default ListItem
