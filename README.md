## to get started first install libnss3-tools used by mkcert
## install mkcert
## and make it trusted CA (certificate authority)

```bash
sudo apt install libnss3-tools
sudo apt install mkcert 
mkcert -install
```

## then you can generate certificates based on domain
## for example to generate certificates for localhost, server.local and my private IP (eg. 192.168.xxx.xxx)

```bash
# to get you private IP  
hostname -I | awk '{print $1}'
mkdir ~/.config/web-server
mkcert -cert-file ~/.config/web-server/server.crt -key-file ~/.config/web-server/server.key localhost server.local 192.168.xxx.xxx
```

## now if you want ot use a domain name you need to edit `etc/hosts` and add this line to map localhost to server.local
```bash
127.0.0.1 server.local
```

## clone repo, build the server and add it to the bin
```bash
git clone "https://github.com/salihdhaifullah/golang-https-testing-server.git" webserver
cd webserver
go build .
sudo mv ./webserver /usr/local/bin/webserver
```

## for quick install using script 
```bash
git clone "https://github.com/salihdhaifullah/golang-https-testing-server.git" webserver
cd webserver
chmod +x install.sh
sudo ./install.sh
```