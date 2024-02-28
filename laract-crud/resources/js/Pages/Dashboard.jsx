import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Dashboard(props) {
    console.log(props);
    const [input, setInput] = useState({
        title: "",
        category: "",
        description: "",
    });
    const [notif, setNotif] = useState(false);

    const handleInput = (e) => {
        let data = e.target.name;
        let value = e.target.value;

        if (data === "title") {
            setInput({ ...input, title: value });
        } else if (data === "category") {
            setInput({ ...input, category: value });
        } else if (data === "description") {
            setInput({ ...input, description: value });
        }
    };

    const resetNotif = () => {
        setTimeout(() => {
            setNotif(false);
        }, 3000); // 2000 milidetik atau 2 detik
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            title: input.title,
            description: input.description,
            category: input.category,
        };
        router.post(route("news.store"), data);
        setNotif(true);
        resetNotif();
        setInput({
            title: "",
            description: "",
            category: "",
        });
    };

    useEffect(() => {
        if (!props.myNews) {
            router.get(route("news.show"));
        }
    }, []);
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {notif && (
                                <div
                                    role="alert"
                                    className="alert alert-success"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{props.flash.message}</span>
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Judul"
                                    value={input.title}
                                    onChange={handleInput}
                                    className="m-2 input input-bordered w-full"
                                />
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Deskripsi"
                                    value={input.description}
                                    onChange={handleInput}
                                    className="m-2 input input-bordered w-full"
                                />
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Category"
                                    value={input.category}
                                    onChange={handleInput}
                                    className="m-2 input input-bordered w-full"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-success  btn-md m-2"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
