---
category: C++
tags:
  - Cpp
---

# 6. C++ 多态

在 C++ 中，**多态（Polymorphism）** 是面向对象编程（OOP）的核心特性之一，它允许同一个接口在不同的场景下表现出不同的行为。多态的主要目的是通过统一的接口实现不同的功能，从而提高代码的灵活性和可扩展性。

C++ 中的多态分为两种类型：**编译时多态（静态多态）** 和 **运行时多态（动态多态）**。

---

## 1 **编译时多态（静态多态）**
编译时多态是在程序编译阶段确定的多态行为，主要通过**函数重载**和**运算符重载**实现。

### 1.1 **特点**
- 在编译时决定调用哪个函数或运算符。
- 不涉及虚函数或继承。
- 性能较高，因为不需要运行时的动态绑定。

### 1.2 **实现方式**
1. **函数重载**
   函数重载允许在同一作用域中定义多个同名函数，通过参数列表的不同来区分。

   ```cpp
   #include <iostream>
   using namespace std;

   void display(int i) {
       cout << "整数: " << i << endl;
   }

   void display(double d) {
       cout << "浮点数: " << d << endl;
   }

   int main() {
       display(10);    // 调用整数版本
       display(3.14);  // 调用浮点数版本
       return 0;
   }
   ```

2. **运算符重载**
   运算符重载允许为用户自定义类型定义新的运算符行为。

   ```cpp
   #include <iostream>
   using namespace std;

   class Complex {
   private:
       double real, imag;
   public:
       Complex(double r, double i) : real(r), imag(i) {}

       Complex operator+(const Complex& other) const {
           return Complex(real + other.real, imag + other.imag);
       }

       void display() const {
           cout << real << " + " << imag << "i" << endl;
       }
   };

   int main() {
       Complex c1(1.0, 2.0), c2(3.0, 4.0);
       Complex c3 = c1 + c2; // 使用重载的加法运算符
       c3.display();
       return 0;
   }
   ```

---

## 2 **运行时多态（动态多态）**
运行时多态是在程序运行阶段决定的多态行为，主要通过**继承**和**虚函数**实现。

### 2.1 **特点**
- 通过基类指针或引用调用派生类的函数。
- 使用虚函数实现动态绑定。
- 提高了代码的灵活性，但会略微降低性能（因为需要运行时查找虚函数表）。

### 2.2 **实现方式**
1. **虚函数**
   虚函数是通过在基类中使用 `virtual` 关键字声明的函数，允许派生类重写该函数。

   ```cpp
   #include <iostream>
   using namespace std;

   class Base {
   public:
       virtual void show() { // 虚函数
           cout << "Base 类的 show 函数" << endl;
       }
   };

   class Derived : public Base {
   public:
       void show() override { // 重写基类的虚函数
           cout << "Derived 类的 show 函数" << endl;
       }
   };

   int main() {
       Base* basePtr; // 基类指针
       Derived derivedObj;

       basePtr = &derivedObj;
       basePtr->show(); // 调用 Derived 类的 show 函数（动态绑定）
       return 0;
   }
   ```

2. **纯虚函数与抽象类**
   - 如果一个类中包含纯虚函数（`= 0`），则该类称为抽象类，不能直接实例化。
   - 抽象类通常用作接口，派生类必须实现纯虚函数。

   ```cpp
   #include <iostream>
   using namespace std;

   class Shape {
   public:
       virtual void draw() = 0; // 纯虚函数
   };

   class Circle : public Shape {
   public:
       void draw() override {
           cout << "绘制圆形" << endl;
       }
   };

   class Rectangle : public Shape {
   public:
       void draw() override {
           cout << "绘制矩形" << endl;
       }
   };

   int main() {
       Shape* shape1 = new Circle();
       Shape* shape2 = new Rectangle();

       shape1->draw(); // 调用 Circle 的 draw 函数
       shape2->draw(); // 调用 Rectangle 的 draw 函数

       delete shape1;
       delete shape2;
       return 0;
   }
   ```

---

## 3 **多态的优点**
- **代码复用性**：通过继承和虚函数，基类的接口可以被派生类复用。
- **灵活性**：可以通过基类指针或引用操作派生类对象，而无需了解具体的派生类。
- **可扩展性**：新增派生类时无需修改现有代码，只需实现基类的接口。

---

## 4 **多态的实现机制**
运行时多态的实现依赖于**虚函数表（vtable）**和**虚函数指针（vptr）**：
- 每个包含虚函数的类都有一个虚函数表，表中存储了该类的虚函数地址。
- 每个对象都有一个虚函数指针，指向所属类的虚函数表。
- 当通过基类指针或引用调用虚函数时，程序会根据虚函数指针查找虚函数表，从而调用正确的函数。

---

## 5 **多态的限制**
- 静态多态无法实现运行时的动态行为。
- 动态多态需要额外的内存和运行时开销。
- 构造函数和析构函数不能是虚函数，但析构函数通常需要声明为虚函数以避免内存泄漏。

---

## 6 总结
C++ 中的多态通过静态多态和动态多态提供了灵活的接口设计能力。静态多态通过函数重载和运算符重载实现，运行时多态通过继承和虚函数实现。多态是面向对象编程的核心特性之一，能够显著提高代码的可扩展性和可维护性。