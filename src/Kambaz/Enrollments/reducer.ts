import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, action: PayloadAction<Enrollment>) => {
      const newEnrollment = action.payload;
      // Check if enrollment already exists
      const existingIndex = state.enrollments.findIndex(
        (enrollment) => 
          enrollment.user === newEnrollment.user && 
          enrollment.course === newEnrollment.course
      );
      
      if (existingIndex === -1) {
        state.enrollments = [...state.enrollments, newEnrollment];
      }
    },
    removeEnrollment: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment) => 
          !(enrollment.user === userId && enrollment.course === courseId)
      );
    },
  },
});

export const { setEnrollments, addEnrollment, removeEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;