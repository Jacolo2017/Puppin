import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

(async () =>{
    const eventDataResponse = await fetch(`${process.env.REACT_APP_EVENTS_HOST}/api/events`);
    if(eventDataResponse.ok){
      const eventData = await eventDataResponse.json();
      root.render(
        <React.StrictMode>
          <App
          events={eventData}
          />
        </React.StrictMode>
      )
    }
})