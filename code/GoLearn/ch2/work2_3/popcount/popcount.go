package popcount

import (
	"fmt"
	"time"
)

var pc [256]byte

// 初始化 此处 byte(i&1) 检查最低位是否为1
func init() {
	for i := range pc {
		pc[i] = pc[i>>1] + byte(i&1)
	}
}

// PopCount 8位一组，判断里面有几个1，然后相加
func PopCount(x uint64) int {
	start := time.Now()
	count := int(pc[byte(x>>(0*8))] +
		pc[byte(x>>(1*8))] +
		pc[byte(x>>(2*8))] +
		pc[byte(x>>(3*8))] +
		pc[byte(x>>(4*8))] +
		pc[byte(x>>(5*8))] +
		pc[byte(x>>(6*8))] +
		pc[byte(x>>(7*8))])
	end := time.Now()
	fmt.Printf("PopCount cost %v\n", end.Sub(start))
	return count
}

// LPopCount 把上面那个函数用for循环改一下
func LPopCount(x uint64) int {
	start := time.Now().UnixNano()
	count := 0
	for i := 0; i < 8; i++ {
		count += int(pc[byte(x>>(i*8))])
	}
	end := time.Now().UnixNano()
	fmt.Printf("LPopCount cost %v\n", end-start)
	return count
}

// SPopCount 移1位然后&00000000....1，得1就说明最后一位是1
func SPopCount(x uint64) int {
	start := time.Now()
	count := 0

	for i := x; i > 0; i = i >> 1 {
		count += int(i & 1)
	}

	fmt.Printf("SPopCount cost %v\n", time.Since(start))
	return count
}

// CPopCount x&(x-1)将x的最低的一个非零的bit位清零，这样能跳过0的匹配，速度应该快，但是没看出来
func CPopCount(x uint64) int {
	start := time.Now()
	count := 0
	for i := x; i > 0; i = i & (i - 1) {
		count++
	}

	fmt.Printf("CPopCount cost %v\n", time.Since(start).Milliseconds())
	return count
}
