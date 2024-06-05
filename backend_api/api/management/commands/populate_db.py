# management/commands/populate_db.py
from django.core.management.base import BaseCommand
from api.models import Department, Professor, Student, Course, Enrollment, Class
from datetime import date

class Command(BaseCommand):
    help = 'Populate the database with initial data'

    def handle(self, *args, **kwargs):
        departments = [
            {'DepartmentID': 1, 'DepartmentName': 'Computer Science'},
            {'DepartmentID': 2, 'DepartmentName': 'Mathematics'},
            {'DepartmentID': 3, 'DepartmentName': 'Physics'},
            {'DepartmentID': 4, 'DepartmentName': 'Chemistry'},
            {'DepartmentID': 5, 'DepartmentName': 'Biology'}
        ]
        for dept in departments:
            Department.objects.create(**dept)

        professors = [
            {'ProfessorID': 1, 'FirstName': 'John', 'LastName': 'Doe', 'Department_id': 1},
            {'ProfessorID': 2, 'FirstName': 'Jane', 'LastName': 'Smith', 'Department_id': 2},
            {'ProfessorID': 3, 'FirstName': 'Emily', 'LastName': 'Jones', 'Department_id': 3},
            {'ProfessorID': 4, 'FirstName': 'Michael', 'LastName': 'Taylor', 'Department_id': 4},
            {'ProfessorID': 5, 'FirstName': 'Sarah', 'LastName': 'Williams', 'Department_id': 5},
            {'ProfessorID': 6, 'FirstName': 'David', 'LastName': 'Brown', 'Department_id': 1},
            {'ProfessorID': 7, 'FirstName': 'Laura', 'LastName': 'Wilson', 'Department_id': 2},
            {'ProfessorID': 8, 'FirstName': 'Robert', 'LastName': 'Moore', 'Department_id': 3},
            {'ProfessorID': 9, 'FirstName': 'Anna', 'LastName': 'Taylor', 'Department_id': 4},
            {'ProfessorID': 10, 'FirstName': 'James', 'LastName': 'Anderson', 'Department_id': 5}
        ]
        for prof in professors:
            Professor.objects.create(**prof)

        students = [
            {'StudentID': 1, 'FirstName': 'Alice', 'LastName': 'Brown', 'EnrollmentDate': date(2022, 9, 1)},
            {'StudentID': 2, 'FirstName': 'Bob', 'LastName': 'Johnson', 'EnrollmentDate': date(2022, 9, 1)},
            {'StudentID': 3, 'FirstName': 'Charlie', 'LastName': 'Davis', 'EnrollmentDate': date(2022, 9, 1)},
            {'StudentID': 4, 'FirstName': 'Diana', 'LastName': 'Miller', 'EnrollmentDate': date(2022, 9, 1)},
            {'StudentID': 5, 'FirstName': 'Edward', 'LastName': 'Wilson', 'EnrollmentDate': date(2022, 9, 1)},
            {'StudentID': 6, 'FirstName': 'Fiona', 'LastName': 'Moore', 'EnrollmentDate': date(2022, 9, 1)},
            {'StudentID': 7, 'FirstName': 'George', 'LastName': 'Taylor', 'EnrollmentDate': date(2022, 9, 1)},
            {'StudentID': 8, 'FirstName': 'Hannah', 'LastName': 'Anderson', 'EnrollmentDate': date(2022, 9, 1)},
            {'StudentID': 9, 'FirstName': 'Ian', 'LastName': 'Thomas', 'EnrollmentDate': date(2022, 9, 1)},
            {'StudentID': 10, 'FirstName': 'Julia', 'LastName': 'Jackson', 'EnrollmentDate': date(2022, 9, 1)}
        ]
        for student in students:
            Student.objects.create(**student)

        courses = [
            {'CourseID': 1, 'CourseName': 'Introduction to Computer Science', 'Department_id': 1},
            {'CourseID': 2, 'CourseName': 'Calculus I', 'Department_id': 2},
            {'CourseID': 3, 'CourseName': 'Physics I', 'Department_id': 3},
            {'CourseID': 4, 'CourseName': 'Organic Chemistry', 'Department_id': 4},
            {'CourseID': 5, 'CourseName': 'Biology 101', 'Department_id': 5},
            {'CourseID': 6, 'CourseName': 'Data Structures', 'Department_id': 1},
            {'CourseID': 7, 'CourseName': 'Linear Algebra', 'Department_id': 2},
            {'CourseID': 8, 'CourseName': 'Quantum Mechanics', 'Department_id': 3},
            {'CourseID': 9, 'CourseName': 'Analytical Chemistry', 'Department_id': 4},
            {'CourseID': 10, 'CourseName': 'Genetics', 'Department_id': 5}
        ]
        for course in courses:
            Course.objects.create(**course)

        enrollments = [
            {'EnrollmentID': 1, 'Student_id': 1, 'Course_id': 1, 'EnrollmentDate': date(2022, 9, 1)},
            {'EnrollmentID': 2, 'Student_id': 2, 'Course_id': 2, 'EnrollmentDate': date(2022, 9, 1)},
            {'EnrollmentID': 3, 'Student_id': 3, 'Course_id': 3, 'EnrollmentDate': date(2022, 9, 1)},
            {'EnrollmentID': 4, 'Student_id': 4, 'Course_id': 4, 'EnrollmentDate': date(2022, 9, 1)},
            {'EnrollmentID': 5, 'Student_id': 5, 'Course_id': 5, 'EnrollmentDate': date(2022, 9, 1)},
            {'EnrollmentID': 6, 'Student_id': 6, 'Course_id': 6, 'EnrollmentDate': date(2022, 9, 1)},
            {'EnrollmentID': 7, 'Student_id': 7, 'Course_id': 7, 'EnrollmentDate': date(2022, 9, 1)},
            {'EnrollmentID': 8, 'Student_id': 8, 'Course_id': 8, 'EnrollmentDate': date(2022, 9, 1)},
            {'EnrollmentID': 9, 'Student_id': 9, 'Course_id': 9, 'EnrollmentDate': date(2022, 9, 1)},
            {'EnrollmentID': 10, 'Student_id': 10, 'Course_id': 10, 'EnrollmentDate': date(2022, 9, 1)}
        ]
        for enrollment in enrollments:
            Enrollment.objects.create(**enrollment)

        classes = [
            {'ClassID': 1, 'Course_id': 1, 'Professor_id': 1, 'Schedule': 'MWF 10:00-11:00'},
            {'ClassID': 2, 'Course_id': 2, 'Professor_id': 2, 'Schedule': 'TTh 09:00-10:30'},
            {'ClassID': 3, 'Course_id': 3, 'Professor_id': 3, 'Schedule': 'MWF 08:00-09:00'},
            {'ClassID': 4, 'Course_id': 4, 'Professor_id': 4, 'Schedule': 'MWF 10:00-11:00'},
            {'ClassID': 5, 'Course_id': 5, 'Professor_id': 5, 'Schedule': 'TTh 09:00-10:30'},
            {'ClassID': 6, 'Course_id': 6, 'Professor_id': 6, 'Schedule': 'MWF 08:00-09:00'},
            {'ClassID': 7, 'Course_id': 7, 'Professor_id': 7, 'Schedule': 'MWF 10:00-11:00'},
            {'ClassID': 8, 'Course_id': 8, 'Professor_id': 8, 'Schedule': 'TTh 09:00-10:30'},
            {'ClassID': 9, 'Course_id': 9, 'Professor_id': 9, 'Schedule': 'MWF 08:00-09:00'},
            {'ClassID': 10, 'Course_id': 10, 'Professor_id': 10, 'Schedule': 'MWF 08:00-09:00'}
        ]
        for cls in classes:
            Class.objects.create(**cls)

        self.stdout.write(self.style.SUCCESS('Database populated with initial data.'))
