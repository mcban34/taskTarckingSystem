import { TaskDetail } from "@/Components/TaskDetail";
import axios from "axios";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { RiDeleteBinLine } from "react-icons/ri";
import { IoInformationCircleOutline } from "react-icons/io5";
import { DeleteTaskModal } from "@/Components/DeleteTaskModal";
import MenuToll from "@/Components/MenuTool";
import CreateTaskModal from "@/Components/CreateTaskModal";


const inter = Inter({ subsets: ["latin"] });

const convertDateFormat = (x) => {
  const date = new Date(x);
  const formattedDate = date.toLocaleDateString('tr-TR')
  return formattedDate
}

export default function Home() {
  const router = useRouter()
  const [tasks, setTasks] = useState({
    assigned: [],
    inprogress: [],
    completed: [],
  });
  const [data, setData] = useState([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false)
  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false)
  const [modalTaskData, setModalTaskData] = useState(null)
  const [taskId, setTaskId] = useState(null)
  const [activeCreateTask, setActiveCreateTask] = useState(null)
  useEffect(() => {
    const getTasks = async () => {
      // Kategorilere göre ayır
      const categorizedTasks = {
        assigned: data.filter(task => task.status === 'assigned'),
        inprogress: data.filter(task => task.status === 'inprogress'),
        completed: data.filter(task => task.status === 'completed'),
      };

      setTasks(categorizedTasks);
    };

    getTasks();
  }, [data]);

  const dragEndSendRequest = (TaskId, TaskStatus) => {
    const token = localStorage.getItem("token");
    const data = {
      body: {
        status: TaskStatus
      },
      where: {
        id: TaskId
      }
    };

    fetch('http://localhost:3000/api/v1/task', {
      method: 'PUT',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(value => {
        toast.success(`Task is ${TaskStatus}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Eğer görev bir hedefe bırakılmıyorsa işlemi durdur
    if (!destination) return;

    // Kaynak ve hedef listeler
    const sourceList = tasks[source.droppableId];
    const destList = tasks[destination.droppableId];

    // Kaynak ve hedef aynıysa ve indexler aynıysa bir şey yapma
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Kaynak listeden görevi çıkar ve hedef listeye ekle
    const [movedTask] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, movedTask);

    // Yeni statüyü belirle
    movedTask.status = destination.droppableId;

    // Güncellenmiş listeler
    const updatedTasks = {
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList
    };

    setTasks(updatedTasks);
    dragEndSendRequest(movedTask.id, destination.droppableId)

    console.log("Moved Task ID:", movedTask.id, "New Status:", destination.droppableId);
  };

  const createTast = (status) => {
    setActiveCreateTask(status)
    setIsOpenCreateDialog(true)
  }

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? '#1A2541' : '',
    padding: 8,
    margin: '0 4px',
    border: '1px dashed #848DA2',
    borderRadius: '5px',
    width: '100%',
    height: '93vh',
    // overflowY: "auto"
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: '16px',
    margin: '0 0 8px 0',
    backgroundColor: isDragging ? '#7B5EEA' : '#fff',
    color: isDragging ? '#fff' : '#000',
    ...draggableStyle
  });

  const sendRequest = async () => {
    const token = localStorage.getItem("token")

    fetch('http://localhost:3000/api/v1/task', {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
      },
    })
      .then(res => res.json())
      .then(value => {
        if (!value.error) {
          setData(value)
        }
        else {
          router.push("/login")
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  useEffect(() => {
    sendRequest()
  }, [])

  return (
    <main
      className={`flex bg-custom-gradient min-h-screen flex-col ${inter.className}`}
    >
      <div
        className="w-10/12 mx-auto m-4 z-20"
      >
        <MenuToll />
        <div className="lg:flex">
          <DragDropContext onDragEnd={onDragEnd}>
            {['assigned', 'inprogress', 'completed'].map((status) => (
              <Droppable key={status} droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className="w-full focus:outline-none"
                  >
                    <div className="h-[5%]">
                      <h3 className="text-white mb-5 font-semibold text-xl text-center">{status}</h3>
                    </div>
                    <div className="h-[90%] overflow-y-auto">
                      {tasks[status].map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index} className="z-30">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mt-4 w-full z-40 rounded bg-white/20 p-5 text-white backdrop-blur-sm backdrop-opacity-90 ${snapshot.isDragging ? "bg-white/50 text-white" : "bg-white"}`}
                              onClick={() => {
                                setIsOpenDialog(true)
                                setModalTaskData(task)
                              }}
                            >
                              <div className="flex justify-between">
                                <h3 className="text-2xl">{task.title}</h3>
                                <div className="flex items-center gap-1">
                                  <div
                                    className="bg-white/20 w-7 z-50 h-7 flex justify-center items-center rounded-full"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setIsOpenDeleteDialog(true)
                                      setTaskId(task.id)
                                    }}
                                  >
                                    <RiDeleteBinLine
                                    />
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm">{task.taskDescription}</p>
                              <hr className="opacity-15 my-2" />
                              <div className="flex justify-between">
                                <p className="text-sm">{convertDateFormat(task.start_date)} - {convertDateFormat(task.finish_date)}</p>
                                <p>{task.full_name}</p>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    <div className="h-[5%]">
                      <div className="text-center mt-3">
                        <button
                          className="text-white focus:outline-none"
                          onClick={() => {
                            createTast(status)
                          }}
                        >
                          Add {status}
                        </button>
                      </div>
                    </div>
                    {
                      isOpenCreateDialog && (
                        <CreateTaskModal
                          isOpenCreateDialog={isOpenCreateDialog}
                          setIsOpenCreateDialog={setIsOpenCreateDialog}
                          gelAllTask={sendRequest}
                          activeCreateTask={activeCreateTask}
                        />
                      )
                    }
                    {
                      modalTaskData != null && (
                        <TaskDetail
                          isOpenDialog={isOpenDialog}
                          setIsOpenDialog={setIsOpenDialog}
                          title={modalTaskData.title}
                          description={modalTaskData.taskDescription}
                          startDate={convertDateFormat(modalTaskData.start_date)}
                          endDate={convertDateFormat(modalTaskData.finish_date)}
                          fullName={modalTaskData.full_name}
                        />
                      )
                    }
                    {
                      <DeleteTaskModal
                        isOpenDeleteDialog={isOpenDeleteDialog}
                        setIsOpenDeleteDialog={setIsOpenDeleteDialog}
                        taskId={taskId}
                        setTasks={setTasks}
                      />
                    }
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
      <div className="hidden lg:block absolute z-10 top-0 left-0 inset-y-3 inset-x-0 w-80 rounded-full bg-gradient-to-b from-pink-500 via-purple-500 to-purple-600 blur-3xl opacity-10"></div>
      <div className="hidden lg:block absolute z-10 top-0 right-0 inset-y-0 inset-x-3/4 w-80 rounded-full bg-gradient-to-b from-pink-500 via-purple-500 to-purple-600 blur-3xl opacity-10"></div>
    </main>
  );
}