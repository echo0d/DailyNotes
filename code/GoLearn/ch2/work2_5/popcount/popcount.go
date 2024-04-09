package popcount

var pc [256]byte

// 初始化 此处 byte(i&1) 检查最低位是否为1
func init() {
	for i := range pc {
		pc[i] = pc[i>>1] + byte(i&1)
	}
}

// PopCount 8位一组，判断里面有几个1，然后相加
func PopCount(x uint64) int {
	// start := time.Now()
	count := int(pc[byte(x>>(0*8))] +
		pc[byte(x>>(1*8))] +
		pc[byte(x>>(2*8))] +
		pc[byte(x>>(3*8))] +
		pc[byte(x>>(4*8))] +
		pc[byte(x>>(5*8))] +
		pc[byte(x>>(6*8))] +
		pc[byte(x>>(7*8))])
	// end := time.Now()
	// fmt.Printf("PopCount cost %v\n", end.Sub(start))
	return count
}

// NOTE: CPopCount x&(x-1)将x的最低的一个非零的bit位清零，这样能跳过0的匹配，速度应该快，但是没看出来
func CPopCount(x uint64) int {
	// start := time.Now()
	count := 0
	for i := x; i > 0; i = i & (i - 1) {
		count++
	}

	// fmt.Printf("CPopCount cost %v\n", time.Since(start).Milliseconds())
	return count
}
