from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import EmployeeSerializer, DepartmentSerializer, CreateEmployeeSerializer
from rest_framework import status
from .models import Employee, Department
from django.db.models import Q
# Create your views here.


class EmployeeView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            emps = Employee.objects.all()
            serialized_emps = EmployeeSerializer(emps, many=True)
            return Response(serialized_emps.data)
        except Exception as e:
            print(e)
            return Response({"details":"Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def post(self, request, *args, **kwargs):
        # return Response({}, status=status.HTTP_400_BAD_REQUEST)
        try:
            emp = CreateEmployeeSerializer(data=request.data)
            if emp.is_valid(raise_exception=True):
                serialized_emp_obj = emp.save()
                serialized_emp = EmployeeSerializer(serialized_emp_obj)
                return Response(serialized_emp.data)
            return Response({"details":"Error", "message" :emp.error_messages}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({"details":"Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class DepartmentView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            depts = Department.objects.all()
            serialized_depts = DepartmentSerializer(depts, many=True)
            return Response(serialized_depts.data)
        except:
            return Response({"details":"Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def post(self, request, *args, **kwargs):
        try:
            dept = DepartmentSerializer(data=request.data)
            if dept.is_valid():
                dept.save()
                return Response(dept.data)
            return Response({"details":"Error", "message" :dept.error_messages}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"details":"Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class SearchView(APIView):

    def get(self, request, *args, **kwargs):
        q = request.GET.get('q')
        if not q:
            return Response({"details":"Error", "message" :"Q is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            lookup = Q(name__icontains = q) | Q(department__name__icontains=q)
            emps = Employee.objects.filter(lookup)
            serialized_emps = EmployeeSerializer(emps, many=True)
            return Response(serialized_emps.data)
        except Exception as e:
            print(e)
            return Response({"details":"Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

