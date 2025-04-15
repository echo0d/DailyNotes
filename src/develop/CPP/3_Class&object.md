---
category: C++
tags:
  - Cpp
---

# 03. C++ 类与对象(Class &&object)


## 1 类成员函数&访问修饰符
### 1.1 类成员函数

类的成员函数是指那些把定义和原型写在类定义内部的函数，就像类定义中的其他变量一样。类成员函数是类的一个成员，它可以操作类的任意对象，可以访问对象中的所有成员。

成员函数可以定义在类定义内部，或者单独使用**范围解析运算符 ::** 来定义。在类定义中定义的成员函数把函数声明为**内联**的，即便没有使用 inline 标识符。所以您可以按照如下方式定义 **getVolume()** 函数：

```cpp
class Box
{
   public:
      double length;      // 长度
      double breadth;     // 宽度
      double height;      // 高度
   
      double getVolume(void)
      {
         return length * breadth * height;
      }
};
```

您也可以在类的外部使用**范围解析运算符 ` :: `** 定义该函数，如下所示：

```cpp
double Box::getVolume(void)
{
    return length * breadth * height;
}
```

在这里，需要强调一点，在 :: 运算符之前必须使用类名。调用成员函数是在对象上使用点运算符（**.**），这样它就能操作与该对象相关的数据，如下所示：

```cpp
Box myBox; // 创建一个对象 
myBox.getVolume(); // 调用该对象的成员函数
```

### 1.2 类访问修饰符

C++提供了三种主要的访问修饰符，用于控制类成员（变量和函数）的访问权限：

1. Public

- 可以在类的内部和外部直接访问
- 类的对象可以直接访问public成员
- 在您的代码中，`length` 是public成员，因此可以直接通过 `box.length = 10.0` 来访问

2. Private

- 只能在类的内部访问，外部无法直接访问
- 在您的代码中，`width` 是private成员，无法通过 `box.width = 10.0` 直接访问
- 必须通过public方法如 `setWidth()` 和 `getWidth()` 来间接访问

3. Protected

- 在您的代码中没有使用，但它是C++的第三种访问修饰符
- 类似于private，但允许派生类 (子类) 访问
- 对于类的对象和外部函数仍然是不可见的


## 2 友元

C++中的友元是一种允许非成员函数或其他类访问类的私有和保护成员的机制。友元打破了类的封装性，但在特定情况下非常有用。

友元主要有以下几种类型：

1. **友元函数** - 允许普通函数访问类的私有成员：
   ```cpp
   class Box {
   private:
       double length;
   public:
       // 声明一个友元函数
       friend void printLength(Box box);
   };
   
   // 友元函数实现，可以直接访问Box的私有成员
   void printLength(Box box) {
       cout << "Length: " << box.length << endl;
   }
   ```

2. **友元类** - 允许另一个类访问当前类的所有私有和保护成员：
   ```cpp
   class BoxManager {
   public:
       void updateBox(Box& box) {
           // 可以直接访问Box的私有成员
           box.length = 10.0; 
       }
   };
   
   class Box {
   private:
       double length;
   public:
       // 声明BoxManager为友元类
       friend class BoxManager;
   };
   ```

3. **友元成员函数** - 允许另一个类的特定成员函数访问当前类的私有成员：
   ```cpp
   class Box {
   private:
       double length;
   public:
       // 仅声明特定的成员函数为友元
       friend void BoxManager::resize(Box& box);
   };
   ```

友元的应用场景：

- 运算符重载（特别是二元运算符）
- 需要高效访问两个紧密相关类的私有数据
- 需要从外部函数访问类的内部状态进行测试或调试

需要注意的是：
- 友元关系不是相互的，A是B的友元并不意味着B是A的友元
- 友元关系不能被继承
- 过度使用友元会破坏封装性，增加代码的耦合度

友元在平衡封装性和灵活性之间提供了一种有用的机制，但应谨慎使用，以免破坏面向对象的设计原则。
```cpp
#include <iostream>

using namespace std;

class Box
{
    double width;
public:
    friend void printWidth(Box box);
    friend class BigBox;
    void setWidth(double wid);
};

class BigBox
{
public :
    void Print(int width, Box &box)
    {
        // BigBox是Box的友元类，它可以直接访问Box类的任何成员
        box.setWidth(width);
        cout << "Width of box : " << box.width << endl;
    }
};

// 成员函数定义
void Box::setWidth(double wid)
{
    width = wid;
}

// 请注意：printWidth() 不是任何类的成员函数
void printWidth(Box box)
{
    /* 因为 printWidth() 是 Box 的友元，它可以直接访问该类的任何成员 */
    cout << "Width of box : " << box.width << endl;
}

// 程序的主函数
int main()
{
    Box box;
    BigBox big;

    // 使用成员函数设置宽度
    box.setWidth(10.0);

    // 使用友元函数输出宽度
    printWidth(box);

    // 使用友元类中的方法设置宽度
    big.Print(20, box);

    getchar();
    return 0;
}
```

## 3 构造与析构

在C++中，构造函数和析构函数是类中特殊的成员函数，它们在对象的生命周期中扮演着关键角色。

