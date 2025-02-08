---
category: C
tags:
  - C
---
# 09. 其他类型
## 1 typedef 命令

### 1.1 简介

`typedef`命令用来为某个类型起别名。

```c
typedef type name;
```

上面代码中，`type`代表类型名，`name`代表别名。

```c
typedef unsigned char BYTE;

BYTE c = 'z';
```

上面示例中，`typedef`命令为类型`unsign char`起别名`BYTE`，然后就可以使用`BYTE`声明变量。

typedef 可以一次指定多个别名。

```c
typedef int antelope, bagel, mushroom;
```

上面示例中，一次性为`int`类型起了三个别名。

typedef 可以为指针起别名。

```c
typedef int* intptr;

int a = 10;
intptr x = &a;
```

上面示例中，`intptr`是`int*`的别名。不过，使用的时候要小心，这样不容易看出来，变量`x`是一个指针类型。

typedef 也可以用来为数组类型起别名。

```c
typedef int five_ints[5];

five_ints x = {11, 22, 33, 44, 55};
```

上面示例中，`five_ints`是一个数组类型，包含5个整数的

typedef 为函数起别名的写法如下。

```c
typedef signed char (*fp)(void);
```

上面示例中，类型别名`fp`是一个指针，代表函数`signed char (*)(void)`。

### 1.2 主要好处

`typedef`为类型起别名的好处，主要有下面几点。

（1）更好的代码可读性。

```c
typedef char* STRING;

STRING name;
```

上面示例为字符指针起别名为`STRING`，以后使用`STRING`声明变量时，就可以轻易辨别该变量是字符串。

（2）为 struct、union、enum 等命令定义的复杂数据结构创建别名，从而便于引用。

```c
struct treenode {
  // ...
};

typedef struct treenode* Tree;
```

上面示例中，`Tree`为`struct treenode*`的别名。

typedef 也可以与 struct 定义数据类型的命令写在一起。

```c
typedef struct animal {
  char* name;
  int leg_count, speed;
} animal;
```

上面示例中，自定义数据类型时，同时使用`typedef`命令，为`struct animal`起了一个别名`animal`。

这种情况下，C 语言允许省略 struct 命令后面的类型名。

```c
typedef struct {
  char *name;
  int leg_count, speed;
} animal;
```

上面示例相当于为一个匿名的数据类型起了别名`animal`。

（3）typedef 方便以后为变量改类型。

```c
typedef float app_float;

app_float f1, f2, f3;
```

上面示例中，变量`f1`、`f2`、`f3`的类型都是`float`。如果以后需要为它们改类型，只需要修改`typedef`语句即可。

```c
typedef long double app_float;
```

上面命令将变量`f1`、`f2`、`f3`的类型都改为`long double`。

（4）可移植性

某一个值在不同计算机上的类型，可能是不一样的。

```c
int i = 100000;
```

上面代码在32位整数的计算机没有问题，但是在16位整数的计算机就会出错。

C 语言的解决办法，就是提供了类型别名，在不同计算机上会解释成不同类型，比如`int32_t`。

```c
int32_t i = 100000;
```

上面示例将变量`i`声明成`int32_t`类型，保证它在不同计算机上都是32位宽度，移植代码时就不会出错。

这一类的类型别名都是用 typedef 定义的。下面是类似的例子。

```c
typedef long int ptrdiff_t;
typedef unsigned long int size_t;
typedef int wchar_t;
```

这些整数类型别名都放在头文件`stdint.h`，不同架构的计算机只需修改这个头文件即可，而无需修改代码。

因此，`typedef`有助于提高代码的可移植性，使其能适配不同架构的计算机。

（5）简化类型声明

C 语言有些类型声明相当复杂，比如下面这个。

```c
char (*(*x(void))[5])(void);
```

typedef 可以简化复杂的类型声明，使其更容易理解。首先，最外面一层起一个类型别名。

```c
typedef char (*Func)(void);
Func (*x(void))[5];
```

这个看起来还是有点复杂，就为里面一层也定义一个别名。

