
# 04. C++ 友元 (Friend)


友元是C++中一种特殊的访问控制机制，它允许一个函数或类访问另一个类的私有 (private) 和保护 (protected) 成员。

## 友元的基本概念

1. **友元函数**：一个不属于类的成员但可以访问类的私有和保护成员的函数
2. **友元类**：一个可以访问另一个类的私有和保护成员的类

## 友元函数

```cpp
class MyClass {
private:
    int data;
public:
    MyClass(int d) : data(d) {}
    
    // 声明友元函数
    friend void displayData(const MyClass& obj);
};

// 友元函数定义
void displayData(const MyClass& obj) {
    // 可以直接访问私有成员data
    cout << "Data: " << obj.data << endl;
}
```

## 友元类

```cpp
class ClassA {
private:
    int privateData;
public:
    ClassA(int d) : privateData(d) {}
    
    // 声明ClassB为友元类
    friend class ClassB;
};

class ClassB {
public:
    void display(const ClassA& obj) {
        // 可以访问ClassA的私有成员
        cout << "ClassA's privateData: " << obj.privateData << endl;
    }
};
```

## 友元成员函数

```cpp
class ClassA {
private:
    int data;
public:
    ClassA(int d) : data(d) {}
    
    // 只将ClassB的某个成员函数声明为友元
    friend void ClassB::accessData(const ClassA& obj);
};
```

## 友元的特性

1. **友元关系不具有传递性**：若A是B的友元，B是C的友元，A不自动成为C的友元
2. **友元关系不具有对称性**：若A是B的友元，B不自动成为A的友元
3. **友元关系不能被继承**：若A是B的友元，A不是B的派生类的友元

## 使用友元的注意事项

1. **破坏了封装性**：过度使用友元会降低代码的封装性和安全性
2. **增加了耦合度**：友元建立了类之间的紧密联系，增加了代码的耦合度
3. **应谨慎使用**：只在确实需要时才使用友元

## 应用场景

1. **运算符重载**：如重载 `<<` 和 `>>` 运算符
2. **需要访问私有成员的辅助函数**
3. **紧密关联的类之间的协作**

友元在C++中是一个强大但需谨慎使用的功能，它提供了一种机制来平衡封装与访问的需求。