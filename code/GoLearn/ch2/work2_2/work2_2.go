// Cf converts its numeric argument to Celsius and Fahrenheit.
package main

import (
	"bufio"
	"ch2/work2_2/unitconv"
	"fmt"
	"os"
	"strconv"
)

func main() {
	if len(os.Args) == 1 {
		fmt.Print("没有参数, 开始从标准输入读\n")
		fmt.Print("输数字, 按q结束\n")
		input := bufio.NewScanner(os.Stdin)
		for input.Scan() {
			if input.Text() == "q" {
				os.Exit(0)
			}
			t := strtofloat(input.Text())
			convs(t)
		}
	} else {
		// 有命令行参数
		for _, arg := range os.Args[1:] {
			t := strtofloat(arg)
			convs(t)
		}
	}
}

// 单位转换
func convs(t float64) {
	f := unitconv.Fahrenheit(t)
	c := unitconv.Celsius(t)
	fmt.Printf("%s = %s, %s = %s\n", f, unitconv.FToC(f), c, unitconv.CToF(c))
	// 练习2.2
	fe := unitconv.Feet(t)
	m := unitconv.Metre(t)
	fmt.Printf("%s = %s, %s = %s\n", fe, unitconv.FToM(fe), m, unitconv.MToF(m))
	p := unitconv.Pound(t)
	k := unitconv.Kilogram(t)
	fmt.Printf("%s = %s, %s = %s\n", p, unitconv.PToK(p), k, unitconv.KToP(k))
}

// 字符串转float64
func strtofloat(s string) float64 {
	float, err := strconv.ParseFloat(s, 64)
	if err != nil {
		//_, _ = fmt.Fprintf(os.Stderr, "cf：%v\n", err)
		fmt.Fprintf(os.Stderr, "cf: %v\n", err)
		os.Exit(1)
	}
	return float
}
