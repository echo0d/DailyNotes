package main

import (
	"ch2/work2_5/popcount"
	"fmt"
	"time"
)

func main() {
	x := uint64(18446744073709551614)
	start1 := time.Now()
	for i := 0; i < 100000000; i++ {
		popcount.PopCount(x)
	}
	end1 := time.Now()
	fmt.Printf("count: %d\ntime: %v\n", popcount.PopCount(x), end1.Sub(start1))
	// 测试优化后的CPopCount函数
	start2 := time.Now()
	for i := 0; i < 100000000; i++ {
		popcount.CPopCount(x)
	}
	end2 := time.Now()
	fmt.Printf("count: %d\ntime: %v\n", popcount.CPopCount(x), end2.Sub(start2))

}
