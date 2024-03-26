package main

import (
	"image"
	"image/color"
	"image/gif"
	"io"
	"log"
	"math"
	"math/rand"
	"net/http"
	"strconv"
)

func main() {
	handler := func(w http.ResponseWriter, r *http.Request) {
		if err := r.ParseForm(); err != nil {
			log.Print(err)
		}
		cycles, err := strconv.Atoi(r.Form.Get("cycles")) // 字符串转int
		if err != nil {
			log.Print(err)
		}
		// 函数里比较的时候有math.Pi，就要求cycles float64，直接用int不对strconv.Atoi的结果是不对的
		lissajousNew(w, float64(cycles))
	}
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func lissajousNew(out io.Writer, cycles float64) {
	var palette = []color.Color{color.White, color.Black}

	const (
		whiteIndex = 0 // first color in palette
		blackIndex = 1 // next color in palette
		res        = 0.001
		size       = 100
		nframes    = 64
		delay      = 8
	)

	freq := rand.Float64() * 3.0 // relative frequency of y oscillator
	anim := gif.GIF{LoopCount: nframes}
	phase := 0.0 // phase difference
	for i := 0; i < nframes; i++ {
		rect := image.Rect(0, 0, 2*size+1, 2*size+1)
		img := image.NewPaletted(rect, palette)
		// 这里比较
		for t := 0.0; t < cycles*2*math.Pi; t += res {
			x := math.Sin(t)
			y := math.Sin(t*freq + phase)
			img.SetColorIndex(size+int(x*size+0.5), size+int(y*size+0.5),
				blackIndex)
		}
		phase += 0.1
		anim.Delay = append(anim.Delay, delay)
		anim.Image = append(anim.Image, img)
	}
	gif.EncodeAll(out, &anim) // NOTE: ignoring encoding errors
}