```c
typedef char (*Func)(void);
typedef Func Arr[5];
Arr* x(void);
```

上面代码就比较容易解读了。

- `x`是一个函数，返回一个指向 Arr 类型的指针。
- `Arr`是一个数组，有5个成员，每个成员是`Func`类型。
- `Func`是一个函数指针，指向一个无参数、返回字符值的函数。

## 2 struct 结构

### 2.1 简介

C 语言内置的数据类型，除了最基本的几种原始类型，只有数组属于复合类型，可以同时包含多个值，但是只能包含相同类型的数据，实际使用中并不够用。

实际使用中，主要有下面两种情况，需要更灵活强大的复合类型。

- 复杂的物体需要使用多个变量描述，这些变量都是相关的，最好有某种机制将它们联系起来。
- 某些函数需要传入多个参数，如果一个个按照顺序传入，非常麻烦，最好能组合成一个复合结构传入。

为了解决这些问题，C 语言提供了`struct`关键字，允许自定义复合数据类型，将不同类型的值组合在一起。这样不仅为编程提供方便，也有利于增强代码的可读性。C 语言没有其他语言的对象（object）和类（class）的概念，struct 结构很大程度上提供了对象和类的功能。

下面是`struct`自定义数据类型的一个例子。

```c
struct fraction {
  int numerator;
  int denominator;
};
```

上面示例定义了一个分数的数据类型`struct fraction`，包含两个属性`numerator`和`denominator`。

注意，作为一个自定义的数据类型，它的类型名要包括`struct`关键字，比如上例是`struct fraction`，单独的`fraction`没有任何意义，甚至脚本还可以另外定义名为`fraction`的变量，虽然这样很容易造成混淆。另外，`struct`语句结尾的分号不能省略，否则很容易产生错误。

定义了新的数据类型以后，就可以声明该类型的变量，这与声明其他类型变量的写法是一样的。

```c
struct fraction f1;

f1.numerator = 22;
f1.denominator = 7;
```

上面示例中，先声明了一个`struct fraction`类型的变量`f1`，这时编译器就会为`f1`分配内存，接着就可以为`f1`的不同属性赋值。可以看到，struct 结构的属性通过点（`.`）来表示，比如`numerator`属性要写成`f1.numerator`。

再提醒一下，声明自定义类型的变量时，类型名前面，不要忘记加上`struct`关键字。也就是说，必须使用`struct fraction f1`声明变量，不能写成`fraction f1`。

除了逐一对属性赋值，也可以使用大括号，一次性对 struct 结构的所有属性赋值。

```c
struct car {
  char* name;
  float price;
  int speed;
};

struct car saturn = {"Saturn SL/2", 16000.99, 175};
```

上面示例中，变量`saturn`是`struct car`类型，大括号里面同时对它的三个属性赋值。如果大括号里面的值的数量，少于属性的数量，那么缺失的属性自动初始化为`0`。

注意，大括号里面的值的顺序，必须与 struct 类型声明时属性的顺序一致。否则，必须为每个值指定属性名。

```c
struct car saturn = {.speed=172, .name="Saturn SL/2"};
```

上面示例中，初始化的属性少于声明时的属性，这时剩下的那些属性都会初始化为`0`。

声明变量以后，可以修改某个属性的值。

```c
struct car saturn = {.speed=172, .name="Saturn SL/2"};
saturn.speed = 168;
```

上面示例将`speed`属性的值改成`168`。

struct 的数据类型声明语句与变量的声明语句，可以合并为一个语句。

```c
struct book {
  char title[500];
  char author[100];
  float value;
} b1;
```

上面的语句同时声明了数据类型`book`和该类型的变量`b1`。如果类型标识符`book`只用在这一个地方，后面不再用到，这里可以将类型名省略。

```c
struct {
  char title[500];
  char author[100];
  float value;
} b1;
```

上面示例中，`struct`声明了一个匿名数据类型，然后又声明了这个类型的变量`b1`。

