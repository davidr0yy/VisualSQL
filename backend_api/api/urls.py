# backend_api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MyTokenObtainPairView, RegisterView, getRoutes, testEndPoint,
    DepartmentViewSet, ProfessorViewSet, StudentViewSet, CourseViewSet, EnrollmentViewSet,
    ClassViewSet, InteractionDataViewSet, SurveyResponseViewSet, EmotionDataViewSet,
    execute_query  # Ensure execute_sql is imported here
)

from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'professors', ProfessorViewSet)
router.register(r'students', StudentViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'classes', ClassViewSet)
router.register(r'interactiondata', InteractionDataViewSet)
router.register(r'surveyresponses', SurveyResponseViewSet)
router.register(r'emotiondata', EmotionDataViewSet)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('test/', testEndPoint, name='test'),
    path('execute-query/', execute_query, name='execute-query'),  # Add this line
    path('', getRoutes),
    path('', include(router.urls)),
]
