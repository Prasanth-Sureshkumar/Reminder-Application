import React from "react";
import { useNavigate} from "react-router-dom";

import "./stylesheet/Signup.css";
import home from "./image/home.png";


export default function Signup() {

    const navigate = useNavigate();
    const[username,setUserName] = React.useState('');
    const[password,setPassword] = React.useState('');

    const onChangeName = (e) => {
        setUserName(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const setCredential= () => {
        if((username.length) !== 0 && (password.length) !== 0){
            if(!!localStorage.getItem(username)) {
                alert("Username Already exsists!!");
                setUserName('');
                setPassword('');
            }
            else {
                const creds = { username:username,password:password}
                localStorage.setItem(username, JSON.stringify(creds));
                alert("Account created successfully!!");
                navigate("/",{ replace: true });
            }
        }
        else {
            alert("Enter the required feilds!!");
        }
    }
    
    return(
        <div className = "Singup">
            <h1 className = "sign_header">
                CREATE ACCOUNT NOW!!
            </h1>
            <br/>
            <div className = "sign_input_grid">
                <input 
                className = "input_sign"
                type = "text" 
                placeholder = "ENTER YOUR USERNAME" 
                value = {username} 
                onChange = {onChangeName}/>

                <br/>
                 
                <input 
                className = "input_sign" 
                type = "password" 
                placeholder = "ENTER YOUR PASSWORD" 
                value = {password} 
                onChange = {onChangePassword}/>
                 
                <br/> 

                <button 
                className = "register_button_signup" 
                onClick = {setCredential}>
                    REGISTER
                </button>

            </div>

            <img 
            src = {home} 
            className = "logout_button_signup" 
            onClick = {() => {navigate("/",{ replace: true })}}/>

        </div>
    );
}