与其他变量声明语句一样，可以在声明变量的同时，对变量赋值。

```c
struct {
  char title[500];
  char author[100];
  float value;
} b1 = {"Harry Potter", "J. K. Rowling", 10.0},
  b2 = {"Cancer Ward", "Aleksandr Solzhenitsyn", 7.85};
```

上面示例中，在声明变量`b1`和`b2`的同时，为它们赋值。

下一章介绍的`typedef`命令可以为 struct 结构指定一个别名，这样使用起来更简洁。

```c
typedef struct cell_phone {
  int cell_no;
  float minutes_of_charge;
} phone;

phone p = {5551234, 5};
```

上面示例中，`phone`就是`struct cell_phone`的别名。

指针变量也可以指向`struct`结构。

```c
struct book {
  char title[500];
  char author[100];
  float value;
}* b1;

// 或者写成两个语句
struct book {
  char title[500];
  char author[100];
  float value;
};
struct book* b1;
```

上面示例中，变量`b1`是一个指针，指向的数据是`struct book`类型的实例。

struct 结构也可以作为数组成员。

```c
struct fraction numbers[1000];

numbers[0].numerator = 22;
numbers[0].denominator = 7;
```

上面示例声明了一个有1000个成员的数组`numbers`，每个成员都是自定义类型`fraction`的实例。

struct 结构占用的存储空间，不是各个属性存储空间的总和，而是最大内存占用属性的存储空间的倍数，其他属性会添加空位与之对齐。这样可以提高读写效率。

```c
struct foo {
  int a;
  char* b;
  char c;
};
printf("%d\n", sizeof(struct foo)); // 24
```

上面示例中，`struct foo`有三个属性，在64位计算机上占用的存储空间分别是：`int a`占4个字节，指针`char* b`占8个字节，`char c`占1个字节。它们加起来，一共是13个字节（4 + 8 + 1）。但是实际上，`struct foo`会占用24个字节，原因是它最大的内存占用属性是`char* b`的8个字节，导致其他属性的存储空间也是8个字节，这样才可以对齐，导致整个`struct foo`就是24个字节（8 * 3）。

多出来的存储空间，都采用空位填充，所以上面的`struct
foo`真实的结构其实是下面这样。

```c
struct foo {
  int a;        // 4
  char pad1[4]; // 填充4字节
  char *b;      // 8
  char c;       // 1
  char pad2[7]; // 填充7字节
};
printf("%d\n", sizeof(struct foo)); // 24
```

为什么浪费这么多空间进行内存对齐呢？这是为了加快读写速度，把内存占用划分成等长的区块，就可以快速在 Struct 结构体中定位到每个属性的起始地址。

由于这个特性，在有必要的情况下，定义 Struct 结构体时，可以采用存储空间递增的顺序，定义每个属性，这样就能节省一些空间。

```c
struct foo {
  char c;
  int a;
  char* b;
};
printf("%d\n", sizeof(struct foo)); // 16
```

上面示例中，占用空间最小的`char c`排在第一位，其次是`int a`，占用空间最大的`char* b`排在最后。整个`strct foo`的内存占用就从24字节下降到16字节。

### 2.2 struct 的复制

struct 变量可以使用赋值运算符（`=`），复制给另一个变量，这时会生成一个全新的副本。系统会分配一块新的内存空间，大小与原来的变量相同，把每个属性都复制过去，即原样生成了一份数据。这一点跟数组的复制不一样，务必小心。

```c
struct cat { char name[30]; short age; } a, b;

strcpy(a.name, "Hula");
a.age = 3;

b = a;
b.name[0] = 'M';

printf("%s\n", a.name); // Hula
printf("%s\n", b.name); // Mula
```

上面示例中，变量`b`是变量`a`的副本，两个变量的值是各自独立的，修改掉`b.name`不影响`a.name`。

上面这个示例是有前提的，就是 struct 结构的属性必须定义成字符数组，才能复制数据。如果稍作修改，属性定义成字符指针，结果就不一样。

