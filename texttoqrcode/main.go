package main

import (
	"fmt"
	"os"

	"github.com/skip2/go-qrcode"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Please provide a string argument")
		os.Exit(1)
	}

	inputString := os.Args[1]

    qr, err := qrcode.New(inputString, qrcode.High)
    if err != nil {
        fmt.Printf("Failed to generate QR code: %v\n", err)
        os.Exit(1)
    }

    qrString := qr.ToSmallString(false)
    fmt.Println(qrString)    
}
