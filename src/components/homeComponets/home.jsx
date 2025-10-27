import { Outlet } from "react-router-dom";
import CommonSidebar from "./commonsidebar";
import Header from "./header";

function Home() {
    return (<>
        <div>
            <Header />
        </div>
        <div className="homecontent">
            <div>
                <CommonSidebar />
            </div>
            <div className="homeMainContent">
                <Outlet />
            </div>
        </div>
         
        </>);
}

export default Home;