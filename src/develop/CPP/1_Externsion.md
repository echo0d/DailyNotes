---
category: C++
tag:
---
# 01. C++ - 对C的扩展

## 1 类型增强

### 1.1 类型检查更严格

比如一个 const 类型的指针赋值给非const 类型的指针。c 语言中可以通的过，但是在 c++ 中则编不过去
```cpp
int main()
{
    const int a = 100;
    int b = a;
    const int *pa = &a;
    int *pb = pa;
    return 0;
}
```

![](img/1_Externsion/file-20250407145721348.png)
### 1.2 布尔类型（bool)

C 语言的逻辑真假用 0 和非 0 来表示，C++ 中有了具体的类型
```cpp
int main()
{
    bool flag = true;
    if (flag != false)
    {
        printf("i know bool type now\n");
    }
    printf("bool size = %d\n", sizeof(bool));
    return 0;
}
```
### 1.3 枚举（enum）

C 语言中枚举类型本质就是整型，枚举变量可以用任意整型赋值，而 C++中枚举变量只能用被枚举出来的元素初始化。
```cpp
enum season
{
    spring = 1,
    summer = 2,
    autumn = 3,
    winter = 4
};
int main()
{
    enum season s = spring;
    s = 2;
    return 0;
}
```

![](img/1_Externsion/file-20250407150939601.png)

### 1.4 表达式的值可被赋值

c 语言中表达式通常不能作为左值的，即不可被赋值，c++中某些表达式是可以赋值的。比如
```cpp
#include <iostream>

using namespace std;
int main(void)
{
    int a, b = 5;
    (a = b) = 10;
    cout << "a = " << a << " b = " << b << endl;
    (a < b ? a : b) = 200;
    cout << "a = " << a << " b = " << b << endl;
    return 0;
}
```
![](img/1_Externsion/file-20250407153327153.png)
## 2 输入与输出(cin /cout)
### 2.1 cin && cout
cin 和 cout 是 C++的标准输入流和输出流。他们在头文件 iostream 中定义
```cpp
#include <iostream>
using namespace std;

int main()
{
    char name[30];
    int age;
    cout << "pls input name and age:" << endl;
    cin >> name;
    cin >> age;
    // cin>>name>>age;
    cout << "your name is: " << name << endl;
    cout << "your age is: " << age << endl;
    return 0;
}
```
![](img/1_Externsion/file-20250407154957019.png)
### 2.2 格式化
c 语言中 printf 拥有强大的格式化控制。c++亦可以实现，略复杂。

**设置域宽及位数**
对于实型，`cout` 默认输出六位有效数据，`setprecision(2)` 可以设置有效位数， `setprecision(n)<<setiosflags (ios::fixed) ` 合用，可以设置小数点右边的位数
```cpp
#include <iostream>
#include <iomanip>
using namespace std;
int main()
{
    printf("%c\n%d\n%f\n", 'a', 100, 120.00);
    printf("%5c\n%5d\n%6.2f\n", 'a', 100, 120.00);
    cout << setw(5) << 'a' << endl
         << setw(5) << 100 << endl
         << setprecision(2) << setiosflags(ios::fixed) << 120.00 << endl;
    return 0;
}
```

格式说明：

- `%c`: 输出字符
- `%d`: 输出整数
- `%f`: 输出浮点数
- `\n`: 换行符
- `%5c`: 字符右对齐，总宽度5个字符
- `%5d`: 整数右对齐，总宽度5个字符
- `%6.2f`: 浮点数右对齐，总宽度6个字符，保留2位小数
- `setw(5)`: 设置输出宽度为5个字符
- `setprecision(2)`: 设置小数精度为2位
- `setiosflags(ios::fixed)`: 设置为固定小数点格式
- `endl`: 换行符

