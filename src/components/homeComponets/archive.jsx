import { useEffect, useState } from "react";
import bin from "../../assets/bin.png";
import archiveImg from "../../assets/archive.png";

function Archive() {
    const [notes, setNotes] = useState([]);
    const [noNotesMessage, setNoNotesMessage] = useState("No archived notes available");
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("token");
    useEffect(() => {
        fetchNotes();
    }, [BASE_URL, token]);

    const fetchNotes = async () => {
        try {
            const response = await fetch(`${BASE_URL}/ViewarchiveNotes`, {
                headers: { Authorization: `${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setNotes(data);
            } else {
                setNoNotesMessage("No archived notes available");
            }
        } catch (err) {
            setNoNotesMessage(err.message);
        }
    };

    async function undoArchiveNotes(id) {
        try {
            const response = await fetch(`${BASE_URL}/undoArchiveNote/${id}`,{
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

    return (
       <div className="containerOther">
                <h1>Archive Notes</h1>
                {notes.length > 0 ? (
                    <div className="notesContainer">
                        {notes.map((note) => (
                            <div key={note.id} className="noteItem">
                                <p className="titleElement">{note.title}</p>
                                <p className="descriptionElement">{note.description}</p>
                                <div>
                                    <div className="imageContainer">
                                        {/* <img src={editing} className="noteImg"/>
                                        <img src={pin} className="noteImg" onClick={() => addPinnedNotes(note.id)}/> */}
                                        <img src={archiveImg} className="noteImg" onClick={() => undoArchiveNotes(note.id)}/>
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
    );
}
export default Archive;