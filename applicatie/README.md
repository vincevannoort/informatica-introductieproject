# Easy Link Keeper

## Requirements
Before running the installation a few packages are required. These packages are installed globally and not per project.
- NodeJs ~8.0.0 (installed via nvm or nvmw)
- Yarn 1.3.2 (```npm install -g yarn```)
- AdonisCLI 3.0.17 (```npm install -g @adonisjs/cli```)
- Pm2 2.7.2 (```npm install -g pm2```) (for windows, due to ports not closing automatically)

## Installation
When all the above packages are installed the installation should run fluently.
1. ```git clone https://github.com/vincevannoort/informatica-introductieproject``` (Clone project)
2. ```cd informatica-introductieproject/applicatie``` (Go to application folder)
3. ```cp .env.example .env``` (Copy .env.example as .env, since it's not tracked inside git and should not be tracked)
4. ```adonis key:generate``` (Generate a new key)
5. ```adonis migration:run``` (Run the migrations)
6. ```adonis seed``` optional - (Generate dummy data)

## Starting the application in development (after installation)
### MacOSX / Linux
1. Go to your application folder inside a terminal and start the application with ```adonis serve --dev```
2. Open another terminal and start webpack with ```npm run development```

### Windows
1. Go to your application folder inside a terminal and start the application with ```pm2 start server.js```
2. Open another terminal and start webpack with ```npm run development```

## Folder structure
```
.
├── app               (controllers & models)
├── config            (configfiles, never touch them!)
├── database          (includes database file: development.sqlite)
    ├── factories     (blueprints of fake data)
    ├── migrations    (generated migration files)
    └── seeds         (generate fake data based on blueprints from factories)
├── resources         (includes all frontend assets)
    ├── assets        (general frontend assets)
        ├── images    (images used in frontend)
        ├── js        (javascript used in frontend)
        ├── scss      (stylesheets used in frontend)
    ├── components    (javascript components used in frontend)
    ├── views         (javascript views used in frontend, except main.edge)
├── start             (files for starting the server)
    └── routes.js     (backend routes for api)
└── test              (files for running tests)
```