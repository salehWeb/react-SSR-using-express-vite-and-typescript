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
	for i := 0; i < len(files); i++ {
		file := files[i]

		if file.IsDir() {
			continue
		}

		oldName := filepath.Join(dir, file.Name())

		newName := filepath.Join(dir, fmt.Sprintf("%s-%d%s", prefix, i+1, filepath.Ext(oldName)))
		err := os.Rename(oldName, newName)

		if err != nil {
			fmt.Printf("Error renaming %s: %v\n", oldName, err)
		} else {
			fmt.Printf("Renamed %s to %s\n", oldName, newName)
		}
	}
}
