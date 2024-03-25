// 练习 1.1： 修改 echo 程序，使其能够打印 os.Args[0]，即被执行命令本身的名字。
// 练习 1.2： 修改 echo 程序，使其打印每个参数的索引和值，每个一行。
package main

import (
	"fmt"
	"os"
)

func main() {
	s, sep := "", ""
	for _, arg := range os.Args[1:] {
		s += sep + arg
		sep = " "
	}
	fmt.Println("只输出值")
	fmt.Println(s)

	fmt.Println("输出值和索引1：index, arg := range os.Args[1:]")
	for index, arg := range os.Args[1:] {
		fmt.Println("参数", index, "是", arg)
	}
	fmt.Println("输出值和索引2：index, arg := range os.Args")
	// 练习 1.1： 修改 echo 程序，使其能够打印 os.Args[0]，即被执行命令本身的名字。
	// Args[0:]的[0:]可以省略
	// for index, arg := range os.Args {
	for index, arg := range os.Args[0:] {
		fmt.Println("参数", index, "是", arg)
	}
}
