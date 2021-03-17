import { createElement } from "react";
import { data } from "../data";
import { Table } from "./Table";

const title = "Accounts",
    columns = ["#", "First name", "Last name", "Username", "Phone number"];

export function App() {
    return (
        <div className="p-3">
            <Table title={title} keyColumn={0} columns={columns} data={data} />
        </div>
    );
}
