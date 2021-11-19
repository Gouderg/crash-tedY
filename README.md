# Crash tedY

### Installation NodeJS ubuntu

```bash
    sudo apt-get update
    sudo apt-get install nodejs npm
```

Si erreur

```bash
    wget -qO- https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
```

### Installation des dependances
```bash
    npm install express@4
```

```bash
    npm install socket.io
```

```bash
    npm install js-cookie
```

```bash
    npm install mongodb
```

### Lancement du serveur

```bash
    node index.js
```
### Ajouter une dépendance au package.json
```bash 
    npm install <pkg> --save-dev
```
### Setup de la base de donnee

Il faut installer mongodb-org:
https://wiki.crowncloud.net/?How_to_Install_MongoDB_5_on_Ubuntu_21_10

### Pour passer en SSL

https://qastack.fr/programming/12871565/how-to-create-pem-files-for-https-web-server
