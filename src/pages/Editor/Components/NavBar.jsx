
import { Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import React, { useEffect, useState }  from 'react';
import {AiFillCloseCircle, AiFillMinusCircle,} from "react-icons/ai";
import {TbResize} from "react-icons/tb";
import TaskBar from './TaskBar';
import logo from "./icon.png"
import BreadCrumbs from './BreadCrumbs';

// const electron = window.require('electron');
// import { IpcRenderer } from 'electron';
// const {ipcRenderer} = electron;
// import createWindow from '../../../../public/main';
// import app  from "electron";

// function newFile

function newFile(fileName , content){
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

export default function EditorNavBar({Code , content , setFile ,  current_files , tab_name, current_tab_name}){

//   const [contents, setContents] = React.useState(content);
//   const [unsavedChanges, setUnsavedChanges] = React.useState(false);

//   React.useEffect(() => {
//     // Load content from local storage when the component mounts.
//     const savedContent = localStorage.getItem('fileContent');
//     if (savedContent) {
//       setContents(savedContent);
//     }
//   }, []);

    // React.useEffect(() => {handleContentChange()},[Code])

//   const handleContentChange = () => {
//     setContents(Code);
//     setUnsavedChanges(true);
//   };

//   const handleSaveClick = () => {
//     // Save the content to local storage and mark changes as saved.
//     localStorage.setItem('fileContent', contents);
//     setUnsavedChanges(false);
//   };

    // const [currentFile , setCurrentFile] = useState([]);

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
        
    //     if (file) {
    //       // Use the FileReader API to read the file content.
    //       const reader = new FileReader();
    //       reader.onload = (e) => {
    //         // e.target.result contains the file content.
    //         const content = e.target.result;
    //         // setCurrentFile([{name : file.name , code : content},...currentFile])
    //         setFile([{name : file.name , code  : content} , ...current_files])
    //         Code(content);
    //       };
    
    //       reader.readAsText(file);
    //       // window.preloadApi.fileContent((event , data) => {
    //       //   console.log("inside handle function")
    //       // });
    //     }
    //   };

    const file = React.useRef(null);

    return (
      <div style={{position : "sticky" , top : 0 ,left : 0,right : 0 , bottom : 10 , zIndex : 10}}>
        <div  className='bg-gray-800 flex justify-between pr-5 items-center  text-white border-b border-b-gray-700' >
        <div className='flex gap-4 pl-3 p-[0.5em] border-b border-gray-700'>
          <img src={logo} className='h-[1.5rem] w-[1.5rem]' style={{transform : "scaleX(-1)"}}></img>
            <Menu  menuStyle={{
                backgroundColor : "rgba(12,30,50)",
                color : "white",
            }} 
            
            
            menuButton={<MenuButton className={"hover:bg-gray-500 px-[0.5em] rounded-lg"}>File</MenuButton>}>
                <MenuItem
                  className={"hover:bg-gray-900"}
                  onClick={() => {
                    window.preloadApi.newFile();
                    window.preloadApi.newFileCreated((event  , filename , path) => {
                      Code("")
                      current_tab_name(filename)
                      setFile([{name : filename , path : path , code : ""},...current_files])

                    });
                  }}
                >
                    New File
                </MenuItem>
                <MenuItem
                    className={"hover:bg-gray-900"}
                    onClick = {() => {file.current.click();}}
                >
                  Open file
                </MenuItem>
                {/* <div className='w-10'><p>aksdjkasdjb</p></div> */}
                <MenuItem
                  className={"hover:bg-gray-900"}
                >Save</MenuItem>

            {/* <input ref={file} type='file' onChange={handleFileChange} className='hidden'/> */}
            <input ref={file} onClick={() => { 
              window.preloadApi.openFile(); 
              window.preloadApi.fileContent((event ,filename ,path , data) => {
                current_tab_name(filename)
                Code(data) ; 
                setFile([{name : filename , path : path, code : data},...current_files])
              })
              }} className='hidden'/>
            </Menu>
            <button>Run</button>
            {/* <Menu menuButton={<MenuButton className={"hover:bg-gray-900"}>Run</MenuButton>} onClick={() => console.log("run program")}/> */}
        </div>
        {/* <div onClick={() => {}}>
            <AiFillCloseCircle/>
        </div> */}
        <div className='flex gap-5'>

          <div onClick={()=> { window.preloadApi.minimize()}}>

              <AiFillMinusCircle/>
          </div>
          <div onClick={()=> window.preloadApi.unmaximize()}>
            {/* <AiFillBoxPlot/> */}
            <TbResize/>
          </div>

          <div onClick={()=> {
            window.preloadApi.close()
          }}>
             <AiFillCloseCircle/>
          </div>
        </div>
        </div>
        <TaskBar filenames={current_files} setFile={setFile} tab_name = {tab_name} setDisplayCode = {Code} setTabName = {current_tab_name}/>
        
        </div>
    );

}
