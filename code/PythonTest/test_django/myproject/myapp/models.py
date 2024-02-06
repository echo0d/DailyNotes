from django.db import models

# Create your models here.
class UserInfo(models.Model):
    user=models.CharField(max_length=32,verbose_name='姓名')
    email=models.EmailField(verbose_name='邮箱')
    def __str__(self):
        return self.user