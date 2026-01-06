import notes from '../../assets/notes.png'
import alarm from '../../assets/alarm.png'
import archive from '../../assets/archive.png'
import bin from '../../assets/bin.png'
import editing from '../../assets/editing.png'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function CommonSidebar({ onTabChange }) {
    const location = useLocation();

    const getCurrentActiveTab = () => {
        const path = location.pathname.split('/').pop();
        if (path === 'home' || !path) return 'notes';
        return path;
    };

    const [activeTab, setActiveTab] = useState(getCurrentActiveTab());

    useEffect(() => {
        setActiveTab(getCurrentActiveTab());
    }, [location.pathname]);

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