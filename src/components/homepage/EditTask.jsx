/* eslint-disable react/prop-types */
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './homepage.css'



function EditTask(props){
  return(
    <div className='h-p-editing-container'>
      <img onClick={()=>{props.editTask(props.editingTaskId)}} className='h-p-tasks-cross-image' src='/images/icons8-cross-50.png' alt='cross' />

      {props.tasks.map((task) => (
        <div key={task.id}>
          {task.id === props.editingTaskId && (
            <form>
              <input placeholder='title' className='h-p-editing-title' defaultValue={task.title} onChange={(e) => { task.title = e.target.value }} />
              <input placeholder='description' className="h-p-editing-description" defaultValue={task.description} onChange={(e) => { task.description = e.target.value }} />
              <div className='date-picker'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(task.date)}
                    onChange={(date) => task.date = date}
                  />
                </LocalizationProvider>
              </div>
              <button onClick={(event) => props.updateTask(task.id, event, task.title, task.description, dayjs(task.date), task.status)}>Update task</button>
            </form>
          )}
        </div>

      ))}
    </div>
  );
}


export default EditTask;