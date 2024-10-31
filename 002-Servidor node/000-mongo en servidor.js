// Sacamos la clave pública que nos permite instalar mongo en el servidor
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

// Descargamos los paquetes de instalacion para distribuciones basadas en Debian
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

// Actualizamos los paquetes del sistema
sudo apt update

// Instalamos mongodb en el sistema
sudo apt install -y mongodb-org

// Arrancamos el proceso
sudo systemctl start mongod

// Lo habilitamos como servicio
sudo systemctl enable mongod

// Pregunto al sistema si es cierto que ha arrancado mongodb
sudo systemctl status mongod

// Arranco la linea de comando
mongosh