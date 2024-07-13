import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Index = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const router = useRouter()

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== "");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const sendLoginForm = (event) => {
        event.preventDefault();
        const { email, password } = formData;
        const control = isFormValid()
        if (!control) {
            toast.success(`Please Do Not Leave Empty Space`);
            return;
        }
        else {
            try {
                fetch('http://localhost:3000/api/v1/employee/login', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                    .then(async (res) => res.ok && (await res.json()))
                    .then((value) => {
                        if (value != false) {
                            const { token } = value
                            router.push("/dashboard")
                            localStorage.setItem("token", token)
                            toast.success(`Login Successful`);
                        }
                        else {
                            toast.error(`Username Or Password Is Wrong`);
                        }
                    })
                    .catch((e) => console.log(e));
            } catch (error) {
                notification.error({ message: error.message || error });
            }
        }
    }



    useEffect(() => {

    }, []);

    return (
        <div className={`flex min-h-screen text-white bg-custom-gradient  flex-col`}>
            <div className="flex z-20 justify-center items-center h-screen">
                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="/login.jpg" alt="Placeholder Image" className="object-cover w-full h-full" />
                </div>
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>
                    <form onSubmit={sendLoginForm}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1">Mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border text-black border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 text-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <button type="submit" className="bg-white/20  py-2 rounded-md text-white backdrop-blur-sm backdrop-opacity-90 w-full">Login</button>
                    </form>
                </div>
            </div>
            <div className="hidden lg:block absolute z-10 top-0 right-0 inset-y-0 inset-x-3/4 w-80 rounded-full bg-gradient-to-b from-pink-500 via-purple-500 to-purple-600 blur-3xl opacity-10"></div>
        </div>
    )
}

export default Index
