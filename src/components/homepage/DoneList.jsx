/* eslint-disable react/prop-types */
import './homepage.css';
import dayjs from 'dayjs';
import EditTask from './EditTask';
import { useState } from 'react';
import TaskTypes from './TaskTypes';

function DoneList(props) {

  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState();

  function editTask(id) {
    setIsEditing(!isEditing);
    setEditingTaskId(id);
  }

  function handleDragStart(e, task) {
    e.dataTransfer.setData('task', task);
  }


  return (
    <>
      {!isEditing && (
        <>
        <div className='h-p-tasklist-container'>
          <a href="/"><img onClick={props.doneVisible} className='h-p-tasks-cross-image' src='/images/icons8-cross-50.png' alt='cross' /></a>
          <h2>Done</h2>
          <div className='h-p-tasks-done h-p-task-type'>


            {(props.doneCount === 0 || props.tasks.length === 0) && (

              <div className='task-list-empty'>
                <h3>No tasks are done</h3>
              </div>
            )}

            {props.tasks.map((task) => {
              if (task.status === 2 && props.doneCount !== 0) {
                return (

                  <div className='h-p-doinglist  h-p-tasklist' key={task.id} onClick={() => props.toggleDescription(task.id)} draggable onDragStart={(e) => handleDragStart(e, JSON.stringify(task))}>
                    <div className='h-p-doinglist-main h-p-tasklist-main'>
                      <div className='h-p-doinglist-main-title h-p-tasklist-main-title'>
                        <input type='checkbox' onClick={(event) => props.deleteTask(task.id, event)} />
                        <h3>{task.title}</h3>
                      </div>
                      <p>{dayjs(task.date).format('YYYY-MM-DD')}</p>

                    </div>
                    {(task.id == props.taskListId && props.isTaskListClicked) &&

                      <div className='h-p-doinglist-on-click h-p-tasklist-on-click'>
                        <p>{task.description}</p>

                        <div className='h-p-tasklist-on-click-buttons'>
                          <button onClick={(event) => props.deleteTask(task.id, event)}>Delete</button>
                          <button onClick={() => { setEditingTaskId(task.id); setIsEditing(!isEditing) }}>Edit</button>
                        </div>
                      </div>
                    }

                  </div>

                );
              }


            })}




          </div>
        </div>

        <TaskTypes
                toDoCount={props.toDoCount}
                doingCount={props.doingCount}
                doneCount={props.doneCount}
                setTodoCount={props.setTodoCount}
                setDoingCount={props.setDoingCount}
                setDoneCount={props.setDoneCount}
                updateStatus={props.updateStatus}
      />
      </>
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

export default DoneList;