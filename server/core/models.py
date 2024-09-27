from django.db import models

# Create your models here.

class Department(models.Model):
    name = models.CharField(max_length=25) 
    description = models.TextField()

    def __str__(self):
        return self.name

class Employee(models.Model):
    name = models.CharField(max_length=25)  
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='employees')
    address = models.TextField()

    def __str__(self):
        return self.name + " - "+ self.department.name

