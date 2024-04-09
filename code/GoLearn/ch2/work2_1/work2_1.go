package main

import (
	"ch2/work2_1/tempconv"
	"fmt"
)

func main() {
	fmt.Printf("Brrrr! %v\n", tempconv.AbsoluteZeroC) // "Brrrr! -273.15°C"
	fmt.Println(tempconv.CToF(tempconv.BoilingC))     // "212°F"
	fmt.Println(tempconv.KToC(273.15))                // 0°C
}
