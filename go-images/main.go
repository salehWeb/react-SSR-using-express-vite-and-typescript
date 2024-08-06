package main

import (
	"fmt"
	"image"
	"image/draw"
	"log"
	"math"
	"os"
	"path/filepath"
	"strconv"

	"github.com/kolesa-team/go-webp/decoder"
	"github.com/kolesa-team/go-webp/encoder"
	"github.com/kolesa-team/go-webp/webp"
)

func main() {
	if len(os.Args) < 2 {
		panic("Need to pass file path")
	}

	if len(os.Args) < 3 {
		panic("Need to pass aspect ratio")
	}

	WTHR, err := strconv.ParseFloat(os.Args[2], 64)
	if err != nil {
		panic(err)
	}

	absPath, err := filepath.Abs(os.Args[1])
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(absPath)

	file, err := os.Open(absPath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	fileName := filepath.Base(absPath)
	fmt.Println(fileName)

	imgDecoder, err := decoder.NewDecoder(file, &decoder.Options{})
	if err != nil {
		log.Fatal(err)
	}

	imageMeta := imgDecoder.GetFeatures()

	width, height := float32(imageMeta.Width), float32(imageMeta.Height)
	fmt.Printf("width = %d, height = %d\n", imageMeta.Width, imageMeta.Height)

	newW, newH := getNewDimensions(width, height, float32(WTHR))

	fmt.Printf("New_width = %f, New_height = %f\n", newW, newH)

	trims := make([]float32, 4) // top, bottom, left, right
	if newW != float32(width) {
		dif := float32(width) - newW
		val := dif / 2
		trims[2] = val
		trims[3] = val
	}

	if newH != float32(height) {
		dif := float32(height) - newH
		val := dif / 2
		trims[0] = val
		trims[1] = val
	}

	newRect := image.Rect(
		int(trims[2]),
		int(trims[0]),
		int(width-trims[3]),
		int(height-trims[1]),
	)

	trimmedImg := image.NewRGBA(newRect)

	img, err := imgDecoder.Decode()
	if err != nil {
		log.Fatal(err)
	}

	draw.Draw(trimmedImg, trimmedImg.Bounds(), img, image.Point{int(trims[2]), int(trims[0])}, draw.Src)

	output, err := os.Create(fmt.Sprintf("%.2f-%s", WTHR, fileName))
	if err != nil {
		log.Fatal(err)
	}
	defer output.Close()

	options, err := encoder.NewLossyEncoderOptions(encoder.PresetDefault, 100)
	if err != nil {
		log.Fatalln(err)
	}

	err = webp.Encode(output, trimmedImg, options)
	if err != nil {
		log.Fatal(err)
	}
}

// take Width Height and Width to Height Ratio
func getNewDimensions(w float32, h float32, WTHR float32) (float32, float32) {
	originalWTHR := w / h
	epsilon := 1e-5

	if math.Abs(float64(originalWTHR-WTHR)) < epsilon {
		return w, h
	} else if originalWTHR > WTHR {
		return h * WTHR, h
	} else {
		return w, w / WTHR
	}
}
