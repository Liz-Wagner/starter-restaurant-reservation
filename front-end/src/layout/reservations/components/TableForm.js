import React from "react";
import CancelBtn from "./CancelBtn";

export default function TableForm({ handleSubmit, handleFormChange, formData }) {
    
    return (
        <div className="form-section">
            <form name="assign-table" onSubmit={handleSubmit}>
                <div className="form-section">
                    <label htmlFor="table_name" className="tName">Table Name:</label>
                    <input
                        id="table_name"
                        type="text"
                        name="table_name"
                        placeholder="table name"
                        minLength={2}
                        required={true}
                        onChange={handleFormChange}
                        value={formData.table_name}
                    />
                </div>
                <div className="form-section">
                    <label htmlFor="capacity" className="tCapacity">Capacity:</label>
                    <input
                        id="capacity"
                        type="number"
                        name="capacity"
                        placeholder="capacity"
                        required={true}
                        min={1}
                        onChange={handleFormChange}
                        value={formData.capacity}
                    />
                </div>
                <button className="btn btn-primary" type="submit" onSubmit={handleSubmit}>Submit</button>
                <CancelBtn />
            </form>
        </div>
    )
}