```c
struct cat { char* name; short age; } a, b;

a.name = "Hula";
a.age = 3;

b = a;
```

上面示例中，`name`属性变成了一个字符指针，这时`a`赋值给`b`，导致`b.name`也是同样的字符指针，指向同一个地址，也就是说两个属性共享同一个地址。因为这时，struct 结构内部保存的是一个指针，而不是上一个例子的数组，这时复制的就不是字符串本身，而是它的指针。并且，这个时候也没法修改字符串，因为字符指针指向的字符串是不能修改的。

总结一下，赋值运算符（`=`）可以将 struct 结构每个属性的值，一模一样复制一份，拷贝给另一个 struct 变量。这一点跟数组完全不同，使用赋值运算符复制数组，不会复制数据，只会共享地址。

注意，这种赋值要求两个变量是同一个类型，不同类型的 struct 变量无法互相赋值。

另外，C 语言没有提供比较两个自定义数据结构是否相等的方法，无法用比较运算符（比如`==`和`!=`）比较两个数据结构是否相等或不等。

### 2.3 struct 指针

如果将 struct 变量传入函数，函数内部得到的是一个原始值的副本。

```c
#include <stdio.h>

struct turtle {
  char* name;
  char* species;
  int age;
};

void happy(struct turtle t) {
  t.age = t.age + 1;
}

int main() {
  struct turtle myTurtle = {"MyTurtle", "sea turtle", 99};
  happy(myTurtle);
  printf("Age is %i\n", myTurtle.age); // 输出 99
  return 0;
}
```

上面示例中，函数`happy()`传入的是一个 struct 变量`myTurtle`，函数内部有一个自增操作。但是，执行完`happy()`以后，函数外部的`age`属性值根本没变。原因就是函数内部得到的是 struct 变量的副本，改变副本影响不到函数外部的原始数据。

通常情况下，开发者希望传入函数的是同一份数据，函数内部修改数据以后，会反映在函数外部。而且，传入的是同一份数据，也有利于提高程序性能。这时就需要将 struct 变量的指针传入函数，通过指针来修改 struct 属性，就可以影响到函数外部。

struct 指针传入函数的写法如下。

```c
void happy(struct turtle* t) {
}

happy(&myTurtle);
```

上面代码中，`t`是 struct 结构的指针，调用函数时传入的是指针。struct 类型跟数组不一样，类型标识符本身并不是指针，所以传入时，指针必须写成`&myTurtle`。

函数内部也必须使用`(*t).age`的写法，从指针拿到 struct 结构本身。

```c
void happy(struct turtle* t) {
  (*t).age = (*t).age + 1;
}
```

上面示例中，`(*t).age`不能写成`*t.age`，因为点运算符`.`的优先级高于`*`。`*t.age`这种写法会将`t.age`看成一个指针，然后取它对应的值，会出现无法预料的结果。

现在，重新编译执行上面的整个示例，`happy()`内部对 struct 结构的操作，就会反映到函数外部。

`(*t).age`这样的写法很麻烦。C 语言就引入了一个新的箭头运算符（`->`），可以从 struct 指针上直接获取属性，大大增强了代码的可读性。

```c
void happy(struct turtle* t) {
  t->age = t->age + 1;
}
```

总结一下，对于 struct 变量名，使用点运算符（`.`）获取属性；对于 struct 变量指针，使用箭头运算符（`->`）获取属性。以变量`myStruct`为例，假设`ptr`是它的指针，那么下面三种写法是同一回事。

```c
// ptr == &myStruct
myStruct.prop == (*ptr).prop == ptr->prop
```

### 2.4 struct 的嵌套

struct 结构的成员可以是另一个 struct 结构。

```c
struct species {
  char* name;
  int kinds;
};

struct fish {
  char* name;
  int age;
  struct species breed;
};
```

上面示例中，`fish`的属性`breed`是另一个 struct 结构`species`。

赋值的时候有多种写法。

