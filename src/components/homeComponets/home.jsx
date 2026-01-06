import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CommonSidebar from "./commonsidebar";
import Header from "./header";
import { useState, useEffect } from "react";



function Home() {
    const location = useLocation();
    const navigate = useNavigate();

    const getCurrentTab = () => {
        const path = location.pathname.split('/').pop();
        if (path === 'home' || !path) return 'Notes';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    const [tabname, setTabname] = useState(getCurrentTab());

    useEffect(() => {
        setTabname(getCurrentTab());
    }, [location.pathname]);

    function handleTabChange(tab) {
        console.log("Tab changed to:", tab);
        setTabname(tab.charAt(0).toUpperCase() + tab.slice(1));
        navigate(`/home/${tab}`);
    }
    return (<>
        <div>
            <Header tabName={tabname} />
        </div>
        <div className="homecontent">
            <div>
                <CommonSidebar onTabChange={handleTabChange} />
            </div>
            <div className="homeMainContent">
                <Outlet />
            </div>
        </div>

    </>);
}

export default Home;