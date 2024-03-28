// Cf converts its numeric argument to Celsius and Fahrenheit.
package main

import (
	"ch2/pkg/tempconv"
	"fmt"
	"os"
	"strconv"
)

func main() {
	if len(os.Args) == 1 {
		fmt.Print("参数里要有几个数")
		os.Exit(1)
	}
	for _, arg := range os.Args[1:] {
		// 字符串转float64
		t, err := strconv.ParseFloat(arg, 64)
		if err != nil {
			// 此处虽然在处理异常，但是fmt.Fprintf函数也得处理异常（不是必须，不处理就是warning）
			//_, _ = fmt.Fprintf(os.Stderr, "此处要输入数字：%v\n", err)
			fmt.Printf("此处要输入数字哦： %v\n", err)
			os.Exit(1)
		}
		f := tempconv.Fahrenheit(t)
		c := tempconv.Celsius(t)
		fmt.Printf("%s = %s, %s = %s\n", f, tempconv.FToC(f), c, tempconv.CToF(c))
	}
}
