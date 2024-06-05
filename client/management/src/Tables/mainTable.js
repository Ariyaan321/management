import React from "react";
import { useState } from "react";
import UserTable from "./userTable"
import ProductTable from "./productTable"

export default function Table() {
    const [decideTable, setDecideTable] = useState(true)

    return (
        <>
            <button onClick={() => setDecideTable(true)}>User Table</button>
            <button onClick={() => setDecideTable(false)}>Product Table</button>
            {
                decideTable ? <UserTable /> : <ProductTable />
            }
        </>
    )
}
