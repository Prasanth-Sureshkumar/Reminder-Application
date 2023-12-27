import React from "react";
import { useNavigate } from "react-router-dom";

import "./stylesheet/Forgotpwd.css";
import forgotgif from "./image/forgotgif.gif";
import home from "./image/home.png";


export default function Forgotpwd(){

    const navigate = useNavigate();
    const[username,setUsername] = React.useState('');
    const[password,setPassword] = React.useState('');
    const[reentered_password,setRenteredPassword] = React.useState('');

    const onUserNameChange = (e) => {
        setUsername(e.target.value);
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const onReenteredPasswordChange = (e) => {
        setRenteredPassword(e.target.value);
    }

    const setNewPassword=()=>{
        if((username.length) !==0 && 
           (password.length) !==0 && 
           (reentered_password.length) !== 0) { 
            if(password === reentered_password) {
                const creds = { username:username , password:password }
                localStorage.setItem(username,JSON.stringify(creds));
                alert("New password changed successfully!!");
                navigate("/",{ replace: true });
            }
            else {
                alert("Password's doesn't match");
            }
        }
        else {
            alert("Enter the required feilds!!");
        }
    }
    return(
        <div className = "Forgotpassword">
            <h1 className = "forgot_password_header">
                FORGOT YOUR PASSWORD!!
            </h1>

            <br/>

            <div className = "forgot_password_inputgrid">

                <input 
                className = "input_feild_forgotpassword" 
                type = "text" 
                placeholder = "ENTER YOUR USERNAME" 
                value = {username} 
                onChange = {onUserNameChange}/>
                
                <br/>

                <input 
                className = "input_feild_forgotpassword" 
                type = "password" 
                placeholder = "ENTER YOUR NEW PASSWORD" 
                value = {password} 
                onChange = {onPasswordChange}/>

                <br/>

                <input 
                className = "input_feild_forgotpassword" 
                type = "password" 
                placeholder = "RE-ENTER YOUR NEW PASSWORD" 
                value = {reentered_password} 
                onChange = {onReenteredPasswordChange}/>

                <br/> 

                <button 
                className = "register_button_forgotpassword"
                onClick = {setNewPassword}>
                    CHANGE
                </button>

            </div>

            <img  
            src = {forgotgif}
            className = "background_gif_forgotpassword"/>

            <img src = {home} 
            className = "homebutton_forgotpassword" 
            onClick = {() => {navigate("/",{ replace: true })}}/>
        </div>
    );
}
