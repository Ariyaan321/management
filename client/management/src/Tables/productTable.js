import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import ProductPopup from './addEditPopups/productPopup';
import ApiData from "../MyApi/apiData";

const ProductTable = () => {
    const [editpop, setEditpop] = useState(false);
    const [popupValues, setPopupValues] = useState({ "ProductName": "default" });
    const [dbData, setDbData] = useState([]);
    const [isError, setIsError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/products")
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
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dbData.map((val, key) => {
                                    return (
                                        <tr id="trodd" key={key}>
                                            <td>{val.ProductName}</td>
                                            <td>{val.Price}</td>
                                            <td className="actionbutton">
                                                <button onClick={() => {
                                                    setEditpop(!editpop)
                                                    setPopupValues(val)
                                                }}>Edit</button>
                                                <button onClick={async () => {
                                                    const res = await ApiData('delete', val, val._id, false)
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
                        <ProductPopup vals={popupValues} />
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

export default ProductTable