构造函数在对象创建时自动调用，负责初始化对象的数据成员。它与类同名，没有返回类型，可以有多个版本（重载）。构造函数的主要作用是确保对象在创建时处于有效状态。例如，如果要为Date类添加构造函数，可以这样写：

```cpp
class Date {
public:
    // 默认构造函数
    Date() : year(2000), month(1), day(1) {}
    
    // 带参数的构造函数
    Date(int y, int m, int d) : year(y), month(m), day(d) {}
    
    // 其他成员...
private:
    int year;
    int month;
    int day;
};
```

构造函数使用初始化列表（冒号后面的部分）是初始化成员的推荐方式，它比在函数体内赋值更高效。有了构造函数后，创建对象变得更加简洁：

```cpp
Date today;           // 使用默认构造函数，日期为2000-1-1
Date birthday(1990, 5, 15);  // 使用带参数构造函数
```

与构造函数相对的是析构函数，它在对象销毁时自动调用。析构函数名称是类名前加波浪号 (~)，没有参数，没有返回类型，且每个类只能有一个析构函数。析构函数主要用于释放对象占用的资源，如动态内存、打开的文件或数据库连接等。

```cpp
class Date {
public:
    // 构造函数
    Date() : year(2000), month(1), day(1) {
        cout << "Date object created" << endl;
    }
    
    // 析构函数
    ~Date() {
        cout << "Date object destroyed" << endl;
    }
    
    // 其他成员...
};
```

当对象生命周期结束时（如局部对象离开作用域，或动态分配的对象被delete），析构函数自动调用。在Date类中可能不需要特别的清理工作，因为它只包含基本类型的成员，但对于管理资源的类，析构函数至关重要。

构造函数和析构函数共同构成了C++的RAII (资源获取即初始化) 机制，使资源管理变得自动化和安全。例如，处理动态内存的类可能在构造函数中分配内存，在析构函数中释放内存，这样可以防止内存泄漏。

当类没有显式定义构造函数时，编译器会生成一个默认构造函数，但它可能不会初始化成员变量（基本类型成员将包含垃圾值）。同样，如果没有定义析构函数，编译器也会生成一个默认版本。但对于管理资源的类，您几乎总是需要自己定义这些特殊函数。

在实际开发中，合理设计构造和析构函数是编写健壮C++类的基础，它们确保对象的创建和销毁过程安全、可预测，并符合资源管理的最佳实践。

## 4 多文件编程

C++的多文件编程是组织和管理大型项目的重要技术，它允许我们将程序分散到多个文件中，增强代码的可读性、可维护性和可复用性。

在多文件编程中，通常将类的声明和实现分开：类的声明（类定义）放在头文件 (. H或. Hpp) 中，而类的实现（成员函数定义）放在源文件 (. Cpp) 中。这种分离有助于隐藏实现细节，只向用户展示接口。

以Date类为例，我们可以将其拆分为多文件形式：

首先创建一个头文件 `Date.h`：

```cpp
#ifndef DATE_H  // 防止头文件重复包含
#define DATE_H

#include <iostream>

class Date
{
public:
    void init();
    void print();
    bool isLeapYear();

private:
    int year;
    int month;
    int day;
};

#endif // DATE_H
```

然后创建实现文件 `Date.cpp`：

```cpp
#include "Date.h"  // 包含自己的头文件
using namespace std;

void Date::init()
{
    cout << "year,month,day:" << endl;
    cin >> year >> month >> day;
}

void Date::print()
{
    cout << "year month day" << endl;
    cout << year << ":" << month << ":" << day << endl;
}

bool Date::isLeapYear()
{
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
        return true;
    else
        return false;
}
```

最后，创建主程序文件 `main.cpp`：

```cpp
#include "Date.h"
using namespace std;

int main()
{
    Date d;
    d.init();
    d.print();
    if (d.isLeapYear())
        cout << "leap year" << endl;
    else
        cout << "not leap year" << endl;
    return 0;
}
```

多文件编程的优势包括：

1. 提高代码的可维护性，一个文件专注于一个功能模块
2. 实现信息隐藏，用户只需关注头文件中的接口
3. 加速编译过程，修改一个文件只需重新编译该文件
4. 方便多人协作开发，不同人员可以负责不同的文件
5. 促进代码复用，通过头文件可以在多个项目中使用相同的类

编译多文件程序时，需要将所有源文件一起编译，或分别编译后链接：

```
g++ -o program main.cpp Date.cpp
```

或者：

```
g++ -c main.cpp
g++ -c Date.cpp
g++ -o program main.o Date.o
```

在多文件编程中，头文件保护（如 `#ifndef` 和 `#define` 指令）非常重要，可以防止头文件被重复包含导致的编译错误。另外，头文件中应该只包含必要的声明，避免包含太多实现细节。

## 5 拷贝构造(Copy contructor)

C++中的拷贝构造函数是一种特殊的构造函数，它用于创建一个对象的副本。当我们需要基于已有对象创建新对象时，拷贝构造函数会被调用。

拷贝构造函数的特点是它接受同类型的常量引用作为参数。对于Date类，一个拷贝构造函数可以这样定义：

