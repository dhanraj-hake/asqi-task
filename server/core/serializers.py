from rest_framework import serializers
from .models import Employee, Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"

class EmployeeSerializer(serializers.ModelSerializer):

    department = DepartmentSerializer(read_only=True)
    class Meta:
        model = Employee
        fields = "__all__"


    # def validate_name(self, name):

    #     name_exists = Employee.objects.filter(name=name).exists()

    #     if name_exists:
            

    #     return name

class CreateEmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = "__all__"
