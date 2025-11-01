import notes from '../../assets/notes.png'
import alarm from '../../assets/alarm.png'
import archive from '../../assets/archive.png'
import bin from '../../assets/bin.png'
import editing from '../../assets/editing.png'
import { useState } from 'react';


function CommonSidebar({ onTabChange }) {
    const [activeTab, setActiveTab] = useState('notes');

    function handleTabClick(tab) {
            onTabChange(tab);
            setActiveTab(tab);
    }
    return (
        <>
            <div className="sidebardiv">
                <div className={`sidebareachHeader ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => handleTabClick('notes')}>
                    <div className='imageDiv'>
                        <img src={notes} alt="Notes" />
                    </div>
                    <h3>Notes</h3>
                </div>
                <div className={`sidebareachHeader ${activeTab === 'reminders' ? 'active' : ''}`} onClick={() => handleTabClick('reminders')}>
                    <div className='imageDiv'>
                        <img src={alarm} alt="Reminders"/>
                    </div>
                    <h3>Reminders</h3>
                </div>
                <div className={`sidebareachHeader ${activeTab === 'editLabels' ? 'active' : ''}`} onClick={() => handleTabClick('editLabels')}>
                    <div className='imageDiv'>
                        <img src={editing} alt="Edit Labels" />
                    </div>
                    <h3>Edit Labels</h3>
                </div>
                <div className={`sidebareachHeader ${activeTab === 'archive' ? 'active' : ''}`} onClick={() => handleTabClick('archive')}>
                    <div className='imageDiv'>
                        <img src={archive} alt="Archive" />
                    </div>
                    <h3>Archive</h3>
                </div>
                <div className={`sidebareachHeader ${activeTab === 'trash' ? 'active' : ''}`} onClick={() => handleTabClick('trash')}>
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