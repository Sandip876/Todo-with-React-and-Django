/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import api from "../api"
import Note from "../components/Note";
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title,setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api
        .get("/api/notes/")
        .then((res) => res.data)
        .then((data) => {setNotes(data); console.log(data)} )
        .catch((err) => alert(err));
    }

    const deleteNotes = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if(res.status === 204) alert("Note Deleted!");
            else alert("Failed To Delete the note")
        })
        .catch((error) => alert(error));
        getNotes();
    };

    const createNotes = (e) => {
        e.preventDefault();
        api
        .post("/api/notes/", { content , title }).then((res) => {
            if(res.status === 201 ) alert("Note Created");
            else alert("Failed to create the note.");
            getNotes();
        })
        .catch((error) => alert(error));
        
    };

    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNotes} key={note.id} />
            ))}
        </div>
        <h2>Create Note</h2>
        <form onSubmit={createNotes}>
            <label htmlFor="title">Title:</label>
            <br />
            <input 
                type="text" 
                id="title" 
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor="content">Content:</label>
            <br />
            <textarea 
                name="content" 
                id="content" 
                value={content}
                onChange={(e) => setContent(e.target.value)} 
            ></textarea>
            <br />
            <input type="submit" value="Submit"></input>
        </form>
    </div>
}

export default Home