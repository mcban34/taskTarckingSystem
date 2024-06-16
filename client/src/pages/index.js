import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [tasks, setTasks] = useState({
    assigned: [],
    "in-progress": [],
    completed: [],
  });
  const [data, setData] = useState([]); 

  useEffect(() => {
    try {
      fetch('http://localhost:5000/api/v1/task', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxZjNmMmNkLTVjMTUtNDUyMC05ZDk5LWY0NmY1MWFkMzQxMCIsImlhdCI6MTcxODU1NDg1OSwiZXhwIjoxNzE4NTU4NDU5fQ.KkRJOLq9xdkOs7ylcOiEE7Ful9jzwZTpMHRtGQrMYDc',
        },
      })
        .then(async (res) => res.ok && (await res.json()))
        .then((r) => r?.length && setData(r))
        .catch((e) => console.log(e));
    } catch (error) {
      notification.error({ message: error.message || error });
    }
  }, []);

  useEffect(() => {
    console.log("Data : ", data);
  }, [data])

  useEffect(() => {
    const getTasks = async () => {
      let tasksx = [
        { id: '1', title: 'Task 1', status: 'assigned' },
        { id: '2', title: 'Task 2', status: 'assigned' },
        { id: '3', title: 'Task 3', status: 'assigned' },
        { id: '4', title: 'Task 4', status: 'assigned' },
      ];

      // Kategorilere göre ayır
      const categorizedTasks = {
        assigned: tasksx.filter(task => task.status === 'assigned'),
        "in-progress": tasksx.filter(task => task.status === 'in-progress'),
        completed: tasksx.filter(task => task.status === 'completed'),
      };

      setTasks(categorizedTasks);
    };

    getTasks();
  }, []);

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

    console.log("Moved Task ID:", movedTask.id, "New Status:", destination.droppableId);
  };

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    margin: '0 4px',
    border: '1px solid lightgrey',
    borderRadius: '2px',
    width: '250px',
    minHeight: '500px'
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: '16px',
    margin: '0 0 8px 0',
    backgroundColor: isDragging ? 'lightgreen' : '#fff',
    color: 'black',
    ...draggableStyle
  });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex">
        <DragDropContext onDragEnd={onDragEnd}>
          {['assigned', 'in-progress', 'completed'].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={getListStyle(snapshot.isDraggingOver)}
                  className="test"
                >
                  <h3>{status}</h3>
                  {tasks[status].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          <span className="border border-red-300">
                            {task.title}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </main>
  );
}