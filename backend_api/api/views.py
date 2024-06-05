import logging
from django.shortcuts import render
from django.http import JsonResponse
from api.models import *
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db import connection

from api.serializer import (
    MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer, ProfileSerializer,
    DepartmentSerializer, ProfessorSerializer, StudentSerializer, CourseSerializer,
    EnrollmentSerializer, ClassSerializer, InteractionDataSerializer,
    SurveyResponseSerializer, EmotionDataSerializer
)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# Get All Routes
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulations {request.user}, your API just responded to a GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulations, your API just responded to a POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

# ViewSets for the new models
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer

class InteractionDataViewSet(viewsets.ModelViewSet):
    queryset = InteractionData.objects.all()
    serializer_class = InteractionDataSerializer

class SurveyResponseViewSet(viewsets.ModelViewSet):
    queryset = SurveyResponse.objects.all()
    serializer_class = SurveyResponseSerializer

class EmotionDataViewSet(viewsets.ModelViewSet):
    queryset = EmotionData.objects.all()
    serializer_class = EmotionDataSerializer

logger = logging.getLogger(__name__)


@csrf_exempt
def execute_query(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            logger.info(f'Received data: {data}')  # Log the received data
            query = data.get('query')
            if query:
                with connection.cursor() as cursor:
                    cursor.execute(query)
                    rows = cursor.fetchall()
                    columns = [col[0] for col in cursor.description]
                    result = [dict(zip(columns, row)) for row in rows]
                return JsonResponse(result, safe=False)
            else:
                return JsonResponse({'error': 'No query provided'}, status=400)
        except json.JSONDecodeError:
            logger.error('Invalid JSON received')  # Log JSON decode error
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            logger.error(f'Error executing query: {str(e)}')  # Log any other errors
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)