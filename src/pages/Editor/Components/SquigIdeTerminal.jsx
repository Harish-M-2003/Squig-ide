// import { ReactTerminal } from "react-terminal";
// import { TerminalContextProvider } from "react-terminal";

// export default function Example(props) {
//   // Define commands here
//   const commands = {
//     whoami: "jackharper",
//     cd: (directory) => `changed path to ${directory}`
//   };

//   return (  
//     <TerminalContextProvider>
//         <ReactTerminal
//   commands={commands}

//   welcomeMessage = {<p>Squig version 0.0.1</p>}
// //   prompt = {false}
//   showControlBar = {false}
//   themes={{
//     "my-custom-theme": {
//       themeBGColor: "#272B36",
//       themeToolbarColor: "#DBDBDB",
//       themeColor: "#FFFEFC",
//       themePromptColor: "#a917a8"
//     }
//   }}
//   theme="my-custom-theme"
// />
//     </TerminalContextProvider>
    
//   );
// }

import React , {useEffect, useState} from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

export default function SquigIDETerminal({executedOutput , setTerminalOutput}){
  const [terminalLineData, setTerminalLineData] = useState(executedOutput);
  const [prompt , setPrompt ] = useState(null); 
  // Terminal has 100% width by default so it should usually be wrapped in a container div

  function handleUserInput(command) {
    if (command === "exit"){
      setTerminalOutput(null)
    } else {
      
        setTerminalLineData(executedOutput)
      }
    }
  

  function setTermialPrompt(){
    window.preloadApi.getRootPath();
    window.preloadApi.setRootPath((event , path) => {
      setPrompt(path + " >")
    })
  }

  useEffect(()=>{setTermialPrompt()},[])

  return (
    <div id='squig-terminal' className=" w-screen h-[100%]">
      <Terminal  
        redBtnCallback={() => {
           setTerminalOutput(null)
        }}
        onInput={handleUserInput}
        height='82vh'
        prompt={prompt}
    >
        <TerminalOutput>{terminalLineData}</TerminalOutput>
      </Terminal>
    </div>
  )
};