**按进制输出**
输出十进制，十六进制，八进制。默认输出十进制的数据
```cpp
	int i = 123;
	cout << i << endl;                 // 输出: 123    (默认十进制)
	cout << hex << i << endl;          // 输出: 7b     (十六进制)
	cout << oct << i << endl;          // 输出: 173    (八进制)
	cout << setbase(16) << i << endl;  // 输出: 7b     (十六进制)
```

**设置填充符**
可以设置域宽的同时，设置左右对齐及填充字符。
```cpp
#include <iostream>
#include <iomanip> // for std::setw, std::setfill, std::setiosflags

using namespace std;

int main()
{
    cout << setw(10) << 1234 << endl;
    cout << setw(10) << setfill('0') << 1234 << endl;
    cout << setw(10) << setfill('0') << setiosflags(ios::left) << 1234 << endl;
    cout << setw(10) << setfill('-') << setiosflags(ios::right) << 1234 << endl;
    return 0;
}
```
![](img/1_Externsion/file-20250407160619116.png)

## 3 函数重载(function overload)

### 3.1 重载规则

1. 函数名相同
2. 参数个数不同，参数的类型不同，参数顺序不同，均可构成重载
3. 返回值类型不同则不可以构成重载。

```cpp
void func(int a); //ok
void func(char a); //ok
void func(char a,int b); //ok
void func(int a, char b); //ok
char func(int a); //与第一个函数有冲突
```
有的函数虽然有返回值类型，但不与参数表达式运算，而作一条单独的语句

### 3.2 匹配原则

1. 严格匹配，找到则调用。 
2. 通过隐式转换寻求一个匹配，找到则调用
```cpp
#include <iostream>
using namespace std;
void print(double a)
{
    cout << a << endl;
}
void print(int a)
{
    cout << a << endl;
}
int main()
{
    print(1);     // print(int)
    print(1.1);   // print(double)
    print('a');   // print(int)
    print(1.11f); // print(double)
    return 0;
}
```


## 4 操作符重载(operator overload

前面用到的<<本身在 c 语言中是位操作中的左移运算符。现在又用用流插入运算符，这种一个字符多种用处的现像叫作重载。在 c 语中本身就用重载的现像，比如 & 既表示取地址，又表示位操作中的与。`*` 既表示解引用，又表示乘法运算符。只不过 c 语言并没有开放重载机制。 

C++提供了运算符重载机制。可以为自定义数据类型重载运算符。实现构造数据类型也 可以像基本数据类型一样的运算特性
```cpp
#include <iostream>
using namespace std;

struct COMP
{
    float real;
    float image;
};
COMP operator+(COMP one, COMP another)
{
    one.real += another.real;
    one.image += another.image;
    return one;
}
int main()
{
    COMP c1 = {1, 2};
    COMP c2 = {3, 4};
    COMP sum = operator+(c1, c2); // c1+c2;
    cout << sum.real << " " << sum.image << endl;
    return 0;
}
```
示例中重载了一个全局的操作符+号用于实现将两个自定义结构体类型相加。本质是函数 的调用。 当然这个 `COMP operator+(COMP one, COMP another)`，也可以定义为 `COMP add(COMP one, COMP another)`，但这样的话就只能 C`OMP sum = add(c1,c2)`，而不能实现 `COMP sum = c1 +c2` 了。 后序我们在学习完成类以后，重点讲解重载。

## 5 默认参数(default parameters)

通常情况下，函数在调用时，形参从实参那里取得值。对于多次调用用一函数同一实参时，C++给出了更简单的处理办法。给形参以默认值，这样就不用从实参那里取值了

### 5.1 单个参数

```cpp
#include <iostream>
#include <ctime>
using namespace std;
void weatherForcast(char * w="sunny")
{
	time_t t = time(0);
	char tmp[64];
	strftime( tmp, sizeof(tmp), "%Y/%m/%d %X %A ",localtime(&t) );
	cout<<tmp<< "today is weahter "<<w<<endl;
}
int main()
{
	//sunny windy cloudy foggy rainy
	weatherForcast();
	weatherForcast("rainny");
	weatherForcast();
	return 0;
}
```

