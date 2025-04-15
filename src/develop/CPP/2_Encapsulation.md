---
category: C++
tags:
  - Cpp
---



# 02. C++ 封装(Encapsulation)

## 1 struct

C++中的结构体 (struct) 是一种自定义数据类型，允许将不同类型的数据组合在一起。以下是结构体的主要内容：

基本定义和使用：
````cpp
struct Person {
    // 成员变量
    string name;
    int age;
    
    // 成员函数
    void printInfo() {
        cout << "Name: " << name << ", Age: " << age << endl;
    }
};

// 使用结构体
Person p1 = {"Tom", 20};
p1.printInfo();
````

与class的区别：
- Struct默认成员是public，class默认是private
- Struct更适合用于简单的数据组织
- 功能上完全相同，都支持成员函数、继承等特性

嵌套结构体：
````cpp
struct Address {
    string street;
    string city;
};

struct Employee {
    string name;
    Address addr;    // 结构体嵌套
};
````

常见用法：
````cpp
// 结构体数组
Person team[5];

// 结构体指针
Person* p = new Person;
p->name = "Tom";    // 使用->访问成员

// 位域结构体
struct Flags {
    unsigned int flag1 : 1;    // 只占1位
    unsigned int flag2 : 2;    // 占2位
};
````

**注意事项：**

1. 内存对齐问题

结构体成员在内存中不是简单连续排列的，而是按照对齐规则存储：

````cpp
struct Example {
    char a;     // 1字节
    int b;      // 4字节
    char c;     // 1字节
};
````

上面的结构体大小通常不是6字节，而是12字节，因为：
- `a` 占1字节，但为了让 `b` 在4的倍数地址上，会填充3字节
- `b` 占4字节
- `c` 占1字节，可能再填充3字节以对齐整个结构体

这会影响：
- 结构体大小 (`sizeof`) 可能大于各成员大小之和
- 内存布局不是直观的连续排列
- 不同编译器可能有不同的对齐方式

2. 大结构体传参时用引用

当结构体包含大量数据时，传值会导致整个结构体被复制：

````cpp
// 低效 - 复制整个结构体
void processData(BigStruct data) { /*...*/ }

// 高效 - 只传递引用
void processData(const BigStruct& data) { /*...*/ }
````

使用引用可以：
- 避免不必要的内存复制
- 提高性能
- 减少栈空间使用

3. 包含指针成员时注意深浅拷贝

当结构体含有指针成员时：

````cpp
struct Document {
    char* text;
    int length;
};
````

默认的复制操作只会复制指针值，而不是指针指向的内容。这会导致：
- 两个结构体实例指向同一块内存
- 当一个实例释放内存时，另一个实例的指针变为悬空指针
- 需要自定义复制构造函数和赋值运算符实现深拷贝

4. 初始化方式灵活

C++提供多种初始化结构体的方式：

````cpp
struct Point {
    int x, y;
    Point(int a = 0, int b = 0) : x(a), y(b) {}
};

// 使用构造函数
Point p1(10, 20);

// 使用花括号列表(C++11)
Point p2 = {10, 20};
Point p3{10, 20};

// 成员逐个赋值
Point p4;
p4.x = 10;
p4.y = 20;
````

选择适合场景的初始化方式可以使代码更清晰、更容易维护。


## 2 类 (Class)

类是C++中实现面向对象编程的核心机制，它是一种用户自定义的数据类型，将数据和操作数据的函数封装在一起。类定义了一种对象的模板，指定了该类型的对象所包含的数据和可执行的操作。

类的基本结构：
```cpp
class 类名 {
public:
    // 公有成员（可被外部访问）
    // 成员函数和数据
    
private:
    // 私有成员（只能被类内部访问）
    // 成员函数和数据
    
protected:
    // 保护成员（只能被类内部和派生类访问）
    // 成员函数和数据
};
```

## 3 封装 (Encapsulation)

封装是面向对象编程的三大特性之一（另外两个是继承和多态），它指的是：

1. **将数据和操作数据的函数绑定在一起**，形成一个不可分割的整体
2. **隐藏对象的内部实现细节**，只向外界提供有限的访问接口
3. **保护数据免受外部干扰和不合理操作**

### 3.1 封装的实现方式

在您的代码示例中，`Date` 类展示了封装的基本实现：

```cpp
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

1. **数据隐藏**：`year`、`month` 和 `day` 被声明为私有成员，外部代码不能直接读写这些变量
2. **通过接口访问**：通过公有方法 `init()`、`print()` 和 `isLeapYear()` 提供对私有数据的访问和操作

### 3.2 封装的优势

1. **信息隐藏**：隐藏实现细节，减少模块间耦合
2. **提高安全性**：防止外部代码意外修改对象内部状态
3. **控制访问**：可以实现对数据的验证和限制
4. **提高可维护性**：可以修改类的内部实现而不影响使用该类的代码

### 3.3 使用范例分析

在您的 `Date` 类中：
- `init()` 方法控制日期的初始化（虽然没有验证有效性）
- `print()` 提供了日期的显示方式
- `isLeapYear()` 提供了基于内部数据的功能

客户端代码只需关注这些公开方法，而不需要了解内部实现：

```cpp
int main()
{
    Date d;         // 创建一个Date对象
    d.init();       // 通过公有方法初始化
    d.print();      // 通过公有方法显示
    // 使用功能而不关心内部实现
    if (d.isLeapYear())
        cout << "leap year" << endl;
    else
        cout << "not leap year" << endl;
    return 0;
}
```

封装使得代码更模块化、更安全，且更易于理解和维护，是面向对象编程的关键原则之一。