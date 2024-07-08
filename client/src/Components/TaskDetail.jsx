import React from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { IoCloseCircleOutline } from "react-icons/io5";


export const TaskDetail = ({ isOpenDialog, setIsOpenDialog, title, description, startDate, endDate }) => {
    return (
        <Dialog
            open={isOpenDialog} onClose={() => setIsOpenDialog(false)}
            transition
            className="z-50 fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-4 max-h-[70vh] overflow-y-auto">
                    <div className='flex justify-between items-center'>
                        <DialogTitle className="font-bold">{title}</DialogTitle>
                        <IoCloseCircleOutline 
                            onClick={() => setIsOpenDialog(false)} 
                            className='cursor-pointer size-6'
                        />
                    </div>
                    <Description className={"max-h-[30vh] overflow-y-auto"}>{description}</Description>
                    <p className='text-sm'>
                        <b>Start Date - End Date: {startDate} / {endDate}</b>
                    </p>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
