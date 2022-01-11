import React,{useEffect,useState} from 'react';
import {Avatar,IconButton}  from '@material-ui/core';
import {AttachFile,MoreVert,SearchOutlined,InsertEmoticon,Mic} from "@material-ui/icons";
import {useParams} from 'react-router-dom';
import db from '../firebase';
import firebase from 'firebase';
import {useStateValue} from '../store/StateProvider';
import getAvatar from '../api/ApiCall';
import "../css/Chat.css";


function Chat(){
	const [seed,setSeed]=useState('');
	const [input,setInput]=useState('');
	const {groupId} = useParams();
	const [groupName,setGroupName]=useState('');
	const [messages,setMessages]=useState('');
	const [{user},dispatch] = useStateValue();
	
	/*
	useEffect( () => {
		setSeed(getAvatar());
	},[]);
	*/
	useEffect( () => {
		if(groupId){
			db.collection('groups')
				.doc(groupId)
				.onSnapshot(snapshot => (
						setGroupName(snapshot.data().name)
			));
			setSeed(getAvatar(groupId));
			
			db.collection('groups').doc(groupId).
			collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot => (
					setMessages(snapshot.docs.map((doc) => doc.data()))
			));
		}
	},[groupId]);
	
	const sendMessage = (e) => {
		e.preventDefault();
		console.log("You typed >> ",input);
		
		db.collection('groups').doc(groupId).collection('messages').add({
			name:user.displayName,
			message:input,
			timestamp:firebase.firestore.FieldValue.serverTimestamp(),
		})
		
		setInput("");
	};
	
	const onChangeInput = (e) => {
		setInput(e.target.value);
	};
	
	const converterTimeStamp = (time) => {
		return time.split(' ')[4];
	}
	
	return (
			<div className="chat">
				<div className="chat_header">
					<Avatar src={seed} />
					<div className="chat_header_info">
						<h3>{groupName}</h3>
						<p>last seen{" "}{new Date(messages[messages.length-1] ?. timestamp ?.toDate()).toUTCString()}</p>
					</div>
					<div className="chat_header_right">
						<IconButton><SearchOutlined /></IconButton>
						<IconButton><AttachFile /></IconButton>
						<IconButton><MoreVert /></IconButton>
					</div>
				</div>
				<div className="chat_body">
					{
						messages ? (
							messages.map((message,index) => (
									<p className={message.name === user.displayName ? 'chat_message chat_receiver' : 'chat_message'} key={index}> 
										<span className="chat_name">{message.name}</span>
											{message.message}
										<span className="chat_timestamp">
											{converterTimeStamp(new Date(message.timestamp ?.toDate()).toUTCString())}
										</span>
									</p>
							))
						):(<p></p>)
					}
	
				</div>
				<div className="chat_footer">
					<InsertEmoticon />
					<form>
						<input value={input} onChange={onChangeInput} placeholder="Type a message" type="text" />
						<button type="submit" onClick={sendMessage}>Send a message </button>
					</form>
					<Mic />
				</div>
			</div>
	);
}

export default Chat;
