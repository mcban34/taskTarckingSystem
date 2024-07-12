import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { toast } from 'react-toastify';
import MenuToll from '@/Components/MenuTool';

const Createtask = () => {
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
    const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
    const [sendButtonControl, setSendButtonControl] = useState(false)


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
                    status: statuses[0].id
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
        else{
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
        <main className="flex bg-custom-gradient text-white min-h-screen flex-col items-center justify-center">
            <MenuToll/>
            <div className="w-full h-full flex items-center justify-center">
                <div className="mt-4 w-[35%] rounded bg-white/20 p-5 text-white backdrop-blur-sm backdrop-opacity-90">
                    <h2 className="text-2xl mb-3">Create New Task</h2>
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
                                        className="text-black w-full pl-3 py-2 focus:outline-none"
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
                                        className="w-full h-28 max-h-40 text-black pl-3 py-2 focus:outline-none"
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
                                                <ListboxButton className="w-full bg-white/20 py-1 rounded-sm text-left pl-2">
                                                    {selectedEmployee.name}
                                                </ListboxButton>
                                                <ListboxOptions
                                                    anchor="bottom"
                                                    className="bg-white/80 mt-1 p-3 w-[32%] text-black backdrop-blur-sm backdrop-opacity-100"
                                                >
                                                    {employees.map((person) => (
                                                        <ListboxOption
                                                            key={person.id}
                                                            value={person}
                                                            className="data-[focus]:text-black/60 mt-1 duration-300 cursor-pointer"
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
                                        className="text-white w-full py-1 pl-3 bg-white/20 backdrop-blur-sm backdrop-opacity-90"
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
                                        className="text-white w-full py-1 pl-3 bg-white/20 backdrop-blur-sm backdrop-opacity-90"
                                    />
                                </dd>
                            </div>
                            <div className="mb-3">
                                <dt>
                                    <label htmlFor="status" className="block mb-1">Status:</label>
                                </dt>
                                <dd>
                                    <Listbox value={selectedStatus} onChange={handleStatusChange}>
                                        <ListboxButton className="w-full bg-white/20 py-1 rounded-sm text-left pl-2">
                                            {selectedStatus.name}
                                        </ListboxButton>
                                        <ListboxOptions anchor="bottom" className="bg-white/80 mt-1 p-3 w-[32%] text-black backdrop-blur-sm backdrop-opacity-100">
                                            {statuses.map((person) => (
                                                <ListboxOption
                                                    key={person.id}
                                                    value={person}
                                                    className="data-[focus]:text-black/60 mt-1 duration-300 cursor-pointer"
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
                            className='bg-black/50 text-white-500 py-1 px-3 rounded-sm w-full'
                        >
                            Create Task
                        </button>
                    </form>
                </div>
            </div>
            <div className="absolute z-10 top-0 left-0 inset-y-3 inset-x-0 w-80 rounded-full bg-gradient-to-b from-pink-500 via-purple-500 to-purple-600 blur-3xl opacity-10"></div>
            <div className="absolute z-10 top-0 right-0 inset-y-0 inset-x-3/4 w-80 rounded-full bg-gradient-to-b from-pink-500 via-purple-500 to-purple-600 blur-3xl opacity-10"></div>
        </main>

    )
}

export default Createtask