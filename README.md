Ce projet regroupe plusieurs microservices développés dans différents langages, afin de simuler un système distribué simple. Chaque service est indépendant, exposé via HTTP, et containerisé avec Docker.

📁 Structure du projet

micro-services/
├── docker-compose.yml              # Orchestre Docker
│
├── gateway/                        # API Gateway (Node.js)
│   ├── Dockerfile
│   └── gateway.js
│
├── catalogue/                      # Microservice Catalogue (Node.js)
│   ├── Dockerfile
│   ├── data/
│   │   └── products.json
│   ├── routes/
│   │   └── products.js
│   └── index.js
│
├── commande/                       # Microservice Commande (Node.js )
│   ├── Dockerfile
│   ├── routes/
│   │   └── orders.js
│   └── index.js 
│
└── utilisateur/                    # Microservice Utilisateur (Go)
    ├── Dockerfile
    └── main.go



🔧 Services actuels

| Microservice | Port   | Langage   | Description                                    |
|--------------|--------|-----------|------------------------------------------------|
| Catalogue    | 8081   | Node.js   | Gère une liste de produits disponibles.        |
| Commande     | 8082   | Node.js   | Gère la liste des commandes effectuées.        |
| Utilisateur  | 8083   | Go        | Gère les utilisateurs (exemple simplifié).     |
| API Gateway  | 3000   | Node.js   | Sert de point d’entrée pour tous les services. |

---


▶️ Lancer tous les services
Assurez-vous d’être à la racine du projet (micro-services/), puis exécute :

bash
`docker compose up --build`


Les services seront accessibles, et testable sur Postman ou Insomnia : 

GET http://localhost:8081/products
GET http://localhost:8081/products/2

POST http://localhost:8081/products

avec le contenu JSON : 

{
  "name": "Chemise",
  "price": 9.99
}

GET http://localhost:8082/orders
GET http://localhost:8082/orders/1

GET http://localhost:8083/users

🛠️ Prochaine étape
Résoudre le soucis de proxy avec Gateway Api.