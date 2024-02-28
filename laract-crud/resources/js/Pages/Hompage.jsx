import React from "react";
import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import NewsCard from "@/Components/Hompage/NewsCard";
import Pagination from "@/Components/Hompage/Pagination";

const Hompage = (props) => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 p-4">
                <NewsCard news={props.news.data} />
            </div>
            <div className="flex justify-center items-center">
                <Pagination meta={props.news.meta} />
            </div>
        </div>
    );
};

export default Hompage;
