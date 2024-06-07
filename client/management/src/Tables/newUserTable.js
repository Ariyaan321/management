import React from 'react'
import { useState, useEffect } from "react";
import { motion } from "framer-motion"
import axios from 'axios';
import UserPopup from './addEditPopups/userPopup';
import ApiData from "../MyApi/apiData";
import EditPen from "./editPen.png"
import DeleteIcn from "./deleteIcn.png"

const UserTable = () => {
    const [editpop, setEditpop] = useState(false);
    const [popupValues, setPopupValues] = useState({ "Username": "default" });
    const [dbData, setDbData] = useState([]);
    const [isError, setIsError] = useState("");

    const [randomOne, setRandomOne] = useState(Math.random() * 100);
    const [randomTwo, setRandomTwo] = useState(Math.random() * 100);
    const [dir, setDir] = useState("rb")

    const direcVariants = {
        lt: {
            left: `${randomOne}vw`,
            top: `${randomTwo}vh`,
        },
        rt: {
            right: `${randomOne}vw`,
            top: `${randomTwo}vh`
        },
        lb: {
            left: `${randomOne}vw`,
            bottom: `${randomTwo}vh`
        },
        rb: {
            right: `${randomOne}vw`,
            bottom: `${randomTwo}vh`
        },
    }
    let possibleDirecs = ["lt", "rt", "lb", "rb"]
    const boxShadowColors = ['#0000FF', '#FF0000', '#00FF00', '#FFFF00', '#800080', '#FFA500', '#FFC0CB', '#A52A2A', '#000000', '#FFFFFF'];

    useEffect(() => {
        axios.get("http://localhost:8080/users")
            .then((res) => setDbData(res.data))
            .catch((err) => setIsError(err.message))

        const interval = setInterval(() => {
            setRandomOne(Math.floor(Math.random() * 100))
            setRandomTwo(Math.floor(Math.random() * 100))
            setDir("")
            setDir(possibleDirecs[Math.floor(Math.random() * 4)])
        }, 10000)
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <div>
                {
                    isError !== "" && <h1>Error occured: {isError}</h1>
                }
            </div>

            <div className='overflow-x-auto px-[24px] pb-1 w-[1000px] h-screen rounded-lg'>
                <table className='w-full divide-y divide-gray-200'>
                    <thead className='bg-black'>
                        <tr>
                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider'>Username</th>
                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider'>Email</th>
                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider'>Phone</th>
                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='bg-black divide-y divide-black text-white'>
                        {dbData.map((data, index) => (
                            <>
                                <motion.div
                                    className='w-15 h-15 absolute custom'
                                    variants={direcVariants}
                                    style={{ boxShadow: `0px 0px 109px 76px ${boxShadowColors[Math.floor(Math.random() * boxShadowColors.length)]}` }}
                                    initial={{ left: `${Math.floor(Math.random() * 100)}vw`, bottom: `${Math.floor(Math.random() * 100)}vh` }}
                                    animate={dir}
                                    transition={{ duration: 10, repeatType: 'loop' }}

                                ></motion.div >
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-black' : 'bg-blue-300 text-black'} hover:scale-105 duration-75`}>
                                    <td className='px-6 py-4 whitespace-nowrap max-w-xs overflow-x-auto'>
                                        <div className='text-md font-medium'>{data.Username}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap max-w-xs overflow-x-auto'>
                                        <div className='text-md font-light'>{data.Email}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap max-w-xs overflow-x-auto'>
                                        <div className='text-md font-light '>{data.Phone}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-md font-medium flex gap-[10px]'>
                                        <div>
                                            <button
                                                className='text-indigo-600 hover:text-indigo-900'
                                                onClick={() => {
                                                    setEditpop(!editpop)
                                                    setPopupValues(data)
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <img src={EditPen} alt="Edit_pen" className='w-[12px] h-[12px] ml-[32px] mt-[-17px] relative' />
                                        </div>
                                        <div>
                                            <button
                                                className='ml-4 text-red-600 hover:text-red-900'
                                                onClick={async () => {
                                                    const res = await ApiData('delete', data, data._id)
                                                    alert(res)
                                                }}
                                            >
                                                Delete
                                            </button>
                                            <img src={DeleteIcn} alt="delete_icon" className='w-[12px] h-[12px] ml-[66px] mt-[-17px] relative' />
                                        </div>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>

                <div className='flex'>
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
                    }}
                        className='h-fit font-medium mt-2 ml-auto px-4 py-2 text-white backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(255,255,255,0.1)] bg-white/[0.2] text-md transition duration-200'
                    >Add User</button>
                </div >
            </div>
        </>
    )
}

export default UserTable