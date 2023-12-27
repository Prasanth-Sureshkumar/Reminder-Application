import React from "react";
import { useNavigate } from "react-router-dom";

import "./stylesheet/Login.css"

const Login = ({onLogin}) => {

    const [username, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
 
    const onChangeName = (e) => {
        setUserName(e.target.value);        
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const checkCredentials = () => {
        const storedCreds = JSON.parse(localStorage.getItem(username));
        if(username.length !== 0 || password.length !== 0) {
            if (password === storedCreds.password) {
                onLogin(username);
                navigate('/Todo');
            } 

            else {
                alert("Invalid Username or Password!!");
            }
        }
        else {
            alert("Enter the credentials!!");
        }
    }


    return (
            <div className = "Login">
                <h1 className = "login_header">
                    WELCOME TO LOGIN PAGE
                </h1>
                <br/>
                <div className = "login_division">

                    <input 
                    type = "text" 
                    placeholder = "ENTER YOUR USERNAME" 
                    value = {username} 
                    onChange = {onChangeName} 
                    className = "input_Login"/>

                    <br/>

                    <input 
                    type = "password" 
                    placeholder = "ENTER YOUR PASSWORD" 
                    value = {password} 
                    onChange = {onChangePassword} 
                    className = "input_Login"/>

                    <br/>

                    <button 
                    className = "forgot" 
                    onClick= {() => navigate("/Forgotpwd")}>
                        forgot password?
                    </button>

                    <br/>

                    <button 
                    className = "login_button" 
                    onClick = {checkCredentials}>
                        LOGIN
                    </button>

                    <button 
                    className = "Sign_button" 
                    onClick= {() => navigate("/Signup")}>
                        CREATE ACCOUNT
                    </button>

                </div>

            </div>
    );        
}

export default Login;
