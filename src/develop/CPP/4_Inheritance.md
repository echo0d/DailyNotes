---
category: C++
tags:
  - Cpp
---

# 04. C++ 继承

C++中的继承是面向对象编程的核心特性之一，允许创建新类（派生类）基于现有类（基类）的属性和行为。

## 1 继承基础

```cpp
class BaseClass {
   // 基类成员...
};

class DerivedClass : public BaseClass {
   // 派生类成员...
};
```

**构造函数与析构函数在继承中的调用顺序**
- 创建派生类对象时：先调用基类构造函数，再调用派生类构造函数
- 销毁派生类对象时：先调用派生类析构函数，再调用基类析构函数

**继承的好处**
1. 代码重用：避免重复编写相同功能
2. 建立类层次结构：反映现实世界的关系
3. 多态性：通过基类指针/引用操作派生类对象

## 2 继承类型

C++支持三种主要的继承类型，通过不同的访问修饰符控制：

1. **公有继承（public）**：
   - 基类的公有成员在派生类中仍是公有成员
   - 基类的保护成员在派生类中仍是保护成员
   - 基类的私有成员在派生类中不可访问

2. **保护继承（protected）**：
   - 基类的公有和保护成员在派生类中变为保护成员
   - 基类的私有成员在派生类中不可访问

3. **私有继承（private）**：
   - 基类的公有和保护成员在派生类中变为私有成员
   - 基类的私有成员在派生类中不可访问

**继承示例**
```cpp
class Shape {
protected:
    int width;
    int height;
public:
    void setWidth(int w) { width = w; }
    void setHeight(int h) { height = h; }
};

// 公有继承
class Rectangle : public Shape {
public:
    int getArea() { return (width * height); }
};
```

## 3 多继承

C++支持多继承，允许一个类继承自多个基类：
```cpp
class A { /*...*/ };
class B { /*...*/ };
class C : public A, public B {
    // 同时继承A和B的成员
};
```



## 4 虚函数与多态

通过在基类中声明虚函数实现多态：
```cpp
class Shape {
public:
    virtual int getArea() { return 0; }
};

class Rectangle : public Shape {
private:
    int width, height;
public:
    Rectangle(int w, int h) : width(w), height(h) {}
    int getArea() override { return width * height; }
};
```



## 5 需要注意的问题

在C++的继承中，有两个特别需要注意的问题：

**1. 菱形继承问题（钻石继承）**

当一个类间接地从同一个基类继承两次时，就会出现菱形继承问题。例如：

```cpp
class A {
public:
    int a;
};

class B : public A {
    // 从A继承了a
};

class C : public A {
    // 也从A继承了a
};

class D : public B, public C {
    // 现在D有两份a：一份来自B，一份来自C
};
```

这会导致的问题：
- 数据冗余：基类A的成员在D中存在两份副本
- 歧义：当访问 `a` 时，编译器不知道应该访问哪一个版本（`B::a` 还是 `C::a`）
- 如果基类有虚函数，虚函数表也会复制，影响多态性

解决方案是使用**虚继承**：
```cpp
class B : virtual public A { /*...*/ };
class C : virtual public A { /*...*/ };
```

虚继承确保无论通过多少条路径继承，基类的成员在派生类中只存在一个实例。

**2. 继承不应用于"有一个"关系**

这是一个设计原则问题。继承表示"是一个" (is-a) 关系，而不是"有一个" (has-a) 关系：

- "是一个"关系适合用继承：矩形**是一个**形状
- "有一个"关系应该用组合：汽车**有一个**引擎

错误的例子：
```cpp
// 错误设计：Car不是一个Engine
class Engine { /*...*/ };
class Car : public Engine { /*...*/ };
```

正确的设计：
```cpp
// 正确设计：Car有一个Engine
class Engine { /*...*/ };
class Car {
private:
    Engine engine;  // 组合
};
```

错误使用继承而不是组合会导致：
- 打破封装：派生类暴露了不需要的基类接口
- 紧耦合：当基类改变时，所有派生类都受影响
- 违反"里氏替换原则"：派生类不能总是替代基类使用

区分"是一个"和"有一个"关系是面向对象设计中的关键决策，正确应用可以创建更清晰、更易于维护的代码结构。

继承是实现代码复用和程序扩展的强大工具，合理使用可以创建灵活且可维护的面向对象系统。