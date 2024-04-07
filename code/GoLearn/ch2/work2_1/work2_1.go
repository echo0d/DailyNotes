
package main

import (
	"ch2/work2_1/tempconv"
	"fmt"
)

func Example_one() {
	{
		fmt.Printf("%g\n", tempconv.BoilingC-tempconv.FreezingC) // "100" °C
		boilingF := tempconv.CToF(tempconv.BoilingC)
		fmt.Printf("%g\n", boilingF-tempconv.CToF(tempconv.FreezingC)) // "180" °F
		// fmt.Printf("%g\n", boilingF-FreezingC)       // compile error: type mismatch
	}

}

func Example_two() {
	//!+printf
	c := tempconv.FToC(212.0)
	fmt.Println(c.String()) // "100°C"
	fmt.Printf("%v\n", c)   // "100°C"; no need to call String explicitly
	fmt.Printf("%s\n", c)   // "100°C"
	fmt.Println(c)          // "100°C"
	fmt.Printf("%g\n", c)   // "100"; does not call String
	fmt.Println(float64(c)) // "100"; does not call String
	//!-printf

	// Output:
	// 100°C
	// 100°C
	// 100°C
	// 100°C
	// 100
	// 100

}

func Example_three() {
	var c tempconv.Celsius
	var f tempconv.Fahrenheit
	fmt.Println(c == 0) // "true"
	fmt.Println(f >= 0) // "true"
	// fmt.Println(c == f)          // compile error: type mismatch
	fmt.Println(c == tempconv.Celsius(f)) // "true"!
	// Output:
	// true
	// true
	// true
}

func Example_four() {

	k := tempconv.KToC(273.15)
	fmt.Println(k.String())

	// Output:
	// 0°C
}

func main() {
	Example_one()
	Example_two()
	Example_three()
	Example_four()
}
