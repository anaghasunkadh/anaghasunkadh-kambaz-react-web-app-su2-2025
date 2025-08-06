import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup, FormControl, Button } from "react-bootstrap";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import GreenCheckmark from "./GreenCheckmark";
import ModulesControls from "./ModulesControls";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

 // Delete module from server
const removeModule = async (moduleId: string) => {
  await coursesClient.deleteModule(cid as string, moduleId);  // Make sure cid is passed here
  dispatch(deleteModule(moduleId));
};
// Save module to server
const saveModule = async (module: any) => {
  await coursesClient.updateModule(cid as string, module);  // Make sure cid is passed here
  dispatch(updateModule(module));
};


  const createModuleForCourse = async () => {
    try {
      if (!cid || !moduleName.trim()) {
        console.log("Cannot add module: missing course ID or module name");
        return;
      }

      setLoading(true);
      console.log("Creating new module:", { name: moduleName, course: cid });

      // Create a local module object with a temporary ID
      const tempModule = {
        _id: "temp-" + Date.now(),
        name: moduleName.trim(),
        title: moduleName.trim(), // Add both for compatibility
        course: cid,
        lessons: []
      };

      // Immediately add to Redux for instant UI feedback
      dispatch(addModule(tempModule));

      // Then send to backend
      try {
        const savedModule = await coursesClient.createModuleForCourse(cid, {
          name: moduleName.trim(),
          course: cid
        });

        console.log("Module saved to backend:", savedModule);

        // Replace temp module with the one from backend
        if (savedModule && savedModule._id) {
          dispatch(updateModule({
            ...savedModule,
            course: cid // Ensure course ID is set
          }));
        }
      } catch (error) {
        console.error("Error saving module to backend:", error);
        // Module still shows in UI from the first dispatch
      }

      // Clear input field
      setModuleName("");
    } catch (error) {
      console.error("Error in createModuleForCourse:", error);
    } finally {
      setLoading(false);
    }
  };


  console.log("Current modules in Redux:", modules);
  console.log("Current course ID:", cid);

  useEffect(() => {
    if (cid) {
      fetchModules();
    }
  }, [cid]);

  const fetchModules = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching modules for course:", cid);

      const fetchedModules = await coursesClient.findModulesForCourse(cid as string);
      console.log("Modules fetched successfully:", fetchedModules);

      if (!fetchedModules || !Array.isArray(fetchedModules)) {
        console.error("Received invalid modules data:", fetchedModules);
        return;
      }

      // Add course ID to each module if it's missing
      const modulesWithCourseId = fetchedModules.map(module => ({
        ...module,
        course: module.course || cid
      }));

      console.log("Dispatching modules to Redux:", modulesWithCourseId);
      dispatch(setModules(modulesWithCourseId));
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleAddModule = () => {
  //   if (moduleName.trim()) {
  //     const newModule = {
  //       _id: "m" + Date.now(),
  //       title: moduleName.trim(),
  //       course: cid,
  //       lessons: []
  //     };
  //     dispatch(addModule(newModule));
  //     setModuleName("");
  //   }
  // };

  // Show ALL modules to check if filtering is the issue
  const allModules = modules;
  console.log("All modules:", allModules);

  // Try different filtering approaches
  const courseModules = modules.filter((module: any) => {
    console.log("Checking module:", module, "against course:", cid);
    const match = module.course === cid || module.courseId === cid;
    console.log("Match result:", match);
    return match;
  });

  console.log("Filtered modules for this course:", courseModules);

  // FOR TESTING: If no modules match the filter, show all modules
  const displayModules = courseModules.length > 0 ? courseModules : modules;

  return (
    <div className="wd-modules">
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={createModuleForCourse}
      />

      <h3>Modules for Course: {cid}</h3>
      <p>Total Modules in Redux: {modules.length}</p>
      <p>Filtered Modules: {courseModules.length}</p>

      {loading ? (
        <div className="text-center p-4">Loading modules...</div>
      ) : error ? (
        <div className="alert alert-danger">
          {error} <Button variant="outline-danger" size="sm" onClick={fetchModules}>Retry</Button>
        </div>
      ) : displayModules.length === 0 ? (
        <div>
          <div className="alert alert-info">
            No modules found for this course. Add a new module to get started.
          </div>

          <div className="mt-4">
            <h5>Debug Information</h5>
            <pre style={{ fontSize: '12px', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
              {JSON.stringify({
                courseId: cid,
                modulesInRedux: modules.length,
                moduleExampleIfAny: modules.length > 0 ? modules[0] : null,
                filteringWorked: courseModules.length > 0
              }, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <>
          <ListGroup id="wd-modules" className="rounded-0">
            {displayModules.map((module: any) => (
              <ListGroup.Item className="wd-module p-0 mb-3 fs-5 border-gray" key={module._id || module.id}>
                <div className="wd-title p-3 ps-2 bg-secondary text-white">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && (module.title || module.name)}
                  {module.editing && (
                    <FormControl className="w-50 d-inline-block"
                      value={module.title || module.name}
                      onChange={(e) =>
                        dispatch(
                          updateModule({
                            ...module,
                            title: e.target.value,
                            name: e.target.value
                          })
                        )
                      }
                      onKeyDown={async (e) => {
  if (e.key === "Enter") {
    const target = e.target as HTMLInputElement;
    const newValue = target.value;

    const updatedModule = {
      ...module,
      editing: false,
      name: newValue,
      title: newValue
    };

    await saveModule(updatedModule);
  }
}}
                    />
                  )}
                  <ModuleControlButtons
                    moduleId={module._id || module.id}
                    deleteModule={(moduleId) => removeModule(moduleId)}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                </div>
                {(module.lessons && module.lessons.length > 0) && (
                  <ListGroup className="wd-lessons rounded-0">
                    {module.lessons.map((lesson: any, j: number) => (
                      <ListGroup.Item className="wd-lesson p-3 ps-3" key={j}>
                        <BsGripVertical className="me-2 fs-5" />
                        <GreenCheckmark />
                        {typeof lesson === 'string' ? lesson : (lesson.name || lesson.title || 'Unnamed Lesson')}
                        <LessonControlButtons />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
}