```cpp
class Date
{
public:
    // 现有成员函数
    void init();
    void print();
    bool isLeapYear();
    
    // 拷贝构造函数
    Date(const Date& other)
    {
        this->year = other.year;
        this->month = other.month;
        this->day = other.day;
    }

private:
    int year;
    int month;
    int day;
};
```

拷贝构造函数会在以下情况被自动调用：

1. 用一个对象初始化另一个同类对象：
   ```cpp
   Date original;
   original.init();
   Date copy = original;  // 调用拷贝构造函数
   ```

2. 将对象作为参数按值传递给函数：
   ```cpp
   void displayDate(Date d) { d.print(); }
   
   Date original;
   displayDate(original);  // original被拷贝
   ```

3. 函数返回对象（按值返回）：
   ```cpp
   Date getToday() {
       Date d;
       d.init();
       return d;  // 返回时可能调用拷贝构造
   }
   ```

如果您没有定义拷贝构造函数，编译器会生成一个默认的拷贝构造函数，它会执行成员的逐个拷贝（浅拷贝）。对于像Date这样只包含基本类型的简单类，默认拷贝构造通常就足够了。

但当类包含指针成员或管理动态资源时，默认的浅拷贝可能导致问题，因为多个对象会指向同一块内存。这时需要自定义拷贝构造函数来执行深拷贝，确保每个对象拥有自己的资源副本。

拷贝构造是C++中实现对象复制的重要机制，与赋值运算符重载一起，构成了类的复制控制功能。在需要精确控制对象复制行为的场合，正确实现拷贝构造函数是必不可少的。

如果类管理动态分配的资源（如指针成员），则必须实现深拷贝以避免多个对象共享同一资源导致的问题。例如：

```cpp
class StringHolder {
public:
    // 构造函数
    StringHolder(const char* str) {
        if (str) {
            length = strlen(str);
            data = new char[length + 1];
            strcpy(data, str);
        } else {
            length = 0;
            data = new char[1];
            data[0] = '\0';
        }
    }
    
    // 拷贝构造函数（深拷贝）
    StringHolder(const StringHolder& other) {
        length = other.length;
        data = new char[length + 1];  // 为新对象分配独立内存
        strcpy(data, other.data);     // 复制内容
    }
    
    // 析构函数释放内存
    ~StringHolder() {
        delete[] data;
    }

private:
    char* data;
    size_t length;
};
```

这个例子中的拷贝构造函数执行了深拷贝，确保每个对象拥有自己独立的内存空间，避免了资源共享带来的问题。


## 6 内联函数

C++ **内联函数**是通常与类一起使用。如果一个函数是内联的，那么在编译时，编译器会把该函数的代码副本放置在每个调用该函数的地方。

如果想把一个函数定义为内联函数，则需要在函数名前面放置关键字 **inline**，在调用函数之前需要对函数进行定义。

在类定义中的定义的函数都是内联函数，即使没有使用 **inline** 说明符。

只有当函数只有 10 行甚至更少时才将其定义为内联函数.

```cpp
#include <iostream>
 
using namespace std;

inline int Max(int x, int y)
{
   return (x > y)? x : y;
}

// 程序的主函数
int main( )
{

   cout << "Max (20,10): " << Max(20,10) << endl;
   cout << "Max (0,200): " << Max(0,200) << endl;
   cout << "Max (100,1010): " << Max(100,1010) << endl;
   return 0;
}

```





## 7 const & static 

### 7.1 const 修饰符

在`Date`类中，可以使用`const`修饰不修改对象状态的成员函数，表明这些函数不会改变对象的数据成员：

```cpp
class Date
{
public:
    void init();  // 不是const，因为修改了对象的状态
    void print() const;  // 可以是const，因为只是读取数据
    bool isLeapYear() const;  // 可以是const，因为只是读取并计算

private:
    int year;
    int month;
    int day;
};
```

`const`成员函数的实现也需要相应的修饰：

```cpp
void Date::print() const
{
    cout << "year month day" << endl;
    cout << year << ":" << month << ":" << day << endl;
}

bool Date::isLeapYear() const
{
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
        return true;
    else
        return false;
}
```

使用`const`成员函数的好处包括：

1. 明确表示函数不会修改对象的状态
2. 允许对常量对象调用该函数
3. 编译器会检查确保函数不会修改任何成员变量

在代码中使用常量对象时，只能调用`const`成员函数：

```cpp
int main()
{
    const Date fixedDate = {2024, 4, 14};  // 创建常量对象
    // fixedDate.init();  // 错误！不能对常量对象调用非const成员函数
    fixedDate.print();    // 正确，可以调用const成员函数
    
    if (fixedDate.isLeapYear())
        cout << "leap year" << endl;
    else
        cout << "not leap year" << endl;
        
    return 0;
}
```

`const`还可以用于函数参数和返回值，特别是在传递对象引用时：

```cpp
void displayDate(const Date& date)  // 使用const引用避免复制并防止修改
{
    date.print();
}

const Date& getEarlierDate(const Date& date1, const Date& date2)
{
    // 比较逻辑...
    if (条件)
        return date1;
    else
        return date2;
}
```

