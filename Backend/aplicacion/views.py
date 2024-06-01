from django.shortcuts import render

# Create your views here.
def main(request, id):
    
    return render(request, 'main.html')