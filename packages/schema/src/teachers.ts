import { Schema } from "mongoose";

export interface ITeachers {
  readonly schoolPhase: string;
  readonly totalNumOfTeachers: number;
  readonly totalNumOfTeachingAssistants: number;
  readonly totalNumOfNonClassroomStaff: number;
  readonly totalNumOfTeachersFTE: number;
  readonly totalNumOfTeachingAssistantsFTE: number;
  readonly totalNumOfNonClassroomStaffFTE: number;
  readonly pupilTeacherRation: number;
  readonly meanGrossFTESalary: string;
}

export const teachersSchema = new Schema({
  schoolPhase: { type: String, required: true },
  totalNumOfTeachers: { type: Number, required: true },
  totalNumOfTeachingAssistants: { type: Number, required: true },
  totalNumOfNonClassroomStaff: { type: Number, required: true },
  totalNumOfTeachersFTE: { type: Number, required: true },
  totalNumOfTeachingAssistantsFTE: { type: Number, required: true },
  totalNumOfNonClassroomStaffFTE: { type: Number, required: true },
  pupilTeacherRation: { type: Number, required: true },
  meanGrossFTESalary: { type: String, required: true },
});