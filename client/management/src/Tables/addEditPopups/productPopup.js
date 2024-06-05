import React from "react"
import { useState } from "react";
import ApiData from "../../MyApi/apiData";

export default function ProductPopup(vals = "") {      // vals == "" for Add User button

    const userId = vals.vals._id // Passing users's id
    const [editpop, setEditpop] = useState(true)
    const [productName, setProductName] = useState(vals.vals.ProductName)
    const [price, setPrice] = useState(vals.vals.Price)
    const [apiResponse, setApiResponse] = useState("")

    function formToJSON(e) {
        return (
            {
                "ProductName": e.productName.value,
                "Price": e.price.value,
            }
        )
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const updatedData = formToJSON(e.target)
        // setApiResponse(<ApiData meth='put' data={updatedData} />)   // returned value from MyApi component      
        vals.vals === "" ? setApiResponse(await ApiData("post", updatedData, "", false)) : setApiResponse(await ApiData("put", updatedData, userId, false))
    }

    function handleProductName(e) {
        setProductName(e.target.value)
    }
    function handlePrice(e) {
        setPrice(e.target.value)
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
                        <input type="text" name="productName" value={productName} onChange={handleProductName} placeholder="Product Name" />
                        <input type="number" name="price" value={price} onChange={handlePrice} placeholder="Price" />
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