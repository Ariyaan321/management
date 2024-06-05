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
                <div className="editformdiv">

                    <span onClick={() => { setEditpop(!editpop) }}>&times;</span>
                    <form className="form" onSubmit={handleSubmit}>
                        {
                            vals.vals !== "" ? <h3>Update details</h3> : <h3>Add details</h3>
                        }
                        <input type="text" name="name" value={username} onChange={handleUsername} placeholder="Username" />
                        <input type="email" name="email" value={email} onChange={handleEmail} placeholder="Email" />
                        <input type="number" name="phone" value={phone} onChange={handleNumber} placeholder="Phone no." />
                        <input type="submit" value="submit" className="submitt" />
                        {
                            apiResponse !== "" &&
                            <h4 >
                                {apiResponse}
                            </h4>
                        }
                    </form>
                </div>
            )}
        </>
    );
}