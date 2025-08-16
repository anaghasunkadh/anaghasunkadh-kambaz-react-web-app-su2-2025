import axios from "axios";

// Get the environment variable with proper typing
const getRemoteServer = (): string => {
  return (import.meta as any).env?.VITE_REMOTE_SERVER || "http://localhost:4000";
};

const REMOTE_SERVER = getRemoteServer();
const ENROLLMENTS_API = `${REMOTE_SERVER}/api`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const findAllEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/enrollments`);
  return data;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/users/${userId}/enrollments`);
  return data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${ENROLLMENTS_API}/users/${userId}/enrollments/${courseId}`);
  return data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/users/${userId}/enrollments/${courseId}`);
  return data;
};

export const checkEnrollment = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/users/${userId}/enrollments/${courseId}`);
  return data;
};

// Helper functions for current user
export const findMyEnrollments = async () => {
  return findEnrollmentsForUser("current");
};

export const enrollMeInCourse = async (courseId: string) => {
  return enrollInCourse("current", courseId);
};

export const unenrollMeFromCourse = async (courseId: string) => {
  return unenrollFromCourse("current", courseId);
};

export const checkMyEnrollment = async (courseId: string) => {
  return checkEnrollment("current", courseId);
};
export const findCoursesForUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/users/${userId}/courses`);
  return data;
};

export const findMyEnrolledCourses = async () => {
  return findCoursesForUser("current");
};