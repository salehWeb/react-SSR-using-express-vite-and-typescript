package main

import (
    "encoding/json"
    "flag"
    "fmt"
    "io"
    "net/http"
    "os"
    "path/filepath"
)

// ImageList represents a list of image URLs
type ImageList struct {
    URLs []string `json:"urls"`
}

func main() {
    // Define command-line flags
    jsonInputFlag := flag.String("json", "", "JSON string containing the list of image URLs")
    outputDirFlag := flag.String("dir", "./downloaded_images", "Directory to save the downloaded images")
    flag.Parse()

    // Check if JSON input was provided
    if *jsonInputFlag == "" {
        fmt.Println("Error: JSON input is required")
        flag.Usage()
        return
    }

    // Ensure the output directory exists
    if err := os.MkdirAll(*outputDirFlag, os.ModePerm); err != nil {
        fmt.Println("Error creating directory:", err)
        return
    }

    // Parse the JSON input
    var imageList ImageList
    if err := json.Unmarshal([]byte(*jsonInputFlag), &imageList); err != nil {
        fmt.Println("Error parsing JSON:", err)
        return
    }

    // Download each image
    for _, url := range imageList.URLs {
        if err := downloadImage(url, *outputDirFlag); err != nil {
            fmt.Println("Error downloading image:", err)
        }
    }
}

// downloadImage downloads an image from the specified URL and saves it to the specified directory
func downloadImage(url, outputDir string) error {
    // Get the image data
    resp, err := http.Get(url)
    if err != nil {
        return fmt.Errorf("failed to download image: %v", err)
    }
    defer resp.Body.Close()

    // Check if the response status is OK
    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("failed to download image: status code %d", resp.StatusCode)
    }

    // Create the output file
    fileName := filepath.Base(url)
    outputPath := filepath.Join(outputDir, fileName)
    outFile, err := os.Create(outputPath)
    if err != nil {
        return fmt.Errorf("failed to create file: %v", err)
    }
    defer outFile.Close()

    // Copy the image data to the output file
    _, err = io.Copy(outFile, resp.Body)
    if err != nil {
        return fmt.Errorf("failed to save image: %v", err)
    }

    fmt.Printf("Image saved to %s\n", outputPath)
    return nil
}
