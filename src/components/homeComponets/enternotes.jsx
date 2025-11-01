import { useState } from 'react';

function EnterNotes({ onAction }) {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = localStorage.getItem('token');
    async function addNotes(event) {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        const noteData = { title, description };
        if(!title || !description){
            setError('Both title and description are required.');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        if(title.length < 3){
            setError('Title must be at least 3 characters long.');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        if(description.length < 3){
            setError('Description must be at least 10 characters long.');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/addNote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` },
                body: JSON.stringify(noteData),
            });

            if (response.ok) {
                setSuccess('Note added successfully!');
                setTimeout(() => {
                    onAction();
                }, 1000);
                
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to add note.');
                setTimeout(() => {
                    setError('');
                }, 2000);
            }
        } catch (err) {
            setError(err.message || 'An error occurred.');
            setTimeout(() => {
                    setError('');
            }, 2000);
        } 
    }

    function closeTheWindow() {
        onAction();
    }
    return (
        <>
            <div className="noteInputstylechanges">
                <form onSubmit={addNotes} className="enterNotesForm">
                    <input type="text" placeholder="Title" className="noteTitleInput" name="title" /><br />
                    <textarea placeholder="Take a Note..." className="noteTextAreaInput" name="description"></textarea><br />
                    <button type="submit" className="noteSubmitButton">Submit</button>
                    <button type="button" className="noteCloseButton" onClick={closeTheWindow}>Close</button><br />
                    {error && <span className="errorClass">{error}</span>}
                    {success && <span className="successClass">{success}</span>}
                </form>
            </div>
        </>
    );
}
export default EnterNotes;