```c
// 写法一
struct fish shark = {"shark", 9, {"Selachimorpha", 500}};

// 写法二
struct species myBreed = {"Selachimorpha", 500};
struct fish shark = {"shark", 9, myBreed};

// 写法三
struct fish shark = {
  .name="shark",
  .age=9,
  .breed={"Selachimorpha", 500}
};

// 写法四
struct fish shark = {
  .name="shark",
  .age=9,
  .breed.name="Selachimorpha",
  .breed.kinds=500
};

printf("Shark's species is %s", shark.breed.name);
```

上面示例展示了嵌套 Struct 结构的四种赋值写法。另外，引用`breed`属性的内部属性，要使用两次点运算符（`shark.breed.name`）。

下面是另一个嵌套 struct 的例子。

```c
struct name {
  char first[50];
  char last[50];
};

struct student {
  struct name name;
  short age;
  char sex;
} student1;

strcpy(student1.name.first, "Harry");
strcpy(student1.name.last, "Potter");

// or
struct name myname = {"Harry", "Potter"};
student1.name = myname;
```

上面示例中，自定义类型`student`的`name`属性是另一个自定义类型，如果要引用后者的属性，就必须使用两个`.`运算符，比如`student1.name.first`。另外，对字符数组属性赋值，要使用`strcpy()`函数，不能直接赋值，因为直接改掉字符数组名的地址会报错。

struct 结构内部不仅可以引用其他结构，还可以自我引用，即结构内部引用当前结构。比如，链表结构的节点就可以写成下面这样。

```c
struct node {
  int data;
  struct node* next;
};
```

上面示例中，`node`结构的`next`属性，就是指向另一个`node`实例的指针。下面，使用这个结构自定义一个数据链表。

```c
struct node {
  int data;
  struct node* next;
};

struct node* head;

// 生成一个三个节点的列表 (11)->(22)->(33)
head = malloc(sizeof(struct node));

head->data = 11;
head->next = malloc(sizeof(struct node));

head->next->data = 22;
head->next->next = malloc(sizeof(struct node));

head->next->next->data = 33;
head->next->next->next = NULL;

// 遍历这个列表
for (struct node *cur = head; cur != NULL; cur = cur->next) {
  printf("%d\n", cur->data);
}
```

上面示例是链表结构的最简单实现，通过`for`循环可以对其进行遍历。

### 2.5 位字段

struct 还可以用来定义二进制位组成的数据结构，称为“位字段”（bit field），这对于操作底层的二进制数据非常有用。

```c
struct {
  unsigned int ab:1;
  unsigned int cd:1;
  unsigned int ef:1;
  unsigned int gh:1;
} synth;

synth.ab = 0;
synth.cd = 1;
```

上面示例中，每个属性后面的`:1`，表示指定这些属性只占用一个二进制位，所以这个数据结构一共是4个二进制位。

注意，定义二进制位时，结构内部的各个属性只能是整数类型。

实际存储的时候，C 语言会按照`int`类型占用的字节数，存储一个位字段结构。如果有剩余的二进制位，可以使用未命名属性，填满那些位。也可以使用宽度为0的属性，表示占满当前字节剩余的二进制位，迫使下一个属性存储在下一个字节。

```c
struct {
  unsigned int field1 : 1;
  unsigned int        : 2;
  unsigned int field2 : 1;
  unsigned int        : 0;
  unsigned int field3 : 1;
} stuff;
```

上面示例中，`stuff.field1`与`stuff.field2`之间，有一个宽度为两个二进制位的未命名属性。`stuff.field3`将存储在下一个字节。

### 2.6 弹性数组成员

很多时候，不能事先确定数组到底有多少个成员。如果声明数组的时候，事先给出一个很大的成员数，就会很浪费空间。C 语言提供了一个解决方法，叫做弹性数组成员（flexible array member）。

如果不能事先确定数组成员的数量时，可以定义一个 struct 结构。

```c
struct vstring {
  int len;
  char chars[];
};
```

上面示例中，`struct vstring`结构有两个属性。`len`属性用来记录数组`chars`的长度，`chars`属性是一个数组，但是没有给出成员数量。

