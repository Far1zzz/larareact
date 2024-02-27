import { Link } from "@inertiajs/react";
import React from "react";

const Pagination = ({ meta }) => {
    console.log(meta);
    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    const currentPage = meta.current_page;
    const totalPage = meta.last_page;
    return (
        <div className="join">
            {prev && (
                <Link href={prev} className="join-item btn">
                    «
                </Link>
            )}
            <button className="join-item btn">
                Page {currentPage} of {totalPage}
            </button>
            {next && (
                <Link href={next} className="join-item btn">
                    »
                </Link>
            )}
        </div>
    );
};

export default Pagination;
