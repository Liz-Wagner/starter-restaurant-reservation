import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import TableForm from "./components/TableForm";
import { createTable } from "../../utils/api";

export default function CreateTable() {
    const history = useHistory();

    const initialTableFormState = {
        table_name: "",
        capacity: 0
    };

    const [tableData, setTableData] = useState({ ...initialTableFormState });
    const [tableErrors, setTableErrors] = useState(null);

    //handle input changes to form
    const handleFormChange = ({ target }) => {
        setTableData({
            ...tableData,
            [target.name]: target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTableErrors(null);

        try {
            const abortController = new AbortController();
            await createTable({
                ...tableData,
                capacity: parseInt(tableData.capacity)
            }, abortController.signal
            );
            setTableData({ ...initialTableFormState })
            history.push("/");
        }
        catch (error) {
                if (error.name !== "AbortError") {
                    setTableErrors(error);
                }
            else return;
        }
    }

    return (
        <div>
            <TableForm 
                formData={tableData}
                handleSubmit={handleSubmit}
                handleFormChange={handleFormChange}
            />
        </div>
    )
}