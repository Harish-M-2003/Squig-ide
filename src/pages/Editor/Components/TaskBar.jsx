import { useState } from "react";
import {AiFillCloseCircle} from "react-icons/ai";
import BreadCrumbs from "./BreadCrumbs";


export default function TaskBar({filenames , setFile, setDisplayCode , tab_name, setTabName}){

    const [selectedbtn , setSelectedBtn] = useState(0);

    function handleTaskNameChange(file , index){
        if (selectedbtn != index){
            setSelectedBtn(index);
            setTabName(file.name);
            setDisplayCode(file.code);
        }
    }

    return (
        <>
        <div className="text-white flex bg-gray-800">
            {
                filenames.map((file , index) => (
                    <div className={` flex items-center gap-2 border-gray-600 px-3 py-1 m-[0.25rem] ${(index !== selectedbtn)?"bg-gray-700":"bg-gray-900"}`}>
                        <div onClick={() => {
                            handleTaskNameChange(file , index)
                        }}className="text-blue-200">{file.name}</div>
                        <div onClick={() => {
                            filenames.map((value , index) => {
                                if (value.name == file.name){
                                    filenames.splice(index , 1);
                                    setFile([...filenames]);
                                    if (filenames.length !== 0){
                                        setTabName(filenames[0].name)
                                        setSelectedBtn(0)
                                        setDisplayCode(filenames[0].code)
                                    } else {
                                        setDisplayCode("")
                                    }                
                                }
                            })
                        }}><AiFillCloseCircle /></div>
                    </div>
                ))
            }
        </div>
        {
        (filenames.length !== 0)?
        <div>
            <BreadCrumbs path_segments={filenames} currentTab = {tab_name}/>
        </div>
        :
        <>  </>
        }
        </>
    );
}