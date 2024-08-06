package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Error: Prefix is required")
		os.Exit(1)
	}

	prefix := os.Args[1]
	dir := "."

	// Open the directory
	files, err := os.ReadDir(dir)
	if err != nil {
		fmt.Println("Error reading directory:", err)
		return
	}

	// Process each file in the directory
	for _, file := range files {
		if file.IsDir() {
			continue
		}

		if len(file.Name()) <= len(prefix) || file.Name()[:len(prefix)] != prefix {
			continue
		}

		oldName := filepath.Join(dir, file.Name())
		newName := filepath.Join(dir, file.Name()[len(prefix):])

		err := os.Rename(oldName, newName)

		if err != nil {
			fmt.Printf("Error renaming %s: %v\n", oldName, err)
		} else {
			fmt.Printf("Renamed %s to %s\n", oldName, newName)
		}
	}
}
