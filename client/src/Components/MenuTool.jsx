import React, { useState, Fragment } from 'react'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoHomeOutline } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { RxExit } from "react-icons/rx";



const MenuToll = () => {
    const router = useRouter()
    let [isOpen, setIsOpen] = useState(false)

    const menus = [
        {
            label: "Home",
            link: "/dashboard"
        },
        {
            label: "Create Task",
            link: "/createtask"
        },
        {
            label: "Create User",
            link: "/createuser"
        },
    ]

    const quitApp = () => {
        router.push("/login")
        localStorage.removeItem("token")
    }

    return (
        <div className='fixed z-50 md:absolute right-5 bottom-5 md:right-5 md:top-5'>
            <Link href={"/"}>
                <div className='bg-white/20 p-5 text-white backdrop-blur-sm backdrop-opacity-90 rounded-full text-2xl'>
                    <IoHomeOutline />
                </div>
            </Link>
            <Link href={"/createuser"}>
                <div className='mt-3 bg-white/20 p-5 text-white backdrop-blur-sm backdrop-opacity-90 rounded-full text-2xl'>
                    <FiUserPlus />
                </div>
            </Link>
            <div
                onClick={quitApp}
                className='mt-3 bg-red-500 text-red-100 p-5 cursor-pointer rounded-full text-2xl'
            >
                <RxExit />
            </div>
        </div>
    )
}

export default MenuToll