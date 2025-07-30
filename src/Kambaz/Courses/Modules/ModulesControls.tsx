import ModuleEditor from "./ModuleEditor";
import { FaPlus } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import GreenCheckmark from "./GreenCheckmark";
import { useState } from "react";

export default function ModulesControls({ moduleName, setModuleName, addModule }: { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
  
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
  
  return (
    <div id="wd-modules-controls" className="text-nowrap float-end">
      {/* Collapse All Button */}
      <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-2">
        Collapse All
      </button>

      {/* View Progress Button */}
      <button id="wd-view-progress" className="btn btn-lg btn-secondary me-2">
        View Progress
      </button>

      {/* Publish All Dropdown */}
      <div className="dropdown d-inline me-2">
        <button
          id="wd-publish-all-btn"
          className="btn btn-lg btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          <GreenCheckmark /> Publish All
        </button>
        <ul className="dropdown-menu">
          <li>
            <a id="wd-publish-all-modules-and-items" className="dropdown-item" href="#">
              <GreenCheckmark /> Publish all modules and items
            </a>
          </li>
          <li>
            <a id="wd-publish-modules-only" className="dropdown-item" href="#">
              <GreenCheckmark /> Publish modules only
            </a>
          </li>
          <li>
            <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#">
              <IoIosCloseCircleOutline /> Unpublish all modules and items
            </a>
          </li>
          <li>
            <a id="wd-unpublish-modules-only" className="dropdown-item" href="#">
              <IoIosCloseCircleOutline /> Unpublish modules only
            </a>
          </li>
        </ul>
      </div>

      {/* + Module Button */}
      <button onClick={handleShow} id="wd-add-module-btn" className="btn btn-lg btn-danger">
        <FaPlus className="me-2 position-relative" style={{ bottom: "1px" }} />
        Module
      </button>
      <ModuleEditor 
  show={show} 
  handleClose={handleClose} 
  dialogTitle="Add Module"
  moduleName={moduleName} 
  setModuleName={setModuleName} 
  addModule={addModule} 
/>
    </div>
  );
}