import "./Toast.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

export function Toast({message}) {

    return (
        <div className="toast">
            <b>{message} <FontAwesomeIcon icon={faCheck}/></b>
        </div>
    );
    
}