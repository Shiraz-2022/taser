/* eslint-disable react/prop-types */
import './homepage.css'
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function Main(props) {

  return (
    <div>
      <div className='h-p-main'>
        {(!props.isToDoVisible && !props.isDoingVisible && !props.isDoneVisible) && (
          <div className='h-p-header'>
            <h1>TASER</h1>
            <h4>The ultimate task manager</h4>
          </div>
        )}

        <div className='h-p-task-creator'>
          <h1>Add New Task</h1>
          <form onSubmit={props.addTask}>
            <input className='h-p-task-creator-title' placeholder='title' value={props.title} onChange={(e) => { props.setTitle(e.target.value) }} required />
            <input className='h-p-task-creator-description' placeholder='description' value={props.description} onChange={(e) => { props.setDescription(e.target.value) }} />
            <div className='date-picker'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={props.date}
                  onChange={(date) => props.setDate(date)}
                />
              </LocalizationProvider>
            </div>
            <button type='submit'>Add task</button>

          </form>
        </div>
      </div>

    </div>
  )
}

export default Main;