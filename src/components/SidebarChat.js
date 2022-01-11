import React,{useEffect,useState} from 'react';
import '../css/SidebarChat.css';
import {Avatar,IconButton}  from '@material-ui/core';
import db from '../firebase';
import {Link} from 'react-router-dom';
import getAvatar from '../api/ApiCall';

function SidebarChat({id,name,addNewChat}){
	const [seed,setSeed]=useState('');
	const [messages,setMessages]=useState('');
	
	useEffect( () => {
		let randomNumber =Math.floor(Math.random() * 5000 );
		setSeed("https://avatars.dicebear.com/api/human/"+randomNumber+".svg");
		
	},[])
	
	useEffect( () => {
		if(id){
			db
			.collection('groups')
			.doc(id)
			.collection("messages")
			.orderBy('timestamp','desc')
			.onSnapshot(snapshot => (
					setMessages(snapshot.docs.map((doc) => doc.data()))
			));
		}
	},[id]);

	const createChat = () => {
		const groupName = prompt("Please renter name for chat group");
		if(groupName){
			db.collection('groups').add({
				name:groupName
			})
		}
	};
	return !addNewChat ? (
			<Link to={"/groups/"+id} >
				<div className="sidebarChat">
					<Avatar src={getAvatar(id)} />
					<div className="sidebarChat_info">
						<h2>{name}</h2>
						<p>{messages[0]?.message}</p>
					</div>
				</div>
			</Link>
	) : (
			<div className="sidebarChat" onClick={createChat}>
					<h2>Add New Chat</h2>
			</div>
	)
}

export default SidebarChat;
