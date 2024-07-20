import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { toast } from 'react-toastify';

const CreateTaskModal = ({ isOpenCreateDialog, setIsOpenCreateDialog, gelAllTask, activeCreateTask }) => {
    console.log("activeCreateTask", activeCreateTask)
    const router = useRouter()
    const [formData, setFormData] = useState({
        taskDescription: "",
        employee_id: "",
        start_date: "",
        finish_date: "",
        status: "",
        title: ""
    });
    const [employees, setEmployees] = useState([])
    const [statuses, setStatuses] = useState([
        { id: 'assigned', name: 'Assigned' },
        { id: 'inprogress', name: 'In Progress' },
        { id: 'completed', name: 'Completed' },
    ])
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState({
        id: activeCreateTask,
        name: activeCreateTask
    });

    console.log("selectedStatus", selectedStatus);
    console.log("formData", formData);


    const getAllUser = async () => {
        const url = 'http://localhost:3000/api/v1/employee';
        const token = localStorage.getItem("token")
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();

            if (!data.error) {
                setEmployees(data)
                setSelectedEmployee(data[0])
                setFormData(prevFormData => ({
                    ...prevFormData,
                    employee_id: data[0]?.id || ""
                }));
                setFormData(prevFormData => ({
                    ...prevFormData,
                    status: activeCreateTask
                }));

            }
            else {
                router.push("/login")
            }
        } catch (error) {
            router.push("/login")
            console.error('Fetch error:', error);
        }
    }

    useEffect(() => {
        getAllUser()
        setFormData({
            taskDescription: "",
            employee_id: "",
            start_date: "",
            finish_date: "",
            status: "",
            title: ""
        })
    }, [])

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const control = isFormValid()
        if (control) {
            const token = localStorage.getItem("token")
            fetch('http://localhost:3000/api/v1/task', {
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
                        toast.success(`Task is Created`);
                        gelAllTask()
                        setIsOpenCreateDialog(false)
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
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEmployeeChange = (employee) => {
        setSelectedEmployee(employee);
        setFormData({
            ...formData,
            employee_id: employee.id
        });
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        setFormData({
            ...formData,
            status: status.id
        });
    };
    return (
        <Dialog
            open={isOpenCreateDialog} onClose={() => setIsOpenCreateDialog(false)}
            transition
            className="z-50 fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center">
                <DialogPanel className="w-[50%] space-y-4 border bg-white p-4 max-h-[70vh] overflow-y-auto">
                    <div className='flex justify-between items-center'>
                        <DialogTitle className="font-bold">{activeCreateTask.charAt(0).toUpperCase() + activeCreateTask.slice(1)} Create Task</DialogTitle>
                        <span
                            onClick={() => setIsOpenCreateDialog(false)}
                            className='text-2xl cursor-pointer'
                        >x</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <dl>
                            <div className="mb-3">
                                <dt>
                                    <label htmlFor="title" className="block mb-1">Title</label>
                                </dt>
                                <dd>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="text-black w-full pl-3 py-2 focus:outline-none border"
                                        placeholder="Enter Title..."
                                    />
                                </dd>
                            </div>
                            <div className="mb-3">
                                <dt>
                                    <label htmlFor="taskDescription" className="block mb-1">Description</label>
                                </dt>
                                <dd>
                                    <textarea
                                        id="taskDescription"
                                        name="taskDescription"
                                        placeholder="Enter Description.."
                                        onChange={handleChange}
                                        value={formData.taskDescription}
                                        className="w-full h-28 max-h-40 text-black pl-3 py-2 focus:outline-none border"
                                    >
                                    </textarea>
                                </dd>
                            </div>
                            <div className="mb-3 relative">
                                <dt>
                                    <label htmlFor="status" className="block mb-1">Worker :</label>
                                </dt>
                                <dd className='relative'>
                                    {
                                        selectedEmployee && employees && (
                                            <Listbox value={selectedEmployee} onChange={handleEmployeeChange}>
                                                <ListboxButton className=" bg-white/20 py-1 rounded-sm text-left pl-2 border w-52">
                                                    {selectedEmployee.name}
                                                </ListboxButton>
                                                <ListboxOptions
                                                    anchor="bottom"
                                                    className="bg-gray-800 mt-1 p-3  text-white w-52"
                                                >
                                                    {employees.map((person) => (
                                                        <ListboxOption
                                                            key={person.id}
                                                            value={person}
                                                            className="data-[focus]:text-white/60 mt-1 duration-300 cursor-pointer"
                                                        >
                                                            {person.name}
                                                        </ListboxOption>
                                                    ))}
                                                </ListboxOptions>
                                            </Listbox>
                                        )
                                    }
                                </dd>
                            </div>
                            <div className="mb-3">
                                <dt>
                                    <label htmlFor="start_date" className="block mb-1">Start Date:</label>
                                </dt>
                                <dd>
                                    <input
                                        type="date"
                                        id="start_date"
                                        name="start_date"
                                        value={formData.start_date}
                                        onChange={handleChange}
                                        className="w-full py-1 pl-3 bg-white/20 backdrop-blur-sm backdrop-opacity-90 border"
                                    />
                                </dd>
                            </div>
                            <div className="mb-3">
                                <dt>
                                    <label htmlFor="finish_date" className="block mb-1">Finish Date:</label>
                                </dt>
                                <dd>
                                    <input
                                        type="date"
                                        id="finish_date"
                                        name="finish_date"
                                        value={formData.finish_date}
                                        onChange={handleChange}
                                        className="border w-full py-1 pl-3 bg-white/20 backdrop-blur-sm backdrop-opacity-90"
                                    />
                                </dd>
                            </div>
                            <div className="mb-3">
                                <dt>
                                    <label htmlFor="status" className="block mb-1">Status:</label>
                                </dt>
                                <dd>
                                    <Listbox value={selectedStatus} onChange={handleStatusChange}>
                                        <ListboxButton className="w-52 bg-white/20 py-1 rounded-sm text-left pl-2 border">
                                            {selectedStatus.name}
                                        </ListboxButton>
                                        <ListboxOptions anchor="bottom" className=" mt-1 p-3 w-52 bg-gray-800 text-white">
                                            {statuses.map((person) => (
                                                <ListboxOption
                                                    key={person.id}
                                                    value={person}
                                                    className="data-[focus]:text-white/60 mt-1 duration-300 cursor-pointer"
                                                >
                                                    {person.name}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </Listbox>
                                </dd>
                            </div>
                        </dl>
                        <button
                            type='submit'
                            className='bg-blue-100 text-blue-500 py-1 px-3 rounded-sm w-full'
                        >
                            Create Task
                        </button>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default CreateTaskModal