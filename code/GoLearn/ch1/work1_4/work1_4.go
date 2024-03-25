package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	hash := make(map[string]int)
	// 用于记录文件名的hash表,每一行对应的文件名存到一个数组中
	fileHash := make(map[string][]string)
	// 获取命令行参数
	files := os.Args[1:]
	// 如果为空，则在控制台上输入
	if len(files) == 0 {
		newcountlines(os.Stdin, hash, fileHash)
	} else {
		// 不为空，遍历文件列表
		for _, file := range files {
			// 打开文件
			f, err := os.Open(file)
			// 判断文件路径等是否出错
			if err != nil {
				fmt.Println(err)
				continue
			}
			// 传入contlines进行处理
			newcountlines(f, hash, fileHash)
			f.Close()
		}
	}

	for i, val := range hash {
		fmt.Println(i, val)
		// 打印出现的文件
		if val > 1 {
			for _, v := range fileHash[i] {
				fmt.Printf("%s ", v)
			}
			fmt.Println()
		}
	}
}

func newcountlines(f *os.File, hash map[string]int, fileHash map[string][]string) {
	// 创建读入流
	input := bufio.NewScanner(f)
	// 一行一行读取
	for input.Scan() {
		hash[input.Text()]++
		// 将对应的文件名加入数组
		fileHash[input.Text()] = append(fileHash[input.Text()], f.Name())
	}
}
