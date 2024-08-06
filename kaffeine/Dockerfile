FROM golang:latest

WORKDIR /app

COPY . .

RUN go build -o kaffeine

EXPOSE 8080

CMD ["./kaffeine"]
