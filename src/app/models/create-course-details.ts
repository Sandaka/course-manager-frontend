import { CourseYearsDetail } from "./course-years-detail";
import { SubjectDetail } from "./subject-detail";

export class CreateCourseDetails {
    courseName: string = '';
    years: string = '';
    courseTypeId: any;
    eduLevelId: any;
    startDate: any;
    endDate: any;
    lectureDate: string = '';
    lectureTime: string = '';
    seats: string = '';
    medium: string = '';
    description: string = '';
    courseFee: any;
    offer: string = '';
    validUntil: any;
    offerDescription: string = '';
    subjectList: SubjectDetail[] = [];
    courseYearsList: CourseYearsDetail[] = [];
}