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
