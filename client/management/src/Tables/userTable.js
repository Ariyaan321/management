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
            <div>
                {
                    isError !== "" && <h1>Error occured: {isError}</h1>
                }
            </div>
            <div className=''>
                <table className='shadow 2xl border-2 border-cyan-200 w-[700px]'>
                    <thead className=''>  {/*no matter width */}
                        <tr className=''> {/*no matter width */}
                            <th className='w-[710px] border-solid border-2 border-rose-600 py-3 bg-cyan-800'>Username</th> {/*no matter */}
                            <th className='w-[200px] border-solid border-2 border-orange-600 py-3 bg-cyan-800 '>Email</th>
                            <th className='w-[200px] py-3 border-solid border-2 border-yellow-600 bg-cyan-800'>Phone</th>
                            <th className=' w-[200px] py-3 border-solid border-2 border-yellow-600 b-cyan-800'>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            dbData.map((val, key) => {
                                return (
                                    <tr key={key} className='' >
                                        <td className='w-[233px] absolute overflow-x-auto py-3 px-6 border-solid border-2 border-red-500 text-center    '>{val.Username}</td>
                                        <td className='w-[233px] overflow-x-auto py-3 px-6 border-solid border-2 border-red-500'>{val.Email}</td>
                                        <td className='w-[233px] overflow-x-auto py-3 px-6'>{val.Phone}</td>
                                        <td className='w-[233px] overflow-x-auto py-3 px-6'>
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

            <div>
                {/* For Edit popup */}
                {
                    editpop && (
                        <UserPopup vals={popupValues} />
                    )
                }
                {/* For Edit popup */}

                <button onClick={() => {
                    setEditpop(!editpop)
                    setPopupValues("")
                }}>Add User</button>
            </div >
        </>
    )
}

export default UserTable