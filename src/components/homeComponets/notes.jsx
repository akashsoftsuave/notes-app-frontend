import { useState, useEffect } from "react";
import InputFalse from "./inputfalse";
import EnterNotes from "./enternotes";

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
                    <p>{noPinnedNotesMessage ? noPinnedNotesMessage : "No notes found"}</p>
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
                            </div>
                        ))}
                    </div>

                ) : (
                    <p>{noNotesMessage ? noNotesMessage : "No notes found"}</p>
                )}
            </div>
        </>
    );
}

export default Notes;
