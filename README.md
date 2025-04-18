Ce projet regroupe plusieurs microservices développés dans différents langages, afin de simuler un système distribué simple. Chaque service est indépendant, exposé via HTTP, et containerisé avec Docker.

📁 Structure du projet

micro-services/
│
├── docker-compose.yml         # Docker Compose central pour tous les services
│
├── catalogue/                 # Microservice Node.js (Express)
│   ├── Dockerfile
│   └── ...
│
├── utilisateur/               # Microservice Go
│   ├── Dockerfile
│   └── ...
│
└── commande/ (à venir)        # Microservice Spring Boot (Java)


🔧 Services actuels

Microservice	Port	Langage	Description
Catalogue	8081	Node.js	Gère une liste de produits disponibles.
Commande    8082    Node.js Gère une liste des commandes réalisé.
Utilisateur	8083	Go	Gère les utilisateurs (exemple simplifié).

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
Ajout d’un microservice commande (Spring Boot) pour simuler des interactions entre utilisateurs et produits.