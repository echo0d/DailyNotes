package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	counts := make(map[string]int)
	// 用于记录文件名的hash表,每一行对应的文件名存到一个数组中
	fileHash := make(map[string][]string)
	// 获取命令行参数
	files := os.Args[1:]
	// 如果为空，则在控制台上输入
	if len(files) == 0 {
		fmt.Print("随便填,输入0终止\r\n")
		newcountlines(os.Stdin, counts, fileHash)
	} else {
		// 不为空，遍历文件列表
		fmt.Println("你输入的文件是:", files)
		for _, file := range files {
			// 打开文件
			f, err := os.Open(file)
			// 判断文件路径等是否出错
			if err != nil {
				fmt.Println(err)
				continue
			}
			// 传入contlines进行处理
			newcountlines(f, counts, fileHash)
			f.Close()
		}
	}

	for k, count := range counts {
		fmt.Println(k, count)
		// 打印出现的文件
		if count > 1 {
			for _, fname := range fileHash[k] {
				fmt.Printf("%s ", fname)
			}
			fmt.Println()
		}
	}
}
func newcountlines(f *os.File, counts map[string]int, fileHash map[string][]string) {
	// 创建读入流
	input := bufio.NewScanner(f)
	// 一行一行读取
	for input.Scan() {
		if input.Text() == "0" {
			break
		}
		counts[input.Text()]++
		// 按照每行内容，将文件名加到[]string{value}里
		fileHash[input.Text()] = append(fileHash[input.Text()], f.Name())
	}
}
