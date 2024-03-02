import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard(props) {
    // console.log(props);
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

    const handleDelete = async (id) => {
        // console.log(id);
        try {
            await router.post(route("delete.news", { id }));
            setNotif(true);
            resetNotif();
        } catch (error) {
            console.error("Gagal menghapus berita", error);
        }
    };

    const availMyNews = (props) => {
        const id = props.encId;

        return props.myNews.map((data, i) => {
            return (
                <div
                    key={i}
                    className="card w-full lg:w-96 bg-base-100 shadow-xl"
                >
                    <div className="card-body">
                        <h2 className="card-title">
                            {data.title}
                            <div className="badge badge-primary">NEW</div>
                        </h2>
                        <p>{data.description}</p>
                        <div className="card-actions justify-end">
                            <button className="badge badge-success badge-outline">
                                edit
                            </button>

                            <button
                                className="badge badge-error badge-outline"
                                // onClick={() => coba(data.id)}
                                onClick={() => handleDelete(id[i])}
                            >
                                delete
                            </button>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const unavailableNews = () => {
        return (
            <div className="text-black text-center">Berita tidak tersedia</div>
        );
    };

    // useEffect(() => {
    //     if (!props.myNews) {
    //         router.get(route("news.show"));
    //     }
    // }, []);
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
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
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
                            <form
                                className="flex flex-col justify-center items-center"
                                onSubmit={handleSubmit}
                            >
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
                                <div className="flex justify-start items-start w-full">
                                    <button
                                        type="submit"
                                        className="btn btn-outline btn-success   btn-sm"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="flex justify-center items-center my-5">
                        <div className="text-center timeline-end timeline-box">
                            {props.myNews.length > 0
                                ? "Daftar Berita Anda"
                                : "Anda Belum Upload Berita"}
                        </div>
                    </div>

                    <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center lg:px-0 px-6 gap-4">
                        {availMyNews(props)}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
