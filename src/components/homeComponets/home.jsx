import { Outlet, useNavigate } from "react-router-dom";
import CommonSidebar from "./commonsidebar";
import Header from "./header";
import { useState } from "react";



function Home() {
    const [tabname, setTabname] = useState("Notes");
    const navigate = useNavigate();

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