from django.urls import path

from . import views

urlpatterns = [
    path("employee", views.EmployeeView.as_view(), name="employee"),
    path("department", views.DepartmentView.as_view(), name="department"),
    path("search", views.SearchView.as_view(), name="search")
]