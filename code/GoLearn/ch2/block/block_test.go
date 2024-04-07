package main

import (
	"fmt"
	"log"
	"os"
)

//func f() int {
//	return 0
//}

var b = "g"

func Example_one() {
	f := "f"
	fmt.Println(f) // "f"; 函数内部的var f覆盖了包级别的func f
	fmt.Println(b) // "g"; 包级别的var g
	//fmt.Println(h) 	// # command-line-arguments  .\test1.go:13:14: undefined: h

	// Output:
	// f
	// g
}

func Example_two() {
	x := "hello!"
	for i := 0; i < len(x); i++ {
		x := x[i]
		if x != '!' {
			x := x + 'A' - 'a'
			fmt.Printf("%c", x) // "HELLO"
		}
	}
	// Output:
	// HELLO
}

func Example_three() {
	x := "hello"
	for _, x := range x {
		x := x + 'A' - 'a'
		fmt.Printf("%c", x)
	}
	// Output:
	// HELLO
}

func Example_four() {
	if x := f(); x == 0 {
		fmt.Println(x)
	} else if y := g(x); x == y {
		fmt.Println(x, y)
	} else {
		fmt.Println(x, y)
	}
	//fmt.Println(x, y)
	// Output:
	// 1
}
func f() int {
	return 1
}
func g(x int) int {
	return x
}

func Example_five() {
	// cwd, err := os.Getwd() // NOTE: 这样会compile error: unused: cwd
	_, err := os.Getwd()
	if err != nil {
		log.Fatalf("os.Getwd failed: %v", err)
	}
}

var cwd1 string

func Example_six() {
	cwd1, err := os.Getwd() //NOTE:  这里会在函数内部定义一次cwd1，造成前面的var cwd1 is unused
	if err != nil {
		log.Fatalf("os.Getwd failed: %v", err)
	}
	fmt.Printf("Working directory = %s", cwd1)

	//TODO: 路径里的C:\为哈是小写的

	// Output:
	// Working directory = c:\Users\echo0d\Desktop\GoLearning\ch2\block
}