对于 `Date` 类，建议对不修改对象状态的函数都添加 `const` 修饰符，这样可以增强代码的安全性和清晰度。

### 7.2 static 修饰符

C++中的 `static` 修饰符用于类成员（变量和函数）时，表示该成员属于类本身，而不是类的实例。静态成员在所有对象间共享，只有一个副本存在于内存中，无论创建了多少个对象。

静态成员变量必须在类外进行初始化，通常在某个源文件（.cpp文件）中定义。对于`Date`类，可以添加一些静态成员的例子：

```cpp
class Date
{
public:
    void init();
    void print();
    bool isLeapYear();
    
    // 静态成员函数，判断给定年份是否闰年
    static bool isLeapYear(int y);
    
    // 返回已创建的Date对象总数
    static int getCount();

private:
    int year;
    int month;
    int day;
    
    // 静态成员变量，记录创建的对象数量
    static int count;
};

// 在类外初始化静态成员变量
int Date::count = 0;

// 静态成员函数的实现
bool Date::isLeapYear(int y)
{
    return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
}

int Date::getCount()
{
    return count;
}
```

然后在构造函数中增加计数器：

```cpp
// 构造函数
Date::Date()
{
    year = 2000;
    month = 1;
    day = 1;
    count++;  // 增加对象计数
}

// 析构函数
Date::~Date()
{
    count--;  // 减少对象计数
}
```

静态成员有以下特点：

1. 静态成员变量属于整个类，所有对象共享一个副本
2. 静态成员函数不能访问非静态成员，因为它们不与任何对象关联
3. 静态成员可以通过类名直接访问，无需创建对象

使用静态成员的示例：

```cpp
int main()
{
    // 通过类名调用静态函数
    if (Date::isLeapYear(2024))
        cout << "2024 is a leap year" << endl;
    
    Date d1;
    Date d2;
    
    cout << "Number of Date objects: " << Date::getCount() << endl;  // 输出2
    
    return 0;  // 对象销毁时，count减为0
}
```

静态成员的常见用途包括：

1. 记录类的实例数量
2. 实现单例模式（确保一个类只有一个实例）
3. 提供不需要对象状态的工具函数
4. 在对象之间共享数据

添加静态成员可以增强 `Date` 类的功能性和实用性，特别是当需要跟踪或共享与日期相关的通用信息时。



#### 7.2.1 举例

**静态函数实现**

```cpp
class Point {
private:
    double x, y;

public:
    Point(double x, double y) : x(x), y(y) {}

    static double distance(const Point& point1, const Point& point2) {
        return sqrt(pow(point1.x - point2.x, 2) + pow(point1.y - point2.y, 2));
    }
};

```

调用方式：

```cpp
Point p1(1.0, 2.0);
Point p2(4.0, 6.0);
double dist = Point::distance(p1, p2);

```

**非静态函数实现**

```cpp
class Point {
private:
    double x, y;

public:
    Point(double x, double y) : x(x), y(y) {}

    double distance(const Point& other) const {
        return sqrt(pow(x - other.x, 2) + pow(y - other.y, 2));
    }
};

```

调用方式：

```cpp
Point p1(1.0, 2.0);
Point p2(4.0, 6.0);
double dist = p1.distance(p2);
```



**1. 非静态函数需要依赖对象实例**

- **当前实现（`static`）**：
  - `distance` 是一个静态成员函数，与具体的 `Point` 对象无关。
  - 调用时可以直接通过类名调用，例如：`Point::distance(point1, point2)`。
  - 静态函数不能访问类的非静态成员变量（如 `x` 和 `y`），因为它不依赖于任何对象实例。

- **如果去掉 `static`**：
  - `distance` 将变成一个非静态成员函数，必须通过某个 `Point` 对象调用。
  - 例如：`point1.distance(point2)`，此时 `distance` 函数的第一个参数隐式绑定到调用它的对象 `point1`。

**2. 函数签名的变化**

- **当前签名（静态函数）**：
```cpp
  static double distance(const Point& point1, const Point& point2);
  
```
  - 需要显式传入两个 `Point` 对象作为参数。

- **去掉 `static` 后的签名**：
  
```cpp
  double distance(const Point& other) const;
  
```
  - 只需要传入一个 `Point` 对象作为参数，另一个 `Point` 对象是调用该函数的对象（`this` 指针）。

**3. 使用方式的变化**

**当前（静态函数）**

调用方式：

```cpp
Point point1(1.0, 2.0);
Point point2(4.0, 6.0);
double dist = Point::distance(point1, point2); // 通过类名调用

```

**去掉 `static` 后（非静态函数）**

调用方式：

```cpp
Point point1(1.0, 2.0);
Point point2(4.0, 6.0);
double dist = point1.distance(point2); // 通过对象调用

```

**4. 设计上的影响**

- **静态函数的优点**：
  - 逻辑上更清晰：`distance` 函数的功能是计算两点之间的距离，与某个具体的 `Point` 对象无关，因此设计为静态函数更符合直觉。
  - 更灵活：可以直接通过类名调用，而不需要依赖某个对象实例。

