import React from "react"
import { useState } from "react";
import ApiData from "../../MyApi/apiData";

export default function UserPopup(vals = "") {      // vals == "" for Add User button

    const userId = vals.vals._id // Passing users's id
    const [editpop, setEditpop] = useState(true)
    const [username, setUsername] = useState(vals.vals.Username)
    const [email, setEmail] = useState(vals.vals.Email)
    const [phone, setPhone] = useState(vals.vals.Phone)
    const [apiResponse, setApiResponse] = useState("")

    function formToJSON(e) {
        return (
            {
                "Username": e.name.value,
                "Email": e.email.value,
                "Phone": e.phone.value
            }
        )
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const updatedData = formToJSON(e.target)
        // setApiResponse(<ApiData meth='put' data={updatedData} />)   // returned value from MyApi component      
        vals.vals === "" ? setApiResponse(await ApiData("post", updatedData)) : setApiResponse(await ApiData("put", updatedData, userId))
    }

    function handleUsername(e) {
        setUsername(e.target.value)
    }
    function handleEmail(e) {
        setEmail(e.target.value)
    }
    function handleNumber(e) {
        setPhone(e.target.value)
    }

    return (
        <>
            {editpop && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <span onClick={() => { setEditpop(!editpop) }} className="absolute cursor-pointer text-red-700 text-4xl font-extrabold ml-[310px] mt-[-260px] w-fit h-fit text-center hover:text-blue-700 duration-300">&times;</span>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-fit ml-8' >
                        {
                            vals.vals !== "" ? <h3 className="font-medium text-white backdrop-blur-xl">Update details</h3> : <h3 className="font-medium mt-[-25px] text-white backdrop-blur-xl">Add details</h3>
                        }
                        <input type="text" name="name" value={username} onChange={handleUsername} placeholder="Username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <input type="email" name="email" value={email} onChange={handleEmail} placeholder="Email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <input type="number" name="phone" value={phone} onChange={handleNumber} placeholder="Phone no." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                        <input type="submit" value="submit" className="cursor-pointer w-fit font-medium px-4 py-2 text-white backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(255,255,255,0.1)] bg-white/[0.2] text-sm transition duration-200" />
                        {
                            apiResponse !== "" &&
                            <p className="text-sm text-white">
                                {apiResponse}
                            </p>
                        }
                    </form>
                </div>
            )}
        </>
    );
}