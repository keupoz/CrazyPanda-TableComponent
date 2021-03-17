import { Component, createElement, MouseEvent } from "react";

export interface IPaginationProps {
    currentPage: number;
    pages: number;

    onPageChange(page: number): void;
}

export class Pagination extends Component<IPaginationProps> {
    constructor(props: IPaginationProps) {
        super(props);

        this.state = {};
    }

    public render() {
        const { currentPage, pages } = this.props;

        return pages > 1 && (
            <nav>
                <ul className="pagination">
                    <li
                        className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
                        onClick={(e) => this.onPageClick(e, currentPage - 1)}
                    >
                        <a className="page-link" href="#">Previous</a>
                    </li>

                    {this.renderPageItems()}

                    <li
                        className={`page-item ${currentPage === pages - 1 ? "disabled" : ""}`}
                        onClick={(e) => this.onPageClick(e, currentPage + 1)}
                    >
                        <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        );
    }

    private onPageClick(e: MouseEvent, page: number) {
        e.preventDefault();

        const { currentPage, pages, onPageChange } = this.props;

        if (page === currentPage || page >= pages || page < 0) return;

        onPageChange(page);
    }

    private renderPageItems() {
        const { currentPage, pages } = this.props,
            result: JSX.Element[] = [];

        for (let i = 0; i < pages; i++) {
            result.push(<li
                key={i}
                className={`page-item ${i === currentPage ? "active" : ""}`}
                onClick={(e) => this.onPageClick(e, i)}
            >
                {i === currentPage
                    ? <span className="page-link">{i + 1}</span>
                    : <a className="page-link" href="#">{i + 1}</a>
                }
            </li>);
        }

        return result;
    }
}
