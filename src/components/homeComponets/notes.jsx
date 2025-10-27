import { useState } from "react";
import InputFalse from "./inputfalse";
import EnterNotes from "./enternotes";

function Notes() {
    const [editMode, setEditMode] = useState(false);
    function changeInput() {
        setEditMode(!editMode);
    }
    return (
        <div onClick={changeInput} style={{ cursor: 'pointer' }}>
            {editMode ? <EnterNotes /> : <InputFalse />}
        </div>
    );
}

export default Notes;