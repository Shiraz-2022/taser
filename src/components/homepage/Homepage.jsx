import { useState, useEffect } from 'react';
import './homepage.css'
import dayjs from 'dayjs';
import Main from './Main';
import TaskTypes from './TaskTypes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './TodoList';
import DoingList from './DoingList';
import DoneList from './DoneList';

function HomePage() {

  const [date, setDate] = useState(dayjs());
  const [currentDate] = useState(dayjs().format('YYYY-MM-DD'));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);

  const [isTaskListClicked, setIsTaskListClicked] = useState(false);
  const [taskListId, setTaskListId] = useState();

  const [toDoCount, setTodoCount] = useState(0);
  const [doingCount, setDoingCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);




  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        mode: 'cors',
        method: 'GET'
      });

      if (response.ok) {
        setIsLoading(false);
        const taskData = await response.json();
        setTasks(taskData);
      }
      else {
        console.log('Failed to recieve data');
      }
    }

    catch (error) {
      console.log(error);
    }

  }



  useEffect(() => {
    fetchTasks();
  }, []);



  const addTask = async (e) => {

    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(
          {
            title: title,
            description: description,
            date: date,
            status: 0,
          }
        )

      });

      if (response.ok) {
        setTitle('');
        setDescription('');
        fetchTasks();
        alert('Task has been added');
      }
      else {
        console.log('Data sending failed');
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  const deleteTask = async (id, event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/tasks/' + id, {
        mode: 'cors',
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        fetchTasks();
      }
      else {
        console.log('Failed to delete data');
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const updateStatus = async (id, status, event, taskTitle, taskDescription, taskDate) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/tasks/' + id, {
        mode: 'cors',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDescription,
          date: taskDate,
          status: status
        })
      });

      if (response.ok) {
        setTasks(prevTasks => {
          return prevTasks.map(task => {
            if (task.id === id) {
              return { ...task, status: status };
            }
            return task;
          });
        });
        fetchTasks();
      }
      else {
        console.log('Failed to update status');
      }
    }
    catch (error) {
      console.log(error);
    }
  }




  const updateTask = async (id, event, title, description, date, status) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/tasks/' + id, {
        mode: 'cors',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description,
          date: date,
          status: status
        })
      });

      if (response.ok) {
        console.log(description);
        setTasks(prevTasks => {
          return prevTasks.map(task => {
            if (task.id === id) {
              return { ...task, title: title, description: description, date: date, status: status };
            }
            return task;
          });
        });
        alert('The task has been updated');
        fetchTasks();
      }
      else {
        console.log('Failed to update task');
      }
    }
    catch (error) {
      console.log(error);
    }

  }


  function toggleDescription(id) {
    setIsTaskListClicked(!isTaskListClicked);
    setTaskListId(id);
  }



  useEffect(() => {
    const count1 = countNoOfTask(0);
    const count2 = countNoOfTask(1);
    const count3 = countNoOfTask(2);
    setTodoCount(count1);
    setDoingCount(count2);
    setDoneCount(count3);
  }, [addTask, deleteTask, updateStatus]);

  function countNoOfTask(taskStatus) {
    let count = 0;
    tasks.forEach((task) => {
      if (task.status === taskStatus) {
        count++;
      }

    });

    return count;

  }

  const scrollThreshold = 20;

  window,addEventListener('mousemove',(e)=>{
    const mouseY = e.clientY;
    const viewHeight = window.innerHeight;

    if (mouseY < scrollThreshold) {
      const scrollAmount = 50;
      window.scrollBy(0, -scrollAmount);
    }
 
    if (mouseY > viewHeight - scrollThreshold) {
      const scrollAmount = 50;
      window.scrollBy(0, scrollAmount);
    }
  })



  // ...........................return statement.........................//


  return (
    <>
    {isLoading && (
      <div className="loading-animation">
      <img src="/images/1480.gif" alt="loading"/>
      </div>
    )}

{!isLoading && (
  <div className='h-p'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>

              <Main
                addTask={addTask}
                date={date}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                setDate={setDate}
                tasks={tasks}
              />
              <TaskTypes
                toDoCount={toDoCount}
                doingCount={doingCount}
                doneCount={doneCount}
                setTodoCount={setTodoCount}
                setDoingCount={setDoingCount}
                setDoneCount={setDoneCount}
                updateStatus={updateStatus}
              />
            </>

          } />

          <Route path="/todolist" element={
            <>
              <TodoList
                toDoCount={toDoCount}
                tasks={tasks}
                toggleDescription={toggleDescription}
                updateStatus={updateStatus}
                taskListId={taskListId}
                isTaskListClicked={isTaskListClicked}
                currentDate={currentDate}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            </>
          } />

          <Route path="/doinglist" element={
            <>
              <DoingList
                doingCount={doingCount}
                tasks={tasks}
                toggleDescription={toggleDescription}
                updateStatus={updateStatus}
                taskListId={taskListId}
                isTaskListClicked={isTaskListClicked}
                currentDate={currentDate}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            </>
          } />

          <Route path="/donelist" element={
            <>
              <DoneList
                doingCount={doneCount}
                tasks={tasks}
                toggleDescription={toggleDescription}
                updateStatus={updateStatus}
                taskListId={taskListId}
                isTaskListClicked={isTaskListClicked}
                currentDate={currentDate}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            </>
          } />

        </Routes>
      </BrowserRouter>
    </div>
)}
    
</>
  );
}

export default HomePage;
