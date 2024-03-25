package unitconv

import "fmt"

type Feet float64
type Metre float64

type Celsius float64
type Fahrenheit float64
type Kelvin float64

type Pound float64
type Kilogram float64

// 许多类型都会定义一个String方法，因为当使用fmt包的打印方法时，将会优先使用该类型对应的String方法返回的结果打印，我们将在7.1节讲述。
func (f Feet) String() string  { return fmt.Sprintf("%g英尺", f) }
func (m Metre) String() string { return fmt.Sprintf("%g米", m) }

func (c Celsius) String() string    { return fmt.Sprintf("%g°C", c) }
func (f Fahrenheit) String() string { return fmt.Sprintf("%g°F", f) }
func (k Kelvin) String() string     { return fmt.Sprintf("%gK", k) }

func (p Pound) String() string    { return fmt.Sprintf("%g磅", p) }
func (k Kilogram) String() string { return fmt.Sprintf("%g公斤", k) }
