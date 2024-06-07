import React, { useEffect } from "react";
import { useState } from "react";
import UserTable from "./newUserTable"
import ProductTable from "./productTable"
import "../index.css"

export default function Table() {
    const [decideTable, setDecideTable] = useState(true)
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "u" || event.key === "U") {
                setDecideTable(true);
            } else if (event.key === "p" || event.key === "P") {
                setDecideTable(false);
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    })
    return (
        <>
            <div className="flex w-100vw h-full align-top pt-[60px] bg-black">
                <div className="flex flex-col gap-3 justify-start h-max ml-[110px] w-fit">
                    <button onClick={() => setDecideTable(true)} className="shadow-[inset_0_0_0_2px_#616467] text-white w-fit px-4 py-1 rounded-full text-lg font-medium bg-transparent hover:bg-[white] hover:text-black dark:text-neutral-200 transition duration-200">User Table [press - "u"]</button>
                    <button onClick={() => setDecideTable(false)} className="shadow-[inset_0_0_0_2px_#616467] text-white w-fit px-4 py-1 rounded-full text-lg font-medium bg-transparent hover:bg-[white] hover:text-black dark:text-neutral-200 transition duration-200">Product Table [press - "p"]</button>
                </div>
                <div className="ml-[90px]">
                    {
                        decideTable ? <UserTable /> : <ProductTable />
                    }
                </div>
            </div>
        </>
    )
}