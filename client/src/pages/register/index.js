import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Index = () => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        passwordAgain: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(formData.password == formData.passwordAgain){
            console.log("submit ok");
        }
        else{
            console.log("error pass again");
        }

    }

    return (
        <div className={`flex min-h-screen flex-col`}>
            <div className="bg-gray-100 flex justify-center items-center h-screen">
                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat" alt="Placeholder Image" className="object-cover w-full h-full" />
                </div>
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="userName" className="block text-gray-600">Username</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                value={formData.userName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600">Mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="passwordAgain" className="block text-gray-600">Password Again</label>
                            <input
                                type="password"
                                id="passwordAgain"
                                name="passwordAgain"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                value={formData.passwordAgain}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Register</button>
                    </form>
                    <div className="mt-6 text-blue-500 text-center">
                        <Link href={"/login"}>Login Here</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
