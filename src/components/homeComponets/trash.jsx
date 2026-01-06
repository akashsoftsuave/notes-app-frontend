import { useEffect, useState } from "react";

function Trash () {
    const [notes, setNotes] = useState([]);
    const [noNotesMessage, setNoNotesMessage] = useState("No deleted notes available");
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("token");
    useEffect(() => {
        fetchNotes();
    }, [BASE_URL, token]);

    const fetchNotes = async () => {
        try {
            const response = await fetch(`${BASE_URL}/ViewdeletedNotes`, {
                headers: { Authorization: `${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setNotes(data);
            } else {
                setNoNotesMessage("No deleted notes available");
            }
        } catch (err) {
            setNoNotesMessage(err.message);
        }
    };

    async function undoDeleteNotes(id){
        try{
            const response = await fetch(`${BASE_URL}/undoDeleteNote/${id}`,{
                method : "POST",
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
                    <h1>Trash Notes</h1>
                    {notes.length > 0 ? (
                        <div className="notesContainer">
                            {notes.map((note) => (
                                <div key={note.id} className="noteItem">
                                    <p className="titleElement">{note.title}</p>
                                    <p className="descriptionElement">{note.description}</p>
                                    <div>
                                        <div className="imageContainer">
                                            {/* <img src={editing} className="noteImg"/>
                                            <img src={pin} className="noteImg" onClick={() => addPinnedNotes(note.id)}/>
                                            <img src={archiveImg} className="noteImg" onClick={() => archiveNotes(note.id)}/> */}
                                            <button onClick={() => undoDeleteNotes(note.id)} className="restoreButton">Restore</button>
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

export default Trash;