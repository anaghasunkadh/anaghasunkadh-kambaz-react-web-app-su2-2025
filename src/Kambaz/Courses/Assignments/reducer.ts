import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: db.assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: uuidv4(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description,
        points: assignment.points,
        dueDate: assignment.dueDate,
        availableFromDate: assignment.availableFromDate,
        availableUntilDate: assignment.availableUntilDate,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },

    deleteAssignment: (state, { payload: assignmentId }) => {
      console.log("🗑️ Reducer called → deleteAssignment:", assignmentId);
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },

    updateAssignment: (state, { payload: assignment }) => {
      console.log("🛠 Reducer called → updateAssignment:", assignment);
      
      // Ensure we have an _id to update
      if (!assignment._id) {
        console.error("Cannot update assignment without _id");
        return;
      }
      
      state.assignments = state.assignments.map((a: any) => {
        if (a._id === assignment._id) {
          return {
            ...a,
            ...assignment,
            _id: assignment._id 
          };
        }
        return a;
      });
    },

    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;