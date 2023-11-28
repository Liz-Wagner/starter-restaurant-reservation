import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function CancelBtn() {
    const history = useHistory();
    
    const handleCancel = () => {
        if (history.length > 1) {
            history.go(-1)
        } else {
            history.push("/")
        }
    }

    return (
        <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
    )
    
}