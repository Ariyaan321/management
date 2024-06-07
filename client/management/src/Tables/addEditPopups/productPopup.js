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
                "ProductName": e.prodName.value,
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <span onClick={() => { setEditpop(!editpop) }} className="absolute cursor-pointer text-red-700 text-4xl font-extrabold ml-[310px] mt-[-260px] w-fit h-fit text-center hover:text-blue-700 duration-300">&times;</span>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-fit ml-8' >
                        {
                            vals.vals !== "" ? <h3 className="font-medium text-white backdrop-blur-xl">Update details</h3> : <h3 className="font-medium mt-[-25px] text-white backdrop-blur-xl">Add details</h3>
                        }
                        <input type="text" name="prodName" value={productName} onChange={handleProductName} placeholder="Product Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <input type="number" name="price" value={price} onChange={handlePrice} placeholder="Price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <input type="submit" value="submit" className="w-fit font-medium px-4 py-2 text-white backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200" />
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