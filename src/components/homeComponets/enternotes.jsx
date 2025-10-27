function EnterNotes() {
    return (
        <>
            <div className="noteInputstylechanges">
                <div>
                    <form>
                        <input type="text" placeholder="Title" className="noteTitleInput" />
                        <textarea placeholder="Take a Note..." className="noteTextAreaInput"></textarea>
                        <button type="submit" className="noteSubmitButton">Close</button>
                    </form>
                    
                </div>
            </div>
        </>
    );
}
export default EnterNotes;