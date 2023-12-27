import React from "react";
import { useNavigate } from "react-router-dom";
import addNotification from "react-push-notification";
import moment from "moment";

import "./stylesheet/Todo.css";
import logo from "./image/notification.png";
import handpng from "../src/image/handimage.png";
import logout from "./image/logout.png";

export default function Todo({onLogout}) {

  const token = JSON.parse(localStorage.getItem('token'));
  const key = "todoList"+token.username;

  const[work,setWork] = React.useState('');
  const [list, setlist] = React.useState(() => {
    const storedList = localStorage.getItem(key);
    return storedList ? JSON.parse(storedList) : [];
  });

  const[time,setTime] = React.useState('');
  const[showitem,setshow] = React.useState(false);
  const timeouts = React.useRef([]);
  const navigate = useNavigate();

  
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(list));
    setReminders();
  }, [list]);

  const setReminders = () => {
    timeouts.current.forEach((timeout) => clearTimeout(timeout));
    timeouts.current = [];
    list.forEach((item,index) => {
      const timeDifference = item.remainingtime - Date.now();
      if (timeDifference > 0) {
        const timeout = setTimeout(() => {
          addNotification( { 
            title:'REMAINDER',
            message:"Reminder!! you need to do "+item.work+" now",
            duration:7000,
            icon:logo,
            native:true});
          const newList = [...list];
          newList.splice(index,1);
          setlist(newList);
        }, timeDifference);
        timeouts.current.push(timeout);
      }

    });
  };

  const onWorkChange = (e) => {
    setWork(e.target.value);
  }

  const onTimeChange = (e) => {
    setTime(e.target.value);
  }

  const onShow = () => {
    setshow(!showitem);
  }

  const onAdd = () => {
    const currentTime = Date.now();
    const remainderTime = currentTime + time * 60 *1000;

    const temporary_variable = {
      work:work,
      time:time,
      remainingtime:remainderTime};

    if(work.length !== 0) {
      const updatedList = [...list,temporary_variable];
      setlist(updatedList);
      setWork('');
      setTime('');
    }
    else {
      alert("Enter the required feilds!!");
    }
  }

  const onDelete = () => {
    if(work.length !== 0){
      const new_array = list.filter((lis) => lis.work !== work);
      if(list.length === new_array.length) {
        alert("no element found");
      }
      setlist(new_array);
      setWork('');
    }
  }

  const onDeleteAll = () => {
    setlist([]);
  }

  const onClickHomeButton = () => {
    onLogout();
    navigate("/",{ replace: true });

  }

  return(
  <div className = "todo">
    <div>
    <h1 
    className = "todo_header">
      REMINDER!!
    </h1>
    <input 
    className = "todo_input_feild" 
    type = "text" 
    placeholder = "Type your work" 
    value = {work} 
    onChange = {onWorkChange}/>

    <input 
    className = "todo_input_feild" 
    type = "number" 
    placeholder = "Enter time in mins" 
    value = {time} 
    onChange = {onTimeChange}/>

    <br/>

    <button 
    className = "add_button"  
    onClick = {onAdd}>
      ADD WORK
    </button>

    <button 
    className = "delete_button"  
    onClick = {onDelete}>
      DELETE
    </button>

    <button 
    className = "show_button" 
    onClick = {onShow}>
      SHOW
    </button>

    <button 
    className = "delete_all_button" 
    onClick = {onDeleteAll}>
      DELETE ALL
    </button>
    
  <div className = "scroll_todo">
  {showitem && (
    <table className = "todolist">
      <thead>
        <tr>
          <th>LIST OF WORKS</th>
          <th>DEAD-LINE</th>
        </tr>
      </thead>
      <tbody>
        {list.map((lis, index) => (
          <tr key = {index}>
            <td>{lis.work}</td>
            <td>{moment(lis.remainingtime).format("LLL")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

</div>
  <div className = "hand_gif"> 
    <img  src = {handpng}
      alt = "this is" 
      width = "200px" 
      height = "100px"/>
  </div>
  <div className="logout_todo">
  <img 
    src = {logout}
    width = "50px" 
    height = "50px" 
    onClick = {onClickHomeButton}/>
    </div>
  </div>
  );
}
