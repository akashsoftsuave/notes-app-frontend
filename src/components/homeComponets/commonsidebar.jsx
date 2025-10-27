import notes from '../../assets/notes.png'
import alarm from '../../assets/alarm.png'
import archive from '../../assets/archive.png'
import bin from '../../assets/bin.png'
import editing from '../../assets/editing.png'


function CommonSidebar() {
    return (
        <>
            <div className="sidebardiv">
                <div className='sidebareachHeader'>
                    <div className='imageDiv'>
                        <img src={notes} alt="Notes" />
                    </div>
                    <h3>Notes</h3>
                </div>
                <div className='sidebareachHeader'>
                    <div className='imageDiv'>
                        <img src={alarm} alt="Reminders"/>
                    </div>
                    <h3>Reminders</h3>
                </div>
                <div className='sidebareachHeader'>
                    <div className='imageDiv'>
                        <img src={editing} alt="Edit Labels" />
                    </div>
                    <h3>Edit Labels</h3>
                </div>
                <div className='sidebareachHeader'>
                    <div className='imageDiv'>
                        <img src={archive} alt="Archive" />
                    </div>
                    <h3>Archive</h3>
                </div>
                <div className='sidebareachHeader'>
                    <div className='imageDiv'>
                        <img src={bin} alt="Trash" />  
                    </div>
                    <h3>Trash</h3>
                </div>
            </div>
        </>
    )
}


export default CommonSidebar;