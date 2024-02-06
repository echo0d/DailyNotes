from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.shortcuts import redirect
# Create your views here.
def index(request):
    return HttpResponse('<h1>hello world</h1>')
def test(request):
    hi='你好，世界是美好的'
    test='这是一个测试页，动态页面正常显示，测试成功！'
    return render(request,'test.html',{'hi':hi,'test':test})
def login(request):
    if request.method == "GET":# 打开login.html页面
        return render(request, "login.html")
    else:# 从表单提取用户名
        username = request.POST.get('username')# 从表单提取密码
        password = request.POST.get('password')
        if (username=='test' and password=='123'):# 用户名与密码都正确时，定向到test.html渲染的页面
            return redirect('/test/')
        else:
            return render(request, "login.html", {'error': '用户名或密码错误！'})