- **非静态函数的优点**：
  - 如果 `distance` 函数的逻辑需要频繁使用调用对象的成员变量（如 `x` 和 `y`），设计为非静态函数可能更方便。
  - 例如，调用 `point1.distance(point2)` 时，`point1` 的坐标可以直接通过 `this` 指针访问。

**5. 性能上的影响**

- **静态函数**：
  - 不需要传递隐式的 `this` 指针，调用开销略低。
  - 更适合与类的实例无关的功能。

- **非静态函数**：
  - 需要传递隐式的 `this` 指针，调用开销略高。
  - 适合需要访问调用对象的成员变量的功能。

**6. 结论**

- **保留 `static`**：
  - 如果 `distance` 函数的逻辑与具体的 `Point` 对象无关（如当前实现），设计为静态函数更合理。
  - 适合计算两点之间的距离这种独立于对象的功能。

- **去掉 `static`**：
  - 如果希望通过调用对象直接计算与另一个点的距离，设计为非静态函数更方便。
  - 适合需要频繁访问调用对象的成员变量的功能。

在上面的场景中，`distance` 函数的逻辑与具体的 `Point` 对象无关，因此保留 `static` 是更好的选择。



### 7.3 `static const` 成员

`static const` 成员是C++类中的特殊成员，它们结合了静态成员的共享性和常量成员的不可修改性。这种成员在所有对象间共享，并且在程序执行期间其值不会改变。

对于`Date`类，可以添加一些`static const`成员来表示与日期相关的常量：

```cpp
class Date
{
public:
    void init();
    void print();
    bool isLeapYear();

    // 静态常量成员，表示月份数
    static const int MONTHS_IN_YEAR = 12;
    
    // 静态常量数组必须在类外定义
    static const int DAYS_IN_MONTH[12];
    
    // 获取某月的天数
    static int getDaysInMonth(int month, bool isLeap);

private:
    int year;
    int month;
    int day;
};

// 在类外定义静态常量数组
const int Date::DAYS_IN_MONTH[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

// 静态方法实现
int Date::getDaysInMonth(int month, bool isLeap)
{
    if (month < 1 || month > MONTHS_IN_YEAR)
        return 0;  // 无效月份
        
    if (month == 2 && isLeap)
        return 29;  // 闰年2月
        
    return DAYS_IN_MONTH[month-1];
}
```

`static const`成员的特点：

1. 整型和枚举类型的`static const`成员可以直接在类内初始化
2. 其他类型的`static const`成员（如数组）必须在类外定义
3. 这些成员可以通过类名直接访问，不需要创建对象
4. 它们在编译时确定值，可以用在需要编译时常量的场合

使用这些静态常量的例子：

```cpp
int main()
{
    // 通过类名访问静态常量
    cout << "Months in a year: " << Date::MONTHS_IN_YEAR << endl;
    
    // 使用静态方法
    int daysInFeb2024 = Date::getDaysInMonth(2, Date::isLeapYear(2024));
    cout << "Days in February 2024: " << daysInFeb2024 << endl;
    
    Date d;
    d.init();
    d.print();
    
    // 检查日期是否有效
    if (d.month > 0 && d.month <= Date::MONTHS_IN_YEAR)
        cout << "Valid month" << endl;
        
    return 0;
}
```

`static const`成员的常见用途：

1. 定义类相关的常量，如最大值、最小值、默认值等
2. 替代#define宏定义，提供类型安全和作用域控制
3. 实现编译时常量，可用于数组大小、case标签等需要编译时常量的场合

添加这些静态常量可以使 `Date` 类更加完善，并提高代码的可读性和可维护性。

C++中的指向类成员的指针是一种特殊的指针类型，它允许我们访问类的成员函数和数据成员。这种指针与普通指针不同，因为它需要与对象实例结合使用才能访问实际成员。

## 8 指针

### 8.1 This 指针

C++中的this指针是一个特殊的隐式指针，它指向调用成员函数的当前对象。每个非静态成员函数都包含一个this指针，无需定义就可以在函数内部使用。
```cpp
#include <iostream>
 
using namespace std;
 
class Box
{
   public:
      // 构造函数定义
      Box(double l=2.0, double b=2.0, double h=2.0)
      {
         cout <<"调用构造函数。" << endl;
         length = l;
         breadth = b;
         height = h;
      }
      double Volume()
      {
         return length * breadth * height;
      }
      int compare(Box box)
      {
         return this->Volume() > box.Volume();
      }
   private:
      double length;     // 宽度
      double breadth;    // 长度
      double height;     // 高度
};
 
int main(void)
{
   Box Box1(3.3, 1.2, 1.5);    // 声明 box1
   Box Box2(8.5, 6.0, 2.0);    // 声明 box2
 
   if(Box1.compare(Box2))
   {
      cout << "Box2 的体积比 Box1 小" <<endl;
   }
   else
   {
      cout << "Box2 的体积大于或等于 Box1" <<endl;
   }
   return 0;
}

```

**this指针的主要用途：**

- 区分成员变量和同名参数：
  ```cpp
  void setLength(double length) {
      this->length = length; // this->length是成员变量，length是参数
  }
  ```

- 返回对象自身以支持链式调用：
  ```cpp
  Box& setDimensions(double l) {
      length = l;
      return *this; // 返回当前对象的引用
  }
  // 使用方式: Box1.setDimensions(5.0).setWidth(3.0);
  ```