`chars`数组到底有多少个成员，可以在为`vstring`分配内存时确定。

```c
struct vstring* str = malloc(sizeof(struct vstring) + n * sizeof(char));
str->len = n;
```

上面示例中，假定`chars`数组的成员数量是`n`，只有在运行时才能知道`n`到底是多少。然后，就为`struct vstring`分配它需要的内存：它本身占用的内存长度，再加上`n`个数组成员占用的内存长度。最后，`len`属性记录一下`n`是多少。

这样就可以让数组`chars`有`n`个成员，不用事先确定，可以跟运行时的需要保持一致。

弹性数组成员有一些专门的规则。首先，弹性成员的数组，必须是 struct 结构的最后一个属性。另外，除了弹性数组成员，struct 结构必须至少还有一个其他属性。

## 3 Union 结构

有时需要一种数据结构，不同的场合表示不同的数据类型。比如，如果只用一种数据结构表示水果的“量”，这种结构就需要有时是整数（6个苹果），有时是浮点数（1.5公斤草莓）。

C 语言提供了 Union 结构，用来自定义可以灵活变更的数据结构。它内部包含各种属性，但是所有属性共用一块内存，导致这些属性都是对同一个二进制数据的解读，其中往往只有一个属性的解读是有意义的。并且，后面写入的属性会覆盖前面的属性，这意味着同一块内存，可以先供某一个属性使用，然后再供另一个属性使用。这样做的最大好处是节省内存空间。

```c
union quantity {
  short count;
  float weight;
  float volume;
};
```

上面示例中，`union`命令定义了一个包含三个属性的数据类型`quantity`。虽然包含三个属性，但是只能写入一个值，三个属性都是对这个值的不同解读。最后赋值的属性，往往就是可以取到有意义的值的那个属性。

使用时，声明一个该类型的变量。

```c
// 写法一
union quantity q;
q.count = 4;

// 写法二
union quantity q = {.count=4};

// 写法三
union quantity q = {4};
```

上面代码展示了为 Union 结构赋值的三种写法。最后一种写法不指定属性名，就会赋值给第一个属性。

执行完上面的代码以后，`q.count`可以取到值，另外两个属性取不到值。

```c
printf("count is %i\n", q.count); // count is 4
printf("weight is %f\n", q.weight); // 未定义行为
```

如果要让`q.weight`属性可以取到值，就要先为它赋值。

```c
q.weight = 0.5;
printf("weight is %f\n", q.weight); // weight is 0.5
```

一旦为其他属性赋值，原先可以取到值的`q.count`属性就跟着改变，使用它可能就没有意义了。除了这一点，Union 结构的其他用法与 Struct 结构，基本上是一致的。

Union 结构也支持指针运算符`->`。

```c
union quantity {
  short count;
  float weight;
  float volume;
};

union quantity q;
q.count = 4;

union quantity* ptr;
ptr = &q;

printf("%d\n", ptr->count); // 4
```

上面示例中，`ptr`是`q`的指针，那么`ptr->count`等同于`q.count`。

Union 结构指针与它的属性有关，当前正在按照哪个属性解读数据，它的指针就是对应的数据类型。

```c
union foo {
  int a;
  float b;
} x;

int* foo_int_p = (int *)&x;
float* foo_float_p = (float *)&x;

x.a = 12;
printf("%d\n", x.a);           // 12
printf("%d\n", *foo_int_p);    // 12

x.b = 3.141592;
printf("%f\n", x.b);           // 3.141592
printf("%f\n", *foo_float_p);  // 3.141592
```

上面示例中，`&x`是 foo 结构的指针，它的数据类型完全由当前赋值的属性决定。

typedef 命令可以为 Union 数据类型起别名。

```c
typedef union {
  short count;
  float weight;
  float volume;
} quantity;
```

上面示例中，`union`命令定义了一个包含三个属性的数据类型，`typedef`命令为它起别名为`quantity`。

