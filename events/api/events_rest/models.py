from django.db import models

# Create your models here.

class DogVO(models.Model):
    name = models.CharField(max_length=100)


class PersonVO(models.Model):
    name =  models.CharField(max_length=100)
    email = models.EmailField()
    dog = models.ForeignKey("DogVO", related_name="People", on_delete=models.CASCADE)

class Event(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)



# event project will poll person hosting or person expressing interest in an event. Then it will poll for the dog(s) that the person chooses to bring to event


