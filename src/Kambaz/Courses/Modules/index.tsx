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
import { modules as localModules } from "../../Database";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  // Helper functions for persistent local module edits
  const getLocalEditsKey = () => `moduleEdits_${cid}`;

  const saveModuleEdit = (moduleId: string, editedData: any) => {
    const key = getLocalEditsKey();
    const existingEdits = JSON.parse(localStorage.getItem(key) || '{}');
    existingEdits[moduleId] = editedData;
    localStorage.setItem(key, JSON.stringify(existingEdits));
    console.log("💾 Saved module edit to localStorage:", moduleId, editedData);
  };

  const getModuleEdits = () => {
    const key = getLocalEditsKey();
    return JSON.parse(localStorage.getItem(key) || '{}');
  };

  const resetModuleToOriginal = (moduleId: string) => {
    console.log("🔄 Resetting module to original:", moduleId);
    const key = getLocalEditsKey();
    const existingEdits = JSON.parse(localStorage.getItem(key) || '{}');
    delete existingEdits[moduleId];
    localStorage.setItem(key, JSON.stringify(existingEdits));
    // Refresh modules to show original content
    fetchModulesForCourse();
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };
  console.log("Remove module function:", removeModule);

  const fetchModulesForCourse = async () => {
    if (!cid) return;

    try {
      console.log("=== FETCHING MODULES FOR COURSE:", cid, "===");

      // Get API modules (newly created ones from database)
      let apiModules: any[] = [];
      try {
        apiModules = await coursesClient.findModulesForCourse(cid);
        console.log("✅ API modules fetched:", apiModules);
      } catch (error) {
        console.log("❌ API modules failed, using local only:", error);
        apiModules = [];
      }

      // Get local modules from JSON database
      const courseModulesData = (localModules as any)[cid] || [];
      console.log("📁 Local modules data for", cid, ":", courseModulesData);

      // Get any saved edits from localStorage
      const moduleEdits = getModuleEdits();
      console.log("📝 Saved local edits:", moduleEdits);

      // Transform local modules and apply any saved edits
      const transformedLocalModules = courseModulesData.map((module: any, index: number) => {
        const moduleId = `local-${cid}-${index}`;
        const editedData = moduleEdits[moduleId];

        return {
          _id: moduleId,
          name: editedData?.name || module.title,
          title: editedData?.name || module.title,
          course: cid,
          lessons: editedData?.lessons || module.lessons || [],
          isLocal: true,
          originalTitle: module.title // Keep original for reference
        };
      });

      console.log("🔄 Transformed local modules with edits:", transformedLocalModules);

      // Combine all modules (local first, then API)
      const allModules = [
        ...transformedLocalModules,
        ...apiModules.filter((m: any) => m && m._id).map((m: any) => ({ ...m, isLocal: false }))
      ];

      console.log("🎯 FINAL COMBINED MODULES:", allModules);
      console.log("📊 Total modules count:", allModules.length);

      dispatch(setModules(allModules));
    } catch (error) {
      console.error("💥 Error fetching modules:", error);
    }
  };
  useEffect(() => {
    fetchModulesForCourse();
  }, [cid]);




  // const createModuleForCourse = async () => {
  //   try {
  //     if (!cid || !moduleName.trim()) {
  //       console.log("Cannot add module: missing course ID or module name");
  //       return;
  //     }

  //     setLoading(true);
  //     console.log("Creating new module:", { name: moduleName, course: cid });

  //     // Create a local module object with a temporary ID
  //     const tempModule = {
  //       _id: "temp-" + Date.now(),
  //       name: moduleName.trim(),
  //       title: moduleName.trim(), // Add both for compatibility
  //       course: cid,
  //       lessons: []
  //     };

  //     // Immediately add to Redux for instant UI feedback
  //     dispatch(addModule(tempModule));

  //     // Then send to backend
  //     try {
  //       const savedModule = await coursesClient.createModuleForCourse(cid, {
  //         name: moduleName.trim(),
  //         course: cid
  //       });

  //       console.log("Module saved to backend:", savedModule);

  //       // Replace temp module with the one from backend
  //       if (savedModule && savedModule._id) {
  //         dispatch(updateModule({
  //           ...savedModule,
  //           course: cid // Ensure course ID is set
  //         }));
  //       }
  //     } catch (error) {
  //       console.error("Error saving module to backend:", error);
  //       // Module still shows in UI from the first dispatch
  //     }

  //     // Clear input field
  //     setModuleName("");
  //   } catch (error) {
  //     console.error("Error in createModuleForCourse:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


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

  const addModuleHandler = async () => {
    const newModule = await coursesClient.createModuleForCourse(cid!, {
      name: moduleName,
      course: cid,
    });
    dispatch(addModule(newModule));
    setModuleName("");
  };

  const deleteModuleHandler = async (moduleId: string) => {
    console.log("🗑️ Deleting module:", moduleId);

    // Check if it's a local module (starts with "local-")
    if (moduleId.startsWith('local-')) {
      console.log("📁 Deleting local module - only removing from Redux");
      // For local modules, just remove from Redux (can't delete from JSON file)
      dispatch(deleteModule(moduleId));
    } else {
      console.log("🌐 Deleting API module - calling backend");
      try {
        // For API modules, delete from backend first
        await modulesClient.deleteModule(moduleId);
        console.log("✅ Module deleted from backend");
        // Then remove from Redux
        dispatch(deleteModule(moduleId));
      } catch (error) {
        console.error("❌ Failed to delete module from backend:", error);
        // Still remove from Redux for better UX
        dispatch(deleteModule(moduleId));
      }
    }
  };



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
        addModule={addModuleHandler}
      />

      <h3>Modules for Course: {cid}</h3>
      {/* <p>Total Modules in Redux: {modules.length}</p>
      <p>Filtered Modules: {courseModules.length}</p> */}

      {loading ? (
        <div className="text-center p-4">Loading modules...</div>
      ) : error ? (
        <div className="alert alert-danger">
          {error} <Button variant="outline-danger" size="sm" onClick={fetchModulesForCourse}>Retry</Button>
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
                  {!module.editing && (
                    <span>
                      {module.title || module.name}
                      {module.isLocal && module.originalTitle &&
                        (module.title !== module.originalTitle || module.name !== module.originalTitle) && (
                          <span className="ms-2">
                            <small className="badge bg-warning text-dark">Edited</small>
                            <Button
                              size="sm"
                              variant="outline-light"
                              className="ms-1"
                              onClick={() => resetModuleToOriginal(module._id)}
                              title="Reset to original"
                            >
                              ↺
                            </Button>
                          </span>
                        )}
                    </span>
                  )}
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
                          try {
                            const target = e.target as HTMLInputElement;
                            const newValue = target.value;

                            const updatedModule = {
                              ...module,
                              editing: false,
                              name: newValue,
                              title: newValue
                            };

                            dispatch(updateModule(updatedModule));

                            // Handle updates differently for local vs API modules
                            if (module.isLocal) {
                              console.log("📝 Updating local module - saving to localStorage");
                              // For local modules, save edit to localStorage
                              saveModuleEdit(module._id, {
                                name: newValue,
                                lessons: module.lessons
                              });
                            } else {
                              console.log("🌐 Updating API module - calling backend");
                              // For API modules, update backend
                              await modulesClient.updateModule(module._id, {
                                name: newValue,
                                title: newValue
                              });
                            }

                          } catch (error) {
                            console.error("Failed to update module:", error);
                            fetchModulesForCourse();
                          }
                        }
                      }}
                    />
                  )}
                  <ModuleControlButtons
                    moduleId={module._id || module.id}
                    deleteModule={(moduleId) => deleteModuleHandler(moduleId)}
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