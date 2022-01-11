import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
import {StateProvider} from './store/StateProvider';
import reducer,{initialState} from './reducer';

import App from './App';


ReactDOM.render(
		<React.StrictMode>
			<StateProvider initialState={initialState} reducer={reducer}>
				<App />
			</StateProvider>
		</React.StrictMode>
,document.getElementById("root"));
registerServiceWorker();