- 在成员函数中引用当前对象：
  ```cpp
  int compare(Box box) {
      return this->Volume() > box.Volume();
  }
  ```

在您的代码中，`compare` 方法使用this指针调用当前Box对象的Volume () 方法，并与参数box对象的Volume () 进行比较：
```cpp
int compare(Box box) {
    return this->Volume() > box.Volume();
}
```

虽然可以简写为 `Volume() > box.Volume()`，但使用this->可以让代码更加明确，表示调用的是当前对象的方法。

注意，静态成员函数不含this指针，因为它们不属于特定对象，而this指针本身不能被修改。


### 8.2 指向类的指针

一个指向 C++ 类的指针与指向结构的指针类似，访问指向类的指针的成员，需要使用成员访问运算符 **->**，就像访问指向结构的指针一样。与所有的指针一样，您必须在使用指针之前，对指针进行初始化。

在 C++ 中，指向类的指针指向一个类的对象，与普通的指针相似，指向类的指针可以用于访问对象的成员变量和成员函数。

```cpp
#include <iostream>

class MyClass {
public:
    int data;

    void display() {
        std::cout << "Data: " << data << std::endl;
    }
};

int main() {
    // 创建类对象
    MyClass obj;
    obj.data = 42;

    // 声明和初始化指向类的指针
    MyClass *ptr = &obj;

    // 通过指针访问成员变量
    std::cout << "Data via pointer: " << ptr->data << std::endl;

    // 通过指针调用成员函数
    ptr->display();

    return 0;
}
```
### 8.3 指向成员函数的指针

指向成员函数的指针语法如下：
```cpp
返回类型 (类名::*指针名)(参数列表);
```

对于Date类，可以定义指向各个成员函数的指针：

```cpp
void (Date::*initPtr)() = &Date::init;
void (Date::*printPtr)() = &Date::print;
bool (Date::*isLeapYearPtr)() = &Date::isLeapYear;
```

要使用这些指针，需要一个类的实例以及特殊的调用语法：

```cpp
Date d;
(d.*initPtr)();    // 调用d.init()
(d.*printPtr)();   // 调用d.print()
bool leap = (d.*isLeapYearPtr)();  // 调用d.isLeapYear()
```

如果使用指向对象的指针，语法略有不同：

```cpp
Date* pd = new Date();
(pd->*initPtr)();  // 通过对象指针调用init()
(pd->*printPtr)(); // 通过对象指针调用print()
delete pd;
```

### 8.4 指向数据成员的指针

指向数据成员的指针语法如下：
```cpp
类型 类名::*指针名;
```

对于Date类的数据成员，可以定义：

```cpp
int Date::*yearPtr = &Date::year;
int Date::*monthPtr = &Date::month;
int Date::*dayPtr = &Date::day;
```

要访问这些成员，同样需要一个类的实例：

```cpp
Date d;
d.init();
cout << "Year: " << d.*yearPtr << endl;  // 访问d.year
cout << "Month: " << d.*monthPtr << endl; // 访问d.month
```

对于指向对象的指针：

```cpp
Date* pd = new Date();
pd->init();
cout << "Day: " << pd->*dayPtr << endl;  // 访问pd->day
delete pd;
```

### 8.5 总结

C++中的指针可以指向类、成员函数和数据成员，它们提供了灵活的编程方式。

**指向类的指针**

指向类对象的指针存储类对象的内存地址，使用方式如下：
```cpp
Box* boxPtr = new Box(3.0, 4.0, 5.0);  // 创建指向堆上Box对象的指针
Box box(2.0, 3.0, 4.0);
Box* boxPtr2 = &box;  // 指向栈上已存在对象的指针

// 访问成员和方法
double vol = boxPtr->Volume();  // 使用箭头操作符
boxPtr->length = 6.0;  // 如果length是public的话
```

**指向成员函数的指针**

这类指针可以指向类的特定成员函数：
```cpp
// 声明一个指向Box类的double(void)类型成员函数的指针
double (Box::*ptrToMember)() = &Box::Volume;

// 使用成员函数指针
Box box1(1.0, 2.0, 3.0);
double volume = (box1.*ptrToMember)();  // 对象调用

Box* boxPtr = &box1;
volume = (boxPtr->*ptrToMember)();  // 指针调用
```

**指向数据成员的指针**

这类指针指向类的数据成员：
```cpp
// 声明一个指向Box类double类型成员的指针
// 注意：这里只能指向public成员，无法指向private成员
double Box::*pData = &Box::length;  // 假设length是public

// 使用数据成员指针
Box box1(5.0, 6.0, 7.0);
double len = box1.*pData;  // 通过对象访问

Box* boxPtr = &box1;
len = boxPtr->*pData;  // 通过指针访问
```



## 9 赋值运算符重载

赋值运算符重载是C++中一项重要的特性，它允许我们自定义对象之间的赋值行为。当一个对象被赋值给同类型的另一个已存在的对象时，赋值运算符会被调用。

对于Date类，赋值运算符可以这样实现：

