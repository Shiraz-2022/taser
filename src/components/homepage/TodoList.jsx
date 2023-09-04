/* eslint-disable react/prop-types */
import {useState} from 'react';
import dayjs from 'dayjs';
import './homepage.css';
import EditTask from './EditTask';

function TodoList(props) {

  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState();

  function editTask(id) {
    setIsEditing(!isEditing);
    setEditingTaskId(id);
  }

  function handleDragStart(e,task){
    e.dataTransfer.setData('task', task);
    window.history.pushState(null, null, '/');
  }

  
  return (
    <>
    {!isEditing && (
      <div className='h-p-tasklist-container'>
        <a href='/'><img href='/' onClick={props.toDoVisible} className='h-p-tasks-cross-image' src='/images/icons8-cross-50.png' alt='cross' /></a>

        <div className='h-p-tasks-todo  h-p-task-type'>

          {(props.toDoCount === 0 || props.tasks.length === 0) && (

            <div className='task-list-empty'>
              <h3>There is nothing to do</h3>
            </div>
          )}


          {props.tasks.map((task) => {
            if (task.status === 0 && props.toDoCount !== 0) {
              return (

                <div className='h-p-todolist  h-p-tasklist' key={task.id} onClick={() => props.toggleDescription(task.id)} draggable onDragStart={(e) => handleDragStart(e, JSON.stringify(task))}>

                  <div className='h-p-todolist-main h-p-tasklist-main'>
                    <div className='h-p-todolist-main-title h-p-tasklist-main-title'>
                      <input type='checkbox' onClick={(event) => props.updateStatus(task.id, 2, event, task.title, task.description, task.date)} />
                      <h3>{task.title}</h3>
                    </div>
                    <p>{dayjs(task.date).format('YYYY-MM-DD')}</p>

                  </div>
                  {(task.id == props.taskListId && props.isTaskListClicked) &&

                    <div className='h-p-todolist-on-click h-p-tasklist-on-click'>
                      <p>{task.description}</p>
                      {dayjs(task.date).isBefore(props.currentDate) && (
                        <p><span>The task deadline is over</span></p>
                      )}

                      <div className='h-p-tasklist-on-click-buttons'>
                        <button onClick={(event) => props.deleteTask(task.id, event)}>Delete</button>
                        <button onClick={(event) => props.updateStatus(task.id, 1, event, task.title, task.description, task.date)}>start task</button>
                        <button onClick={() => {setEditingTaskId(task.id); setIsEditing(!isEditing)}}>Edit</button>
                      </div>
                    </div>
                  }



                </div>
              );
            }


          })}


        </div>
      </div>
    )}

      {isEditing && editingTaskId && (
        <EditTask
          tasks={props.tasks}
          editTask={editTask}
          editingTaskId={editingTaskId}
          isEditing={isEditing}
          updateTask={props.updateTask}

        />
      )}
    </>
  );
}

export default TodoList;