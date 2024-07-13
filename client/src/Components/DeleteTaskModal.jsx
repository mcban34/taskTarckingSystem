import React from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from 'react-toastify';

export const DeleteTaskModal = ({ isOpenDeleteDialog, setIsOpenDeleteDialog, taskId, setTasks }) => {

    const deleteTask = () => {
        const url = `http://localhost:3000/api/v1/task?taskId=${taskId}`;
        const apiKey = localStorage.getItem("token")

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `${apiKey}`
            }
        })
            .then(response => response.json())
            .then(data => {

                //*task silinme işleminden sonra stateyide güncelledimki ekranda anlık olark silinen task düşsün
                setTasks(prevTasks => ({
                    assigned: prevTasks.assigned.filter(task => task.id !== taskId),
                    inprogress: prevTasks.inprogress.filter(task => task.id !== taskId),
                    completed: prevTasks.completed.filter(task => task.id !== taskId)
                }));

                toast.success(`Task Is Deleted`);

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <Dialog
            open={isOpenDeleteDialog} onClose={() => setIsOpenDeleteDialog(false)}
            transition
            className="z-50 fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-4 max-h-[70vh] overflow-y-auto">
                    <div className='flex justify-between items-center'>
                        <DialogTitle className="font-bold">Delete Task</DialogTitle>
                        <IoCloseCircleOutline
                            onClick={() => setIsOpenDeleteDialog(false)}
                            className='cursor-pointer size-6'
                        />
                    </div>
                    <Description className={"max-h-[30vh] overflow-y-auto"}>Are you sure you want to delete this task?</Description>
                    <div className='flex justify-end gap-1'>
                        <button
                            onClick={() => setIsOpenDeleteDialog(false)}
                            className='bg-blue-100 text-blue-500 py-1 px-3 rounded-md'
                        >
                            Cancel
                        </button>
                        <button
                            className='bg-red-100 text-red-500 py-1 px-3 rounded-md'
                            onClick={() => {
                                setIsOpenDeleteDialog(false)
                                deleteTask()
                            }}>
                            Delete
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
