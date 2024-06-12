from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser, Group, Permission

class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    def profile(self):
        profile = Profile.objects.get(user=self)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    verified = models.BooleanField(default=False)


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)

class InteractionData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interaction_type = models.CharField(max_length=100)  # e.g., 'problem_solving', 'module', 'block_execution'
    timestamp = models.DateTimeField(auto_now_add=True)
    additional_data = models.JSONField()  # to store detailed interaction data

class SurveyResponse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interaction = models.ForeignKey(InteractionData, on_delete=models.CASCADE)
    satisfaction_rating = models.IntegerField()  # e.g., scale from 1 to 5
    comments = models.TextField(blank=True, null=True)

class EmotionData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interaction = models.ForeignKey(InteractionData, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    emotion = models.CharField(max_length=100)  # e.g., 'sad', 'happy'
    head_pose = models.CharField(max_length=100)  # e.g., 'head_down', 'head_up'

class Department(models.Model):
    DepartmentID = models.AutoField(primary_key=True)
    DepartmentName = models.CharField(max_length=50)
    
    class Meta:
        db_table = 'Department'

    def __str__(self):
        return self.DepartmentName

class Professor(models.Model):
    ProfessorID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    Department = models.ForeignKey(Department, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Professor'

    def __str__(self):
        return f'{self.FirstName} {self.LastName}'

class Student(models.Model):
    StudentID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    EnrollmentDate = models.DateField()

    class Meta:
        db_table = 'Student'

    def __str__(self):
        return f'{self.FirstName} {self.LastName}'

class Course(models.Model):
    CourseID = models.AutoField(primary_key=True)
    CourseName = models.CharField(max_length=100)
    Department = models.ForeignKey(Department, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Course'

    def __str__(self):
        return self.CourseName

class Enrollment(models.Model):
    EnrollmentID = models.AutoField(primary_key=True)
    Student = models.ForeignKey(Student, on_delete=models.CASCADE)
    Course = models.ForeignKey(Course, on_delete=models.CASCADE)
    EnrollmentDate = models.DateField()

    class Meta:
        db_table = 'Enrollment'

class Class(models.Model):
    ClassID = models.AutoField(primary_key=True)
    Course = models.ForeignKey(Course, on_delete=models.CASCADE)
    Professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    Schedule = models.CharField(max_length=100)

    class Meta:
        db_table = 'Class'

class PessimismPrediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interaction_type = models.CharField(max_length=50)
    attempts = models.IntegerField()
    errors = models.IntegerField()
    correct = models.IntegerField()
    emotion = models.CharField(max_length=50)
    head_pose = models.CharField(max_length=50)
    pessimism_level = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - {self.interaction_type} - {self.pessimism_level}'
