// Cf converts its numeric argument to Celsius and Fahrenheit.
package main

import (
	"ch2/work2_2/unitconv"
	"fmt"
	"os"
	"strconv"
)

func main() {
	for _, arg := range os.Args[1:] {
		t, err := strconv.ParseFloat(arg, 64)
		if err != nil {
			fmt.Fprintf(os.Stderr, "cf: %v\n", err)
			os.Exit(1)
		}
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
}
