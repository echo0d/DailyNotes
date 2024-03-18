package dup

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func Dup1() {
	counts := make(map[string]int) // 键是字符串，值是整数
	input := bufio.NewScanner(os.Stdin)
	for input.Scan() {
		counts[input.Text()]++
		// line := input.Text()
		// counts[line] = counts[line] + 1
	}
	// NOTE: ignoring potential errors from input.Err()
	for line, n := range counts {
		// if 语句条件两边也不加括号。if 语句的 else 部分是可选的
		if n > 1 {
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}

func Dup2() {
	counts := make(map[string]int)
	files := os.Args[1:]
	if len(files) == 0 {
		countLines(os.Stdin, counts)
	} else {
		for _, arg := range files {
			f, err := os.Open(arg)
			if err != nil {
				fmt.Fprintf(os.Stderr, "dup2: %v\n", err)
				continue
			}
			countLines(f, counts)
			f.Close()
		}
	}
	for line, n := range counts {
		if n > 1 {
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}

func countLines(f *os.File, counts map[string]int) {
	input := bufio.NewScanner(f)
	for input.Scan() {
		counts[input.Text()]++
	}
	// NOTE: ignoring potential errors from input.Err()
}

func Dup3() {
	counts := make(map[string]int)
	for _, filename := range os.Args[1:] {
		// ReadFile 函数返回一个字节切片（byte slice），必须把它转换为 string，才能用 strings.Split 分割
		data, err := os.ReadFile(filename)
		if err != nil {
			fmt.Fprintf(os.Stderr, "dup3: %v\n", err)
			continue
		}
		// ReadFile 函数读取指定文件的全部内容，strings.Split 函数把字符串分割成子串的切片。
		for _, line := range strings.Split(string(data), "\r\n") {
			counts[line]++
		}
	}
	for line, n := range counts {
		if n > 1 {
			fmt.Printf("%d\t%s\r\n", n, line)
		}
	}
}

// 练习1.4
func NewDup2() {
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
