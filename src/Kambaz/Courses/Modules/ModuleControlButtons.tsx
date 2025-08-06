import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";

export default function ModuleControlButtons({ 
  moduleId, 
  deleteModule,
  editModule  
}: { 
  moduleId: string; 
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void 
}) {
  return (
    <div className="float-end" style={{ zIndex: 10 }}>
       <FaPencil 
         onClick={() => {
           console.log("Edit clicked for module:", moduleId);
           editModule(moduleId);
         }} 
         className="text-primary me-3" 
         style={{ cursor: 'pointer' }}
       />

       <FaTrash 
         className="text-danger me-2 mb-1" 
         onClick={() => {
           console.log("Delete clicked for module:", moduleId);
           deleteModule(moduleId);
         }}
         style={{ cursor: 'pointer' }}
       />
       
      <GreenCheckmark />
      <BsPlus className="me-1 fs-2"/>
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}