```cpp
class Date
{
public:
    void init();
    void print();
    bool isLeapYear();
    
    // 赋值运算符重载
    Date& operator=(const Date& other)
    {
        // 检查自赋值
        if (this != &other)
        {
            year = other.year;
            month = other.month;
            day = other.day;
        }
        return *this;  // 返回当前对象的引用
    }

private:
    int year;
    int month;
    int day;
};
```

赋值运算符重载的几个关键点：

1. 返回类型是 `Date&`（类的引用），这允许连续赋值操作（如 `a = b = c`）
2. 参数通常是常量引用（`const Date&`），以避免不必要的复制
3. 应检查自赋值情况（`this != &other`），防止自赋值导致的问题
4. 返回 `*this`，即当前对象的引用

赋值运算符与拷贝构造函数的区别：
- 拷贝构造函数用于初始化新对象
- 赋值运算符用于已存在对象之间的赋值

使用示例：

```cpp
int main()
{
    Date d1;
    d1.init();  // 用户输入第一个日期
    
    Date d2;
    // 使用赋值运算符将d1赋值给d2
    d2 = d1;
    
    cout << "d2 after assignment:" << endl;
    d2.print();
    
    return 0;
}
```

对于只包含基本类型成员的简单类（如Date类），编译器生成的默认赋值运算符通常就足够了。但如果类管理动态资源（如指针成员），就需要自定义赋值运算符来执行深拷贝，避免多个对象共享同一资源导致的问题。

例如，对于管理动态内存的类：

```cpp
StringHolder& operator=(const StringHolder& other)
{
    if (this != &other)
    {
        // 释放当前资源
        delete[] data;
        
        // 分配新内存并复制数据
        length = other.length;
        data = new char[length + 1];
        strcpy(data, other.data);
    }
    return *this;
}
```

赋值运算符重载是C++中实现类资源管理的重要机制，与拷贝构造函数、移动构造函数一起构成了C++的复制控制功能。

## 10 栈和堆上的对象

### 10.1 堆栈上的对象

C++中的对象可以在栈 (stack) 或堆 (heap) 上创建，这两种内存区域有着不同的生命周期和管理方式。此外，我们还可以创建对象数组，即多个相同类型对象的集合。

在栈上创建对象通常使用直接声明的方式，这种对象会在其作用域结束时自动销毁：

```cpp
void someFunction() {
    Date today;           // 在栈上创建Date对象
    today.init();
    today.print();
    // 函数结束时，today自动销毁
}
```

堆上的对象是通过 `new` 运算符动态分配的，必须使用 `delete` 手动释放，否则会导致内存泄漏：

```cpp
int main() {
    Date* pDate = new Date;  // 在堆上创建Date对象
    pDate->init();
    pDate->print();
    
    // 使用完毕后必须手动释放
    delete pDate;
    
    return 0;
}
```

对象数组可以在栈上或堆上创建：

栈上的对象数组：
```cpp
int main() {
    Date dates[3];  // 创建包含3个Date对象的数组
    
    // 初始化和使用数组中的对象
    for(int i = 0; i < 3; i++) {
        dates[i].init();
        dates[i].print();
    }
    
    // 数组在函数结束时自动销毁
    return 0;
}
```

堆上的对象数组：
```cpp
int main() {
    Date* dateArray = new Date[5];  // 在堆上创建5个Date对象的数组
    
    // 初始化和使用数组中的对象
    for(int i = 0; i < 5; i++) {
        dateArray[i].init();
        dateArray[i].print();
    }
    
    // 必须使用delete[]释放数组
    delete[] dateArray;
    
    return 0;
}
```

栈上对象和堆上对象的主要区别：

1. 内存管理：栈对象自动管理，堆对象需手动释放
2. 生命周期：栈对象的生命周期限于创建它的作用域，堆对象的生命周期由程序员控制
3. 大小限制：栈的大小通常较小且固定，堆的大小通常较大且可动态增长
4. 创建速度：栈上分配内存通常比堆上分配更快

在实际编程中，对于生命周期明确且大小固定的小对象，通常优先使用栈；而对于生命周期不确定、大小可变或很大的对象，则使用堆。现代C++还推荐使用智能指针（如 `std::unique_ptr` 和 `std::shared_ptr`）来管理堆上的对象，以避免内存泄漏问题。

### 10.2 栈上对象的引用

在C++中，从函数返回在函数内部（栈上）创建的对象有两种方式：返回对象本身或返回对象的引用。这两种方式有着根本的区别，特别是在内存安全方面。

返回栈上对象本身是安全的，因为会创建对象的副本：

```cpp
Date getDate() {
    Date localDate;  // 在函数栈上创建对象
    localDate.init();
    return localDate;  // 返回对象的副本
}

int main() {
    Date d = getDate();  // 安全，d接收了localDate的副本
    d.print();
    return 0;
}
```

当函数返回localDate时，会调用拷贝构造函数创建该对象的副本，然后返回这个副本。当函数结束时，localDate被销毁，但返回的副本仍然有效。

而返回栈上对象的引用是危险的，会导致悬空引用：