Union 结构的好处，主要是节省空间。它将一段内存空间，重用于不同类型的数据。定义了三个属性，但同一时间只用到一个，使用 Union 结构就可以节省另外两个属性的空间。Union 结构占用的内存长度，等于它内部最长属性的长度。

## 4 Enum 类型

如果一种数据类型的取值只有少数几种可能，并且每种取值都有自己的含义，为了提高代码的可读性，可以将它们定义为 Enum 类型，中文名为枚举。

```c
enum colors {RED, GREEN, BLUE};

printf("%d\n", RED); // 0
printf("%d\n", GREEN);  // 1
printf("%d\n", BLUE);  // 2
```

上面示例中，假定程序里面需要三种颜色，就可以使用`enum`命令，把这三种颜色定义成一种枚举类型`colors`，它只有三种取值可能`RED`、`GREEN`、`BLUE`。这时，这三个名字自动成为整数常量，编译器默认将它们的值设为数字`0`、`1`、`2`。相比之下，`RED`要比`0`的可读性好了许多。

注意，Enum 内部的常量名，遵守标识符的命名规范，但是通常都使用大写。

使用时，可以将变量声明为 Enum 类型。

```c
enum colors color;
```

上面代码将变量`color`声明为`enum colors`类型。这个变量的值就是常量`RED`、`GREEN`、`BLUE`之中的一个。

```c
color = BLUE;
printf("%i\n", color); // 2
```

上面代码将变量`color`的值设为`BLUE`，这里`BLUE`就是一个常量，值等于`2`。

typedef 命令可以为 Enum 类型起别名。

```c
typedef enum {
  SHEEP,
  WHEAT,
  WOOD,
  BRICK,
  ORE
} RESOURCE;

RESOURCE r;
```

上面示例中，`RESOURCE`是 Enum 类型的别名。声明变量时，使用这个别名即可。

还有一种不常见的写法，就是声明 Enum 类型时，在同一行里面为变量赋值。

```c
enum {
  SHEEP,
  WHEAT,
  WOOD,
  BRICK,
  ORE
} r = BRICK, s = WOOD;
```

上面示例中，`r`的值是`3`，`s`的值是`2`。

由于 Enum 的属性会自动声明为常量，所以有时候使用 Enum 的目的，不是为了自定义一种数据类型，而是为了声明一组常量。这时就可以使用下面这种写法，比较简单。

```c
enum { ONE, TWO };

printf("%d %d", ONE, TWO);  // 0 1
```

上面示例中，`enum`是一个关键字，后面跟着一个代码块，常量就在代码内声明。`ONE`和`TWO`就是两个 Enum 常量。

常量之间使用逗号分隔。最后一个常量后面的尾逗号，可以省略，也可以保留。

```c
enum { ONE, TWO, };
```

由于Enum 会自动编号，因此可以不必为常量赋值。C 语言会自动从0开始递增，为常量赋值。但是，C 语言也允许为 ENUM 常量指定值，不过只能指定为整数，不能是其他类型。因此，任何可以使用整数的场合，都可以使用 Enum 常量。

```c
enum { ONE = 1, TWO = 2 };

printf("%d %d", ONE, TWO);  // 1 2
```

Enum 常量可以是不连续的值。

```c
enum { X = 2, Y = 18, Z = -2 };
```

Enum 常量也可以是同一个值。

```c
enum { X = 2, Y = 2, Z = 2 };
```

如果一组常量之中，有些指定了值，有些没有指定。那么，没有指定值的常量会从上一个指定了值的常量，开始自动递增赋值。

```c
enum {
  A,    // 0
  B,    // 1
  C = 4,  // 4
  D,    // 5
  E,    // 6
  F = 3,   // 3
  G,    // 4
  H     // 5
};
```

Enum 的作用域与变量相同。如果是在顶层声明，那么在整个文件内都有效；如果是在代码块内部声明，则只对该代码块有效。如果与使用`int`声明的常量相比，Enum 的好处是更清晰地表示代码意图。