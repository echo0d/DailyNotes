package main

import (
	"fmt"
	"os"
	"strings"
	"time"
)

// !+
func main() {
	now1 := time.Now()
	s, sep := "", ""
	for _, arg := range os.Args[1:] {
		s += sep + arg
		sep = " "
	}
	fmt.Println(s)
	end1 := time.Now()
	fmt.Println("for range运行时间", end1.Sub(now1))
	now2 := time.Now()
	fmt.Println(strings.Join(os.Args[1:], " "))
	end2 := time.Now()
	fmt.Println("strings.Join运行时间", end2.Sub(now2))
	now3 := time.Now()
	fmt.Println(os.Args[1:])
	end3 := time.Now()
	fmt.Println("Println(os.Args[1:])运行时间", end3.Sub(now3))
}
