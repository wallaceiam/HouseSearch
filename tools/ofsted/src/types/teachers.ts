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