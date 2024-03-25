package unitconv

// Feet to Metre
// Metre to Feet

// CToF converts a Celsius temperature to Fahrenheit.
func CToF(c Celsius) Fahrenheit { return Fahrenheit(c*9/5 + 32) }

// FToC converts a Fahrenheit temperature to Celsius.
func FToC(f Fahrenheit) Celsius { return Celsius((f - 32) * 5 / 9) }

func KToC(k Kelvin) Celsius { return Celsius(k - 273.15) }
func CToK(c Celsius) Kelvin { return Kelvin(c + 273.15) }
func FToM(f Feet) Metre     { return Metre(f * 0.3048) }

func MToF(m Metre) Feet { return Feet(m * 3.28084) }

func PToK(p Pound) Kilogram { return Kilogram(p * 0.453592) }

func KToP(k Kilogram) Pound { return Pound(k * 2.20462) }
