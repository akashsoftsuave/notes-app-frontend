import right from "../../assets/check.png";
import pen from "../../assets/pen.png";
import photo from "../../assets/photo.png";
function InputFalse() {
    return (
        <div className="noteInputstylechanges">
            <div className="noteInput">
                <div>
                    <h2>Take a Note...</h2>
                </div>
                <div className="noteIcons">
                    <img src={pen} alt="pen" />
                    <img src={photo} alt="photo" />
                    <img src={right} alt="check" />
                </div>
            </div>
        </div>
    );
}

export default InputFalse;