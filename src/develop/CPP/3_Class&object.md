
# 03. C++ 类与对象(Class &&object)


## 1 构造与析构

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

## 2 多文件编程

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

## 3 拷贝构造(Copy contructor)

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

## 4 赋值运算符重载

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

## 5 栈和堆上的对象

### 5.1 堆栈上的对象

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

### 5.2 栈上对象的引用

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


## 6 const & static 

### 6.1 const 修饰符

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

### 6.2 static 修饰符

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

### 6.3 `static const` 成员

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

## 7 成员指针

### 7.1 指向成员函数的指针

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

### 7.2 指向数据成员的指针

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

### 7.3 成员指针的实际应用

成员指针在以下场景特别有用：

1. 实现回调机制
2. 在运行时选择调用哪个成员函数
3. 创建通用的函数处理器

例如，创建一个函数来处理日期对象的不同操作：

```cpp
void processDate(Date& d, void (Date::*operation)()) {
    (d.*operation)();  // 执行指定的操作
}

int main() {
    Date d;
    processDate(d, &Date::init);  // 调用d.init()
    processDate(d, &Date::print); // 调用d.print()
    return 0;
}
```

需要注意的是，成员指针语法较为复杂，在现代C++中，通常使用函数对象、lambda表达式或std::function等更灵活的机制来实现类似功能。

## 8 作业

按需求设计一个圆类输入圆的半径和圆柱的高，依次输出圆周长、圆面积、圆球表面积、圆柱体积（以空格分隔，π取 3.14）。

编写C++程序完成以下功能： 1)定义一个 Point 类，其属性包括点的坐标，提供计算两点之间距离的方法；2)定义一个圆形类， a.其属性包括圆心和半径； b.创建两个圆形对象，提示用户输入圆心坐标和半径，判断两个圆是否相交，并输出结果。