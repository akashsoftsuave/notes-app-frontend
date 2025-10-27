import menuImg from "../../assets/menu.jpg";
import "../common-style/commonstyle.css";
function Header() {
    return (
        <div className="headerMainDiv">
            <div className="leftSide">
                <div className="maindevmenu">
                    <div className="threeLineDiv"></div>
                    <div className="threeLineDiv"></div>
                    <div className="threeLineDiv"></div>
                </div>
                <h2>Fundoo Notes</h2>
            </div>
            <div className="centerInput">
                <input type="text" placeholder="Search" />
            </div>
            <div className="rightSide">
                <h3 className="nameHeader">name</h3>
                <h3 className="firstLetter">A</h3>
            </div>
        </div>
    );
}


export default Header;