package main

import (
	"log"
	"os"
)

//var cwd string

func init() {
	cwd, err := os.Getwd() // 这行本来有个错误
	if err != nil {
		log.Fatalf("os.Getwd failed: %v", err)
	}
	log.Printf("Working directory = %s", cwd)
}
