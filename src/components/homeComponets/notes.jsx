import { useState, useEffect } from "react";
import InputFalse from "./inputfalse";
import EnterNotes from "./enternotes";
import bin from "../../assets/bin.png";
import pin from "../../assets/pin.png";
import archiveImg from "../../assets/archive.png";
import editing from "../../assets/editing.png";
import { meta } from "@eslint/js";

function Notes() {
    const [editMode, setEditMode] = useState(false);
    const [notes, setNotes] = useState([]);
    const [pinnedNotes, setPinnedNotes] = useState([]);
    const [noNotesMessage, setNoNotesMessage] = useState("");
    const [noPinnedNotesMessage, setNoPinnedNotesMessage] = useState("");
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchNotes();
        fetchPinnedNotes();
    }, [BASE_URL, token]);
    const fetchNotes = async () => {
        try {
            const response = await fetch(`${BASE_URL}/viewNotes`, {
                headers: { Authorization: `${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setNotes(data);
            } else {
                setNoNotesMessage("Failed to fetch notes");
            }
        } catch (err) {
            setNoNotesMessage("An error occurred while fetching notes.");
        }
    };

    const fetchPinnedNotes = async () => {
        try {
            const response = await fetch(`${BASE_URL}/ViewpinNotes`, {
                headers: { Authorization: `${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setPinnedNotes(data);
            } else {
                setNoPinnedNotesMessage("Failed to fetch notes");
            }
        } catch (err) {
            setNoPinnedNotesMessage("An error occurred while fetching notes.");
        }
    };

    async function addPinnedNotes(id) {
        try {
            const response = await fetch(`${BASE_URL}/pinNotes/${id}`, {
                method: "POST",
                headers: { Authorization: `${token}` },
            });
            if (response.ok) {
                fetchNotes();
                fetchPinnedNotes();
            }
        } catch (err) {
            console.error("Error pinning note:", err);
        }
    };

    async function archiveNotes(id) {
        try {
            const response = await fetch(`${BASE_URL}/archiveNotes/${id}`,{
                method: "POST",
                headers:{Authorization: `${token}`}
            });
            if(response.ok){
                fetchNotes();
            }
        } catch (err) {
            console.error("Error archiving note:", err);
        }
    }

    async function deleteNotes(id){
        try{
            const response = await fetch(`${BASE_URL}/deleteNote/${id}`,{
                method : "DELETE",
                headers: {Authorization: `${token}`}
            });
            if(response.ok){
                fetchNotes();
            }
        } catch (err){
            console.log("error while deleteing the data",err)
        }
    }

    const openEditMode = () => setEditMode(true);
    const closeEditMode = () => {
        setEditMode(false);
        fetchNotes();
    };

    return (
        <>
            <div>{!editMode && <InputFalse onOpen={openEditMode} />}</div>
            <div>{editMode && <EnterNotes onAction={closeEditMode} />}</div>

            <div className="container">
                <h1>Pinned Notes</h1>
                {pinnedNotes.length > 0 ? (
                    <div className="notesContainer">
                        {pinnedNotes.map((note) => (
                            <div key={note.id} className="noteItem">
                                <p className="titleElement">{note.title}</p>
                                <p className="descriptionElement">{note.description}</p>
                            </div>
                        ))}
                    </div>

                ) : (
                    <p className="notFound">{noPinnedNotesMessage ? noPinnedNotesMessage : "No pinned notes found"}</p>
                )}
            </div>

            <div className="container">
                <h1>All Notes</h1>
                {notes.length > 0 ? (
                    <div className="notesContainer">
                        {notes.map((note) => (
                            <div key={note.id} className="noteItem">
                                <p className="titleElement">{note.title}</p>
                                <p className="descriptionElement">{note.description}</p>
                                <div>
                                    <div className="imageContainer">
                                        <img src={editing} className="noteImg"/>
                                        <img src={pin} className="noteImg" onClick={() => addPinnedNotes(note.id)}/>
                                        <img src={archiveImg} className="noteImg" onClick={() => archiveNotes(note.id)}/>
                                        <img src={bin} className="noteImg" onClick={() => deleteNotes(note.id)}/>
                                    </div>
                                </div>

                            </div>
                            
                        ))}
                    </div>

                ) : (
                    <p className="notFound">{noNotesMessage ? noNotesMessage : "No notes found"}</p>
                )}
            </div>
        </>
    );
}

export default Notes;
