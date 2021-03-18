import { Component, createElement, FormEvent, MouseEvent } from "react";
import { Pagination } from "./Pagination";

export type TableData = (number | string)[][];

export interface ITableProps {
    columns: string[];
    data: TableData;
    keyColumn: number;
    title: string;
}

interface ITableState {
    currentPage: number;
    filter: string;
    reversed: boolean;
    sortBy: number;
}

export class Table extends Component<ITableProps, ITableState> {
    constructor(props: ITableProps) {
        super(props);

        this.state = {
            currentPage: 0,
            filter: "",
            reversed: false,
            sortBy: -1
        };
    }

    public render() {
        const { currentPage, filter } = this.state,
            data = this.getData(),
            pages = this.getPages(data),
            offset = currentPage * 50;

        const pagination =
            <Pagination
                pages={pages}
                currentPage={currentPage}
                onPageChange={(page) => this.onPageChange(page)} />;

        return (
            <div>
                <div className="mb-3 d-flex align-items-center justify-content-between">
                    <div className="me-3 flex-grow-1">
                        <h6 className="m-0">{this.props.title}</h6>
                    </div>

                    <div>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Filter"
                            value={filter}

                            onInput={(e) => this.onFilterInput(e)}
                        />
                    </div>
                </div>

                {pagination}

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            {this.props.columns.map((label, index) => (
                                <th key={index}>
                                    <a href="#" onClick={(e) => this.onColumnClick(e, index)}>
                                        {label}
                                        <span className={`fas ${this.getSortIcon(index)} ms-2 text-muted`} />
                                    </a>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.slice(offset, offset + 50).map((row) => (
                            <tr key={row[this.props.keyColumn]}>
                                {row.map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {pagination}
            </div>
        );
    }

    /** Get filtered and sorted data */
    private getData() {
        const { reversed, sortBy } = this.state,
            filter = this.state.filter.toLowerCase();

        // Copy data to avoid mutating of original array
        let data = this.props.data.slice();

        if (filter.length > 0) {
            data = data.filter((row) => {
                // Search through all values of the row
                return row.some((value) => {
                    // Convert value to string
                    // Transfrom the string to lowercase
                    // And search for entered substring
                    return String(value).toLowerCase().includes(filter);
                });
            });
        }

        // If a column is selected to sort by then sort data
        if (sortBy > -1) {
            const orderDown = reversed ? -1 : 1,
                orderUp = reversed ? 1 : -1;

            data.sort((a, b) => {
                const subA = a[sortBy],
                    subB = b[sortBy];

                if (subA > subB) return orderDown;
                if (subA < subB) return orderUp;

                return 0;
            });
        }

        return data;
    }

    /** Get number of pages */
    private getPages(data: TableData) {
        return Math.ceil(data.length / 50);
    }

    /** Get sort icon for column index */
    private getSortIcon(index: number) {
        const { reversed, sortBy } = this.state;

        if (sortBy !== index) return "fa-sort";
        else return reversed ? "fa-sort-down" : "fa-sort-up";
    }

    private onColumnClick(e: MouseEvent, index: number) {
        e.preventDefault();
        this.updateSort(index);
    }

    private onFilterInput(e: FormEvent) {
        this.setState({
            currentPage: 0,
            filter: (e.target as HTMLInputElement).value
        });
    }

    private onPageChange(page: number) {
        this.setState({ currentPage: page });
    }

    private updateSort(index: number) {
        const { sortBy, reversed } = this.state;

        // If already selected column is clicked
        if (sortBy === index) {
            // If order is already reversed reset sorting
            if (reversed) this.setState({ sortBy: -1 });

            // Invert reversing
            this.setState({ reversed: !reversed });

            // Clicked a new column
        } else {
            // Reset reversing and update sortBy index
            this.setState({
                reversed: false,
                sortBy: index
            });
        }
    }
}
