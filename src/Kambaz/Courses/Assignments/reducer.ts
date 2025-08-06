import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
   assignments: [] as any[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, { payload: assignment }) => {
      // Remove the _id generation since server will handle it
      state.assignments = [...state.assignments, assignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      console.log(" Reducer called → deleteAssignment:", assignmentId);
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

export const { setAssignments, addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;