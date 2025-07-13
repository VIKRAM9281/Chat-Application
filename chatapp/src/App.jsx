import { useState } from 'react';
import './App.css';
import Login from './forms/login';
import ChatRoom from './components/ChatRoom';

function App() {
const [isLogin,setisLogin]=useState(false)
const [screenName,setScreenName]=useState('')
  return (
    <>
    {isLogin ?(<ChatRoom screenName={screenName}/>):(<Login setisLogin={setisLogin} setScreenName={setScreenName}/>)}
    </>
  );
}

export default App;
