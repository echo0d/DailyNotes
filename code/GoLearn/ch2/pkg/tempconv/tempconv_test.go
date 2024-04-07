package tempconv

import "fmt"

func Example_one() {
	{
		fmt.Printf("%g°C\n", BoilingC-FreezingC) // "100" °C
		boilingF := CToF(BoilingC)
		fmt.Printf("%g°F\n", boilingF-CToF(FreezingC)) // "180" °F
		// fmt.Printf("%g\n", boilingF-FreezingC)       // build failed: boilingF - FreezingC (mismatched types Fahrenheit and Celsius)
	}

	// Output:
	// 100°C
	// 180°F
}

func Example_two() {
	//!+printf
	c := FToC(212.0)
	fmt.Println(c.String()) // "100°C"
	fmt.Printf("%v\n", c)   // "100°C"; no need to call String explicitly
	fmt.Printf("%s\n", c)   // "100°C"
	fmt.Println(c)          // "100°C"
	fmt.Printf("%g\n", c)   // "100"; does not call String
	fmt.Println(float64(c)) // "100"; does not call String

	// Output:
	// 100°C
	// 100°C
	// 100°C
	// 100°C
	// 100
	// 100

}

func Example_three() {
	var c Celsius
	var f Fahrenheit
	fmt.Println(c == 0) // "true"
	fmt.Println(f >= 0) // "true"
	// fmt.Println(c == f)          // compile error: type mismatch
	fmt.Println(c == Celsius(f)) // "true"!
	// Output:
	// true
	// true
	// true
}

func Example_four() {

	k := KToC(273.15)
	fmt.Println(k.String())

	// Output:
	// 0°C
}
