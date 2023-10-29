import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
// import 'prismjs/components/'
import 'prismjs/themes/prism.css'; //Example style, you can use another

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
  const [opacity , setOpacity] = useState(0.5);

  function handleCode(program){
    
    files.map((value , index) => {
      if (value.name === currentTabName){
        value.code = program;
      }
    })

    setCode(program)
  }

  const [setUpCompleted , setSetUpCompleted] = useState(false);

  useEffect(()=>{
    setTimeout(() => setSetUpCompleted(true) , 2500)
  },[])

  // useEffect(() => console.log(files),[code])

  return (
    <div style={{backgroundColor : "rgb(14,42,53)"}}>
    {(!setUpCompleted)?
    <>
    <div className='text-white flex flex-row-reverse px-3 pt-2 gap-5'>
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
    <div style={{background : "rgb(14, 42, 53)"}} className='flex justify-center gap-10 items-center h-screen flex-col'>
      <img src={logo} style={
        {
          height : "50vh",
          opacity : 0.5,
          transform : "scaleX(-1)"
        }
      }/>
      
      <span className='text-white font-bold text-8xl' style={{fontFamily : "Open Sans"}}>SQUIG</span>
    </div>
    </>
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

      style={{
        width : window.screen.width / 0.9,
        height : "100vh",
        color : "white",
      }}
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