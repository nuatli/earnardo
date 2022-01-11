import React,{useState,useEffect}from 'react';
import {Button} from '@material-ui/core';
import logo from '../assets/avatar.png';
import '../css/Login.css';
import {auth,provider} from '../firebase';
import {actionTypes} from '../reducer';
import {useStateValue} from '../store/StateProvider';

function Login() {
	const [,dispatch] = useStateValue();
	const signInWtihGoogle = () => {
		auth.signInWithPopup(provider)
		.then((result) => {
				dispatch({type:actionTypes.SET_USER,user:result.user})
			}
		).cathc((error) => console.error(error.message));
	};
	
	const signInAnonim = () => {
		try{
			const displayName = prompt("Please renter displayName for chat group");
			dispatch({type:actionTypes.SET_USER,user:{displayName}});
		}catch(error){
			console.error(error);
		}
	};
	
	return (
			<div className="login">
				<div className="login_container">
					<img  src={logo} alt="Jiraiya" />
					<div className="login_text"> <h1> Sign in to WhatsApp </h1> </div>
					<div className="login_buttons"> 
						<Button onClick={signInWtihGoogle}> Sign In With Google </Button>
						<Button style={{backgroundColor:"cadetblue"}} onClick={signInAnonim}> Sign In With Name </Button>
					</div>
				</div>	
			</div>
	);
}

export default Login;
