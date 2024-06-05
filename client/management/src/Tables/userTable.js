import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import UserPopup from './addEditPopups/userPopup';
import ApiData from "../MyApi/apiData";


const UserTable = () => {
    const [editpop, setEditpop] = useState(false);
    const [popupValues, setPopupValues] = useState({ "Username": "default" });
    const [dbData, setDbData] = useState([]);
    const [isError, setIsError] = useState("");


    useEffect(() => {
        axios.get("http://localhost:8080/users")
            .then((res) => setDbData(res.data))
            .catch((err) => setIsError(err.message))
    }, [])

    return (
        <>
            <div className="body">
                {
                    isError !== "" && <h1>Error occured: {isError}</h1>
                }
                <div className="tablecss">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dbData.map((val, key) => {
                                    return (
                                        <tr id="trodd" key={key}>
                                            <td>{val.Username}</td>
                                            <td>{val.Email}</td>
                                            <td>{val.Phone}</td>
                                            <td className="actionbutton">
                                                <button onClick={() => {
                                                    setEditpop(!editpop)
                                                    setPopupValues(val)
                                                }}>Edit</button>
                                                <button onClick={async () => {
                                                    const res = await ApiData('delete', val, val._id)
                                                    alert(res)
                                                }}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                {/* For Edit popup */}
                {
                    editpop && (
                        <UserPopup vals={popupValues} />
                    )
                }
                {/* For Edit popup */}

                <button className="addUser" onClick={() => {
                    setEditpop(!editpop)
                    setPopupValues("")
                }}>Add User</button>
            </div>
        </>
    )
}

export default UserTable