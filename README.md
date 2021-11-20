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
    npm install express@4 mysql2 socket.io js-cookie jsonwebtoken
```

### Lancement du serveur

```bash
    node index.js
```
### Ajouter une dépendance au package.json
```bash 
    npm install <pkg> --save-dev
```
### Setup de la base de donnée

Il faut aller dans le dossier source, ouvrir la console mysql et tapez la commande SOURCE bdd.sql;


### Pour passer en SSL

https://qastack.fr/programming/12871565/how-to-create-pem-files-for-https-web-server


## TO DO

- Affichages des erreurs Login/Register