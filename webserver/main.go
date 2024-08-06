package main

import (
	"crypto/tls"
	"flag"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"time"

	"github.com/skip2/go-qrcode"
)

func enableCors(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
}

func disableCache(w http.ResponseWriter) {
	w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
	w.Header().Set("Pragma", "no-cache")
	w.Header().Set("Expires", "0")
}

func printQR(link string) {
    qr, err := qrcode.New(link, qrcode.High)
    if err != nil {
        fmt.Printf("Failed to generate QR code: %v\n", err)
        os.Exit(1)
    }

    qrString := qr.ToSmallString(false)
    fmt.Println(qrString)
}

func serve(mux *http.ServeMux, fileServer http.Handler, port string) *http.Server {
	mux.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		w.Header().Add("Strict-Transport-Security", "max-age=63072000; includeSubDomains")
		enableCors(w)
		disableCache(w)

		if req.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		fileServer.ServeHTTP(w, req)
	})

	tlsConfig := &tls.Config{
		MinVersion:               tls.VersionTLS12,
		CurvePreferences:         []tls.CurveID{tls.CurveP521, tls.CurveP384, tls.CurveP256},
		PreferServerCipherSuites: true,
		CipherSuites: []uint16{
			tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA,
			tls.TLS_RSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_RSA_WITH_AES_256_CBC_SHA,
		},
	}

	serverConfig := &http.Server{
		Addr:         ":" + port,
		Handler:      mux,
		TLSConfig:    tlsConfig,
		WriteTimeout: time.Second * 30,
		ReadTimeout:  time.Second * 30,
		TLSNextProto: make(map[string]func(*http.Server, *tls.Conn, http.Handler), 0),
	}

	return serverConfig
}

func main() {
	home := os.Getenv("HOME") + "/.config/web-server"
    port := getPort()
	mux := http.NewServeMux()
	fileServer := http.FileServer(http.Dir(getDir()))
	crt := home + "/server.crt"
	key := home + "/server.key"

	printUrls(port) 
    
	log.Fatal(serve(mux, fileServer, port).ListenAndServeTLS(crt, key))
}

func printUrls(port string) {
	fmt.Println("App running in")
	addrs, err := net.InterfaceAddrs()

	if err != nil {
		panic(err)
	}

	for _, addr := range addrs {
		if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
                url := fmt.Sprintf("https://%s:%s", ipnet.IP.String(), port) 
                fmt.Printf("Network: %s\n", url)
			    printQR(url)
                break
			}
		}
	}

	fmt.Printf("Domain: https://server.local:%s\n", port)
}

func getDir() string {
	dir, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	return dir
}

func getPort() string {
	port := "8080"
	flag.StringVar(&port, "port", "8080", "port to run the server on")
	flag.Parse()

	return port
}
