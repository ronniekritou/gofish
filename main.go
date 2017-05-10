package main

import (
	"net/http"
)

func buildHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(200)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", buildHandler)
	http.ListenAndServe(":8000", mux)
}
