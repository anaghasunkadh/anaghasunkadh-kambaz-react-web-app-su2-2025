// src/Kambaz/Database/index.ts
import coursesRaw from "./courses.json?raw";
import modulesRaw from "./modules.json?raw";
import assignmentsRaw from "./assignments.json?raw";
import usersRaw from "./users.json?raw";

export const courses = JSON.parse(coursesRaw);
export const modules = JSON.parse(modulesRaw);
export const assignments = JSON.parse(assignmentsRaw);
export const users = JSON.parse(usersRaw);