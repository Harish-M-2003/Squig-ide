import React, { useEffect, useRef, useState } from 'react';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import EditorNavBar from './Components/NavBar';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import logo from "./Components/icon.png";
import { AiFillCloseCircle, AiFillMinusCircle } from 'react-icons/ai';
import { TbResize } from 'react-icons/tb';



export default function WorkSpace() {

  const [code, setCode] = React.useState("");
  const [files , setFiles] = useState([]);
  const [currentTabName , setCurrentTabName] = useState('');

  function handleCode(program){
    
    files.map((value , index) => {
      if (value.name === currentTabName){
        value.code = program;
      }
    })

    setCode(program)
  }

  const [setUpCompleted , setSetUpCompleted] = useState(!false);

  // useEffect(()=>{
  //   setTimeout(() => {
  //     setSetUpCompleted(true)
  //   } , 2500)
  // },[])

  const editor = useRef(null);

  window.addEventListener("keydown" , event => {
    
    if (event.key == "q" && event.ctrlKey){
      window.preloadApi.close();
    } 
  })

  return (
    <div className='bg-gray-800' onKeyDown={
      (event)=>{
        if (event.key === "o" && event.ctrlKey){
          window.preloadApi.openFile()
          window.preloadApi.fileContent((event ,filename ,path , data) => {
            setCurrentTabName(filename)
            setCode(data) ; 
            setFiles([{name : filename , path : path, code : data},...files])
          })
        }
      }}>
    {(!setUpCompleted)?
    <div>
    <div className='text-white flex flex-row-reverse px-3 py-2 gap-5'>
      <div onClick={()=> window.preloadApi.close()}>
        <AiFillCloseCircle/>
      </div>
      <div className='text-gray-600'>
        <TbResize/>
      </div>
      <div onClick={()=>window.preloadApi.minimize()}>
        <AiFillMinusCircle/>
      </div>
    </div>
    <div  style={{backgroundColor : "rgb(14,42,53)"}}className='flex justify-center gap-10 items-center h-screen flex-col'>
      <img src={logo} style={
        {
          height : "50vh",
          opacity : 0.5,
          transform : "scaleX(-1)"
        }
      }/>
      
      <span className='text-white font-bold text-8xl' style={{fontFamily : "Open Sans"}}>SQUIG</span>
    </div>
    </div>
      :
      <div className='h-screen bg-gray-900' onLoad={()=>  window.preloadApi.unmaximize()}>

      <EditorNavBar 
          Code = {setCode} 
          content = {code} 
          setFile = {setFiles} 
          current_files = {files}
          tab_name = {currentTabName}
          current_tab_name = {setCurrentTabName}
      />
      
    <div className='flex overflow-scroll'>

    <AceEditor

      ref={editor}
      setOptions={{
        vScrollBarAlwaysVisible : true,
      }}

      style={{
        width : window.screen.width / 0.9,
        height : "100vh",
        color : "white",

      }}
    
      className='bg-gray-900'
      fontSize={20}      
      mode="python"
      value={code}
      theme="solarized_dark"
      onChange={handleCode}
      highlightActiveLine = {true}
      enableLiveAutocompletion = {true}
      
  />
      
    
    </div>
    
    </div>
}
  </div>
  );
}