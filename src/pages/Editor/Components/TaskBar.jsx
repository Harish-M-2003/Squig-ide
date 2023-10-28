import { useState } from "react";
import {AiFillCloseCircle} from "react-icons/ai";


export default function TaskBar({filenames , setDisplayCode , setTabName}){

    const [selectedbtn , setSelectedBtn] = useState(0);

    function handleTaskNameChange(file , index){
        if (selectedbtn != index){
            setSelectedBtn(index);
            setTabName(file.name);
            setDisplayCode(file.code);
        }
    }

    return (
        <div className="text-white flex bg-gray-800">
            {
                filenames.map((file , index) => (
                    <div className={` flex items-center gap-2 border-gray-600 px-3 py-1 ${(index !== selectedbtn)?"bg-gray-800":"bg-gray-900"}`}>
                        <div onClick={() => handleTaskNameChange(file , index)}className="text-blue-200">{file.name}</div>
                        <div ><AiFillCloseCircle /></div>
                    </div>
                ))
            }
        </div>
    );
}