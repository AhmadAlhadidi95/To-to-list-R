import "./Toster.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

export function Toster({message}) {

    return (
        <div className="toster">
            <b>{message} <FontAwesomeIcon icon={faCheck}/></b>
        </div>
    );
    
}