package main

import "fmt"

//func f() int {
//	return 0
//}

var b = "g"

func main() {
	f := "f"
	fmt.Println(f) // "f"; 函数内部的var f覆盖了包级别的func f
	fmt.Println(b) // "g"; 包级别的var g
	//fmt.Println(h) 	// # command-line-arguments  .\test1.go:13:14: undefined: h

}
