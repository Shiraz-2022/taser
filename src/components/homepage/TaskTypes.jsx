/* eslint-disable react/prop-types */

function TaskTypes(props) {

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  function handleDrop(e, status) {
    e.preventDefault();
    const task = e.dataTransfer.getData('task');
    const taskObject = JSON.parse(task);
    props.updateStatus(taskObject.id, status, e, taskObject.title, taskObject.description, taskObject.date);
  }



  return (
    <>
      {!props.isEditing && (
        <div className='h-p-task-types'>

          <div className='h-p-tasks-todo-main h-p-task' onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 0)}>
            <h2>To do</h2>
            <h4>No of tasks: {props.toDoCount}</h4>
            <a href="/todolist"><button>View all tasks</button></a>
          </div>

          <div className='h-p-tasks-doing-main h-p-task' onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 1)}>
            <h2>Doing</h2>
            <h4>No of tasks: {props.doingCount}</h4>
            <a href="/doinglist"><button onClick={props.doingVisible}>View all tasks</button></a>
          </div>

          <div className='h-p-tasks-done-main h-p-task' onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 2)}>
            <h2>Done</h2>
            <h4>No of tasks: {props.doneCount}</h4>
            <a href="/donelist"><button onClick={props.doneVisible}>View all tasks</button></a>
          </div>

        </div>
      )}
    </>
  );
}

export default TaskTypes;