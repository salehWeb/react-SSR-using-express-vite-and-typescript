sudo apt install libnss3-tools

sudo apt install mkcert 

mkcert -install

IP=$(hostname -I | awk '{print $1}')

mkdir $HOME/.config/web-server

mkcert -cert-file $HOME/.config/web-server/server.crt -key-file $HOME/.config/web-server/server.key localhost server.local $IP


grep -qx "^$line" /etc/hosts || sudo echo "$line" >> /etc/hosts

LINE="127.0.0.1 server.local"
FILE="/etc/hosts"

if ! grep -qF "$LINE" "$FILE"; then
    echo "$LINE" | sudo tee -a "$FILE" >/dev/null
    echo "Domain added to the hosts file."
else
    echo "Domain already exists in the hosts file."
fi

go build .
sudo mv ./webserver /usr/local/bin/webserver

echo "Done !"