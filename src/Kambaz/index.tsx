import { Routes, Route, Navigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { addEnrollment, removeEnrollment } from "./Enrollments/reducer";

export default function Kambaz() {
    const [courses, setCourses] = useState<any[]>([]);
    const dispatch = useDispatch();
    const [course, setCourse] = useState<any>({
        _id: "1234",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        description: "New Description"
    });
    const [enrolling, setEnrolling] = useState<boolean>(false);

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchCourses = async () => {
        try { 
            const courses = await courseClient.fetchAllCourses(); 
            setCourses(courses); 
        } catch (error) {
            console.error(error);
        }
    };

    const addNewCourse = async () => {
        try {
            const newCourse = await courseClient.createCourse(course); 
            setCourses([...courses, newCourse]);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCourse = async (courseId: string) => {
        try {
            await courseClient.deleteCourse(courseId);
            setCourses(courses.filter((course) => course._id !== courseId));
        } catch (error) {
            console.error(error);
        }
    };

    const updateCourse = async () => {
        try {
            await courseClient.updateCourse(course);
            setCourses(courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const findCoursesForUser = async () => {
        try {
            const courses = await userClient.findCoursesForUser(currentUser._id);
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCoursesWithEnrollmentStatus = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
            
            const courses = allCourses.map((course: any) => {
                if (enrolledCourses.find((c: any) => c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return course;
                }
            });
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    // const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    //     try {
    //         if (enrolled) {
    //             await userClient.enrollIntoCourse(currentUser._id, courseId);
    //         } else {
    //             await userClient.unenrollFromCourse(currentUser._id, courseId);
    //         }
    //         setCourses(
    //             courses.map((course) => {
    //                 if (course._id === courseId) {
    //                     return { ...course, enrolled: enrolled };
    //                 } else {
    //                     return course;
    //                 }
    //             })
    //         );
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    // ADD this import at the top of your Kambaz/index.tsx:


// REPLACE your updateEnrollment function with this:
const updateEnrollment = async (courseId: string, enrolled: boolean) => {
  try {
    if (enrolled) {
      const enrollment = await userClient.enrollIntoCourse(currentUser._id, courseId);
      dispatch(addEnrollment(enrollment)); // ADD this line
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
      dispatch(removeEnrollment({ userId: currentUser._id, courseId })); // ADD this line
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  } catch (error) {
    console.error(error);
  }
};

    useEffect(() => {
        if (enrolling) {
            fetchCoursesWithEnrollmentStatus();
        } else {
            findCoursesForUser();
        }
    }, [currentUser, enrolling]);

    return (
        <Session>
            <div id="wd-kambaz">
                <KambazNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route
                            path="/Dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard
                                        courses={courses}
                                        course={course}
                                        setCourse={setCourse}
                                        addNewCourse={addNewCourse}
                                        deleteCourse={deleteCourse}
                                        updateCourse={updateCourse}
                                        enrolling={enrolling}
                                        setEnrolling={setEnrolling}
                                        updateEnrollment={updateEnrollment}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/Courses/:cid/*"
                            element={
                                <ProtectedRoute>
                                    <Courses courses={courses} />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}