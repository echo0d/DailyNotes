package main

import (
	"fmt"
	"log"
	"os"
)

var cwd string

func init() {
	var err error
	// cwd, err := os.Getwd()  //NOTE: 这里如果用了:= 会造成 cwd declared and not used
	cwd, err = os.Getwd() //这里是给初始化好的cwd变量赋值
	if err != nil {
		log.Fatalf("os.Getwd failed: %v", err)
	}
}
func main() {
	fmt.Printf("Working directory = %s", cwd)
}
