package main

import (
	"ch2/work2_3/popcount"
	"fmt"
)

func main() {
	x := uint64(18446744073709551614)
	fmt.Printf("count: %d\n", popcount.PopCount(x))
	fmt.Printf("count: %d\n", popcount.LPopCount(x))
	fmt.Printf("count: %d\n", popcount.SPopCount(x))
	fmt.Printf("count: %d\n", popcount.CPopCount(x))

}