### 5.2 多个参数

```cpp
float volume(float length, float weight = 4,float high = 5)
{
	return length*weight*high;
}
int main()
{
	float v = volume(10);
	float v1 = volume(10,20);
	float v2 = volume(10,20,30);
	cout<<v<<endl;
	cout<<v1<<endl;
	cout<<v2<<endl;
	return 0;
}
```

### 5.3 规则

1. 默认的顺序，是从右向左，不能跳跃。
2. 函数声明和定义一体时，默认认参数在定义(声明)处。声明在前，定义在后，默认参数在声明处。 
3. 一个函数，不能既作重载，又作默认参数的函数。当你少写一个参数时，系统无法确认是重载还是默认参数
```cpp
void print(int a)
{
}
void print(int a, int b = 10)
{
}
int main()
{
    print(10);
    return 0;
}
```
![](img/1_Externsion/file-20250407164506837.png)
```shell
 error: call of overloaded 'print(int)' is ambiguous
     print(10);
             ^
E:\MyDaily\C\cppTest.cpp:5:6: note: candidate: 'void print(int)'
 void print(int a)
      ^~~~~
E:\MyDaily\C\cppTest.cpp:8:6: note: candidate: 'void print(int, int)'
 void print(int a, int b = 10)
      ^~~~~

Build finished with error(s).
```

## 6 引用(Reference)

```cpp
#include <iostream>
using namespace std;

void swapWithReference(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10;
    int y = 20;
    
    // 创建引用
    int& ref = x;    // ref 现在是 x 的别名
    
    cout << "Before: x = " << x << ", y = " << y << endl;
    swapWithReference(x, y);
    cout << "After: x = " << x << ", y = " << y << endl;
    
    return 0;
}

```

### 6.1 主要特点

1. **必须初始化**
    - 声明引用时必须立即初始化
    - 不能像指针那样先声明后赋值
2. **不能改变引用**
    - 一旦引用被初始化，就不能再引用其他变量
    - 引用始终指向初始化时的对象
3. **不占用额外内存**
    - 引用只是一个别名，不会分配新的内存空间

### 6.2 常见用途

1. **函数参数**
    - 避免值传递的拷贝开销
    - 允许函数修改参数的值
2. **作为函数返回值**
    - 返回可修改的对象
    - 避免返回值的拷贝
3. **在范围 for 循环中使用**
```cpp
vector<int> nums {1, 2, 3};
for (int& num : nums) {  // 使用引用可以修改元素
    num *= 2;
}
```

### 6.3 与指针的比较

1. **安全性**
    - 引用不能为空
    - 不需要解引用操作符
    - 不能进行指针运算
2. **使用方式**
    - 引用使用更直观，像普通变量一样
    - 指针需要使用 `*` 和 `&` 操作符
3. **灵活性**
    - 指针可以重新指向其他对象
    - 引用一旦绑定就不能改变

## 7 new/delete Operator

c 语言中提供了 malloc 和 free 两个系统函数，完成对堆内存的申请和释放。而 c++则提供了两关键字 new 和 delete

```cpp
#include <iostream>
using namespace std;

class Person {
public:
    Person(string n) : name(n) {
        cout << "构造函数被调用" << endl;
    }
    ~Person() {
        cout << "析构函数被调用" << endl;
    }
    string name;
};

int main() {
    // 1. 基本类型的动态内存分配
    int* p1 = new int(10);
    cout << *p1 << endl;
    delete p1;

    // 2. 数组的动态内存分配
    int* arr = new int[5];
    for(int i = 0; i < 5; i++) {
        arr[i] = i;
    }
    delete[] arr;

    // 3. 类对象的动态内存分配
    Person* person = new Person("张三");
    cout << person->name << endl;
    delete person;

    return 0;
}
```
![](img/1_Externsion/file-20250407171313606.png)

### 7.1 new 和 delete 的特点

