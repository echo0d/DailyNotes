from django.contrib import admin

# Register your models here.
from .models import UserInfo
# 注册数据库表
# 自定义数据模型在管理后台的显示样式
class UserInfoAdmin(admin.ModelAdmin):
# 指明在Django Admin管理后台列表模式下显示哪几个字段
    list_display=('user','email')
# admin.site.register()函数表示：如果只有一个参数，以默认方式在后台显示或管理数据表；如果有第二个参数，就按第二个参数传入的类定制的方式显示和管理数据表。
admin.site.register(UserInfo,UserInfoAdmin)