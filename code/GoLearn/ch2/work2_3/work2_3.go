package main

import (
	"ch2/work2_3/popcount"
	"fmt"
)

func main() {
	x := uint64(189264826)
	fmt.Printf("count: %d\n", popcount.PopCount(x))
	fmt.Printf("count: %d\n", popcount.LPopCount(x))
}
