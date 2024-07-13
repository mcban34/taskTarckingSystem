import MenuToll from '@/Components/MenuTool'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'react-toastify';


const Createuser = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        password: "",
        email: "",
        username: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const control = isFormValid()
        if (control) {
            const token = localStorage.getItem("token")
            fetch('http://localhost:3000/api/v1/employee', {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    if (!data.error) {
                        toast.success(`User is Created`);
                        router.push("/dashboard")
                    }
                    else {
                        toast.error(`ERROR! Please Try Again`);
                        router.push("/login")
                    }
                })
                .catch((error) => {
                    router.push("/dashboard")
                    console.error('Error:', error);
                });
        }
        else {
            toast.error(`Please Do Not Leave Empty Space`);
        }
    }

    return (
        <main
            className='flex bg-custom-gradient min-h-screen flex-col text-white'
        >
            <MenuToll />

            <div className="w-full h-[100vh] flex items-center justify-center">
                <div className="mt-4 w-[90%] lg:w-[35%] rounded bg-white/20 p-5 text-white backdrop-blur-sm backdrop-opacity-90">
                    <h2 className="text-2xl mb-3">Create New User</h2>
                    <form onSubmit={handleSubmit}>
                        <dl>
                            <div className="mb-3">
                                <dt>
                                    <label htmlFor="title" className="block mb-1">Name</label>
                                </dt>
                                <dd>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="text-black w-full pl-3 py-2 focus:outline-none"
                                        placeholder="Enter Name..."
                                    />
                                </dd>
                            </div>
                            <div className="mb-3">
                                <dt>
                                    <label htmlFor="title" className="block mb-1">Surname</label>
                                </dt>
                                <dd>
                                    <input
                                        type="text"
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleChange}
                                        className="text-black w-full pl-3 py-2 focus:outline-none"
                                        placeholder="Enter Surname..."
                                    />
                                </dd>
                            </div>
                            <div className="mb-3">
                                <dt>
                                    <label htmlFor="title" className="block mb-1">User Name</label>
                                </dt>
                                <dd>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="text-black w-full pl-3 py-2 focus:outline-none"
                                        placeholder="Enter User Name..."
                                    />
                                </dd>
                            </div>
                            <div className="mb-3">
                                <dt>
                                    <label htmlFor="title" className="block mb-1">E-mail</label>
                                </dt>
                                <dd>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="text-black w-full pl-3 py-2 focus:outline-none"
                                        placeholder="Enter E-mail..."
                                    />
                                </dd>
                            </div>
                            <div className="mb-3">
                                <dt>
                                    <label htmlFor="title" className="block mb-1">Password</label>
                                </dt>
                                <dd>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="text-black w-full pl-3 py-2 focus:outline-none"
                                        placeholder="Enter E-mail..."
                                    />
                                </dd>
                            </div>

                        </dl>
                        <button
                            type='submit'
                            className='bg-black/50 text-white-500 py-1 px-3 rounded-sm w-full'
                        >
                            Create User
                        </button>
                    </form>
                </div>
            </div>

            <div className="hidden lg:block absolute z-10 top-0 left-0 inset-y-3 inset-x-0 w-80 rounded-full bg-gradient-to-b from-pink-500 via-purple-500 to-purple-600 blur-3xl opacity-10"></div>
            <div className="hidden lg:block absolute z-10 top-0 right-0 inset-y-0 inset-x-3/4 w-80 rounded-full bg-gradient-to-b from-pink-500 via-purple-500 to-purple-600 blur-3xl opacity-10"></div>
        </main>
    )
}

export default Createuser