1. **自动计算所需空间**
    - `new` 会根据类型自动计算需要分配的内存大小
    - 不需要像 `malloc` 那样手动计算字节数
2. **自动调用构造和析构函数**
    - `new` 创建对象时会自动调用构造函数
    - `delete` 释放对象时会自动调用析构函数
3. **类型安全**
    - `new` 返回对应类型的指针，不需要类型转换
    - 而 `malloc` 返回 `void*`，需要手动转换类型

### 7.2 数组形式
```cpp
// 分配数组
int* arr = new int[10];

// 释放数组（注意使用 delete[]）
delete[] arr;
```

### 7.3 注意事项

1. **内存泄漏** 
    - 使用 `new` 分配的内存必须用 `delete` 释放
    - 数组形式必须用 `delete[]` 释放
2. **异常处理**
    - `new` 分配失败时会抛出 `bad_alloc` 异常
    - 可以使用 `nothrow` 版本避免异常：
```cpp
int* p = new(nothrow) int;
if(p == nullptr) {
    // 处理分配失败的情况
}
```
3. **智能指针**
- 现代 C++ 推荐使用智能指针管理动态内存
- 如 `unique_ptr`、`shared_ptr` 等
```cpp
#include <memory>
auto p = make_unique<int>(42);
// 不需要手动 delete
```

## 8 内联函数(inline function)


内联函数是 C++ 中提供的一个关键特性，用于优化程序性能。通过在函数定义前加上 `inline` 关键字，可以建议编译器将函数调用处用函数体替换。

### 8.1 基本语法

````cpp
#include <iostream>
using namespace std;

// 方法1：在函数声明时使用 inline
inline int add(int a, int b) {
    return a + b;
}

class Calculator {
public:
    // 方法2：类内定义的成员函数默认为内联函数
    int multiply(int a, int b) {
        return a * b;
    }
    
    // 方法3：类外定义的成员函数使用 inline
    int subtract(int a, int b);
};

inline int Calculator::subtract(int a, int b) {
    return a - b;
}
````

### 8.2 特点和使用场景

适用场景
- 函数体积小
- 频繁调用的函数
- 不含复杂控制流程（如循环、switch 等）
- 不是递归函数
优点
- 减少函数调用开销
- 提高程序执行效率
- 可能减少栈的使用

缺点
	- 可能增加代码体积
	- 不适合大型函数
	- 过度使用可能导致程序膨胀

### 8.3 实际使用示例

````cpp
#include <iostream>
using namespace std;

class Rectangle {
private:
    int width;
    int height;

public:
    Rectangle(int w, int h) : width(w), height(h) {}
    
    // 简单的 getter/setter 适合做内联函数
    inline int getWidth() const { return width; }
    inline int getHeight() const { return height; }
    
    // 简单计算也适合内联
    inline int area() const { return width * height; }
};

int main() {
    Rectangle rect(5, 3);
    cout << "Area: " << rect.area() << endl;  // 编译器可能内联此调用
    return 0;
}
````

### 8.4 注意事项

1. **内联是建议性的**
   - 编译器可能会忽略 inline 关键字
   - 也可能会自动内联未标记的函数

2. **调试影响**
   - 内联函数可能增加调试难度
   - 断点可能无法在内联函数中设置

3. **编译器优化**
   ```cpp
   // 以下函数即使不标记 inline，编译器也可能自动内联
   int getMax(int a, int b) {
       return a > b ? a : b;
   }
   ```

4. **不适合内联的情况**
   ```cpp
   // 不适合内联的函数示例
   inline void complexFunction() {
       for(int i = 0; i < 1000; i++) {
           // 大量计算
       }
       // 复杂的控制流程
       switch(condition) {
           case 1: // ...
           case 2: // ...
       }
   }
   ```

* 建议
	1. 优先在头文件中定义内联函数
	2. 只将简单、小巧的函数声明为内联
	3. 让编译器自动决定是否内联
	4. 使用现代编译器的优化功能

## 9 类型强转(type cast)
