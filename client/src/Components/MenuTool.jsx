import React, { useState, Fragment } from 'react'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
            <button
                onClick={() => setIsOpen(true)}
                className='bg-white/20 p-2 rounded-lg text-white backdrop-blur-sm backdrop-opacity-90'
            >
                <svg class="h-8 w-8 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>

            </button>
            <Transition show={isOpen} as={Fragment}>
                <Dialog
                    onClose={() => setIsOpen(false)}
                    className="relative z-50"
                >
                    <div className="fixed inset-0 bg-black/90" aria-hidden="true" />

                    <div className="fixed inset-0 flex w-screen items-center justify-end">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="ease-in duration-200"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <DialogPanel className="w-full lg:max-w-sm rounded bg-white/10 p-3 text-white backdrop-blur-2xl backdrop-opacity-80 h-[100vh] px-4 py-3 overflow-y-scroll">
                                <div className="flex justify-between items-center">
                                    <DialogTitle className={"text-3xl font-bold text-white"}>Menu</DialogTitle>
                                    <svg onClick={() => setIsOpen(false)} class="h-5 w-5 text-Green cursor-pointer" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                                </div>
                                <div className='mt-3'>
                                    <ul>
                                        {
                                            menus.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className='mb-3 hover:text-white/70 duration-300 font-medium'
                                                >
                                                    <Link href={`${item.link}`}>{item.label}</Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className='absolute bottom-5 w-11/12'>
                                    <button
                                        className='bg-red-400 hover:bg-red-500 duration-300 text-red-100 w-full py-2 rounded-md'
                                        onClick={quitApp}
                                    >
                                        Quit
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default MenuToll