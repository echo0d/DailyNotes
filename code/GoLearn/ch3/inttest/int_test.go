package inttest

import (
	"fmt"
)

// 无符号整型
func Example_Bituint() {
	// NOTE: 使用位操作解释uint8类型值的8个独立的bit位
	var x uint8 = 1<<1 | 1<<5
	var y uint8 = 1<<1 | 1<<2
	// NOTE: Printf函数的%b参数打印二进制格式的数字, %08b中08表示打印至少8个字符宽度，不足的前缀部分用0填充。
	fmt.Printf("%08b\n", x) // "00100010", the set {1, 5}
	fmt.Printf("%08b\n", y) // "00000110", the set {1, 2}

	fmt.Printf("%08b\n", x&y)  // "00000010", the intersection {1}
	fmt.Printf("%08b\n", x|y)  // "00100110", the union {1, 2, 5}
	fmt.Printf("%08b\n", x^y)  // "00100100", the symmetric difference {2, 5}
	fmt.Printf("%08b\n", x&^y) // "00100000", the difference {5}

	for i := uint(0); i < 8; i++ {
		// NOTE: 此处i是无符号整型，才能实现1<<i，例如上面用i := int(-1)就编不过
		if x&(1<<i) != 0 { // membership test
			fmt.Println(i) // "1", "5"
		}
	}
	/*
		fmt.Printf("%08b\n", x<<1) // "01000100", the set {2, 6}
		fmt.Printf("%08b\n", x>>1) // "00010001", the set {0, 4}
	*/

	// output: 00100010
	// 00000110
	// 00000010
	// 00100110
	// 00100100
	// 00100000
	// 1
	// 5
}

// 有符号整型
func Example_Bitint() {
	medals := []string{"gold", "silver", "bronze"}
	// NOTE: 此处len(medals)返回的有符号int类型，要不然i--总>=0，就死循环了
	for i := len(medals) - 1; i >= 0; i-- {
		fmt.Println(medals[i]) // "bronze", "silver", "gold"
	}
	// output:
	// bronze
	// silver
	// gold
}

// 浮点数转整数
func Example_Conv() {
	f := 3.141 // a float64
	i := int(f)
	fmt.Println(f, i) // "3.141 3"
	f = 1.99
	fmt.Println(f, int(f)) // "1.99 1"
	f = 1e100              // a float64
	fmt.Println(f, int(f)) // 结果依赖于具体实现
	// output:
	// 3.141 3
	// 1.99 1
	// 1e+100 -9223372036854775808
}

func Example_Printf() {
	o := 0666
	fmt.Printf("%d %[1]o %#[1]o\n", o) // "438 666 0666"
	x := int64(0xdeadbeef)
	fmt.Printf("%d %[1]x %#[1]x %#[1]X\n", x)
	// Output:
	// 438 666 0666
	// 3735928559 deadbeef 0xdeadbeef 0XDEADBEEF
}
