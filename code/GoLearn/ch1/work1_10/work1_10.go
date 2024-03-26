package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"
)

func main() {
	start := time.Now()
	ch := make(chan string)
	for _, url := range os.Args[1:] {
		go saveFile(url, ch) // start a goroutine
	}
	for range os.Args[1:] {
		fmt.Println(<-ch) // receive from channel ch
	}
	fmt.Printf("total %.2fs elapsed\n", time.Since(start).Seconds())
}

func saveFile(url string, ch chan<- string) {
	start := time.Now()
	resp, err := http.Get(url)
	if err != nil {
		// 这里必须fmt.Sprintf
		ch <- fmt.Sprint(err) // send to channel ch
		return
	}
	//拿到域名做文件名
	domain := strings.Split(url, "//")
	// 创建文件
	outFile, err := os.Create(domain[1] + ".txt")
	if err != nil {
		ch <- fmt.Sprint(err)
		return
	}
	nbytes, err := io.Copy(outFile, resp.Body)
	// resp.Body.Close()
	if err != nil {
		ch <- fmt.Sprintf("while reading %s: %v", url, err)
		return
	}
	secs := time.Since(start).Seconds()

	ch <- fmt.Sprintf("%.2fs  %7d  %s", secs, nbytes, url)
}
