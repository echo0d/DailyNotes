package tempconv

//Celsius(t)和Fahrenheit(t)是类型转换操作，它们并不是函数调用。

// CToF converts a Celsius temperature to Fahrenheit.
func CToF(c Celsius) Fahrenheit { return Fahrenheit(c*9/5 + 32) }

// FToC converts a Fahrenheit temperature to Celsius.
func FToC(f Fahrenheit) Celsius { return Celsius((f - 32) * 5 / 9) }

func KToC(k Kelvin) Celsius { return Celsius(k - 273.15) }

func CToK(c Celsius) Kelvin { return Kelvin(c + 273.15) }

func FToK(f Fahrenheit) Kelvin { return Kelvin((f-32)*5/9 + 273.15) }

func KToF(k Kelvin) Fahrenheit { return Fahrenheit(k*9/5 - 459.67) }
