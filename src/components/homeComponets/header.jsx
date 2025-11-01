import menuImg from "../../assets/menu.jpg";
import "../common-style/commonstyle.css";
import { jwtDecode } from "jwt-decode";

function Header({ tabName }) {

    const token = localStorage.getItem('token');
    let userName = "";
    let firstLetter = "";
    if (token) {
        const decoded = jwtDecode(token);
        userName = decoded.name.charAt(0).toUpperCase() + decoded.name.slice(1);
        firstLetter = userName.charAt(0).toUpperCase();
    }
    return (
        <div className="headerMainDiv">
            <div className="leftSide">
                <div className="maindevmenu">
                    <div className="threeLineDiv"></div>
                    <div className="threeLineDiv"></div>
                    <div className="threeLineDiv"></div>
                </div>
                <h2>{tabName}</h2>
            </div>
            <div className="centerInput">
                <input type="text" placeholder="Search" />
            </div>
            <div className="rightSide">
                <h3 className="nameHeader">{userName}</h3>
                <h3 className="firstLetter">{firstLetter}</h3>
            </div>
        </div>
    );
}


export default Header;