import React,{useEffect,useState} from 'react';
import '../css/Sidebar.css';
import {Avatar,IconButton}  from '@material-ui/core';
import {DonutLarge,Chat,MoreVert,SearchOutlined} from "@material-ui/icons";
import SidebarChat from './SidebarChat';
import db from '../firebase';
import {useStateValue} from '../store/StateProvider'; 


function Sidebar(){
	const [{user},dispatch] = useStateValue();
	const [groups,setGroups] = useState([]);
	useEffect( () => {
		const unsubscribe = db.collection('groups').onSnapshot(snapshot => {
			setGroups(snapshot.docs.map( (doc) => ({
					id:doc.id,
					data:doc.data(),
				}))
			);
		});
		
		return () => {
			unsubscribe();
		}
		
	},[]);
	
	return (
			<div className="sidebar">
				<div className="sidebar_header">
					<Avatar src={user?.photoURL}/>
					<div className="sidebar_header_displayName">{user.displayName}</div>
					<div className="sidebar_headerRight">
						<IconButton><DonutLarge /></IconButton>
						<IconButton><Chat /></IconButton>
						<IconButton><MoreVert /></IconButton>
					</div>
				</div>
				<div className="sidebar_search">
					<div className="sidabar_searchContainer">
						<SearchOutlined />
						<input placeholder="Search or Start new Chat" type="text"/>
					</div>
				</div>
				<div className="sidebar_chats">
					<SidebarChat addNewChat />
					{
						groups.map(group =>(
							<SidebarChat key={group.id} id={group.id} name={group.data.name} />
						))	
					}
				</div>
			</div>
	);
}

export default Sidebar;