```cpp
Date& getBadDate() {
    Date localDate;  // 在函数栈上创建对象
    localDate.init();
    return localDate;  // 危险！返回即将销毁对象的引用
}

int main() {
    Date& d = getBadDate();  // 危险！d引用了已销毁的对象
    d.print();  // 未定义行为，可能崩溃或输出垃圾值
    return 0;
}
```

在上面的例子中，当getBadDate () 函数结束时，localDate对象被销毁，但d仍然引用这个已经不存在的对象。尝试使用d会导致未定义行为。

正确的做法是，如果要返回引用，应该返回堆上分配的对象的引用，或返回传入的对象的引用，或返回类的静态成员的引用：

```cpp
// 返回堆上对象的引用（但调用者需要负责删除）
Date& getHeapDate() {
    Date* pDate = new Date;
    pDate->init();
    return *pDate;
}

// 返回传入对象的引用
Date& modifyDate(Date& d) {
    // 修改d
    return d;
}

// 返回静态成员的引用
Date& getDefaultDate() {
    static Date defaultDate;  // 静态对象，不会随函数返回而销毁
    defaultDate.init();
    return defaultDate;
}
```

总之，永远不要返回函数内部栈上创建的局部对象的引用，这是导致程序错误的常见原因。
## 11 作业

设计一个圆类，输入圆的半径和圆柱的高，依次输出圆周长、圆面积、圆球表面积、圆柱体积（以空格分隔，π取 3.14）。
```cpp
#include <iostream>

class circle
{
private:
    /* data */
    float radius; //圆的半径
    float high; //圆的高
    float area; //圆的面积
    float circumference; //圆的周长
    float volume; //圆的体积
    float surface; //圆的表面积
    static const float PI; // 静态常量 圆周率

public:
    circle(float r = 0, float h = 0); //构造函数
    ~circle();

    // 计算圆周长
    float calculateCircumference();

    // 计算圆面积
    float calculateArea();

    // 计算圆球表面积
    float calculateSphereArea();

    // 计算圆柱体积
    float calculateCylinderVolume();
};

// 在类外初始化静态常量
const float circle::PI = 3.14;

circle::circle(float r, float h)
{
    radius = r;
    high = h;
}

circle::~circle()
{
}

float circle::calculateCircumference()
{
    circumference = 2 * PI * radius;
    return circumference;
}

float circle::calculateArea()
{
    area = PI * radius * radius;
    return area;
}

float circle::calculateSphereArea()
{
    surface = 4 * PI * radius * radius;
    return surface;
}

float circle::calculateCylinderVolume()
{
    volume = PI * radius * radius * high;
    return volume;
}

int main()
{
    float radius, high;

    // 输入半径和高
    std::cin >> radius >> high;

    // 创建circle对象并设置值
    circle c(radius, high);

    // 计算并输出结果，以空格分隔
    std::cout << c.calculateCircumference() << " "
        << c.calculateArea() << " "
        << c.calculateSphereArea() << " "
        << c.calculateCylinderVolume() << std::endl;

    return 0;
}

```



 1)定义一个 Point 类，其属性包括点的坐标，提供计算两点之间距离的方法；2)定义一个圆形类， a.其属性包括圆心和半径； b.创建两个圆形对象，提示用户输入圆心坐标和半径，判断两个圆是否相交，并输出结果。

**Point.h**

```cpp
#pragma once
class Point
{

private:
	double x;
	double y;

public:
	Point(double x, double y) : x(x), y(y)
	{
	}

	static double distance(const Point& point1, const Point& point2)
	{
		return sqrt(pow(point1.x - point2.x, 2) + pow(point1.y - point2.y, 2));
	}
};


```

**Circle.h**

```cpp
#pragma once  
#include "Point.h"  
class Circle  
{  
private:  
Point center; // 圆心  
double radius; // 半径  

public:  
// 构造函数  
Circle(const Point& center, double radius) : center(center), radius(radius) {}

// 获取圆心  
const Point& getCenter() const { return center; }  

// 获取半径  
double getRadius() const { return radius; }  

// 判断两个圆是否相交  
static bool isIntersecting(const Circle& circle1, const Circle& circle2) {  
	double distance = Point::distance(circle1.getCenter(), circle2.getCenter());  
	return distance <= (circle1.getRadius() + circle2.getRadius());  
}  
};

```

**GeometryUtils.cpp**

```cpp
#include <iostream>
#include "Circle.h"

int main() {
    // 提示用户输入第一个圆的圆心坐标和半径
    double x1, y1, r1;
    std::cout << "Enter the center (x, y) and radius of the first circle: ";
    std::cin >> x1 >> y1 >> r1;

    // 提示用户输入第二个圆的圆心坐标和半径
    double x2, y2, r2;
    std::cout << "Enter the center (x, y) and radius of the second circle: ";
    std::cin >> x2 >> y2 >> r2;

    // 创建两个圆形对象
    Circle circle1(Point(x1, y1), r1);
    Circle circle2(Point(x2, y2), r2);

    // 判断两个圆是否相交
    if (Circle::isIntersecting(circle1, circle2)) {
        std::cout << "The two circles intersect." << std::endl;
    }
    else {
        std::cout << "The two circles do not intersect." << std::endl;
    }

    return 0;
}
```

