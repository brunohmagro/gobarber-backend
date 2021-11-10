<h1 align="center">
  <img src="https://github.com/brunohmagro/gobarber-backend/blob/master/.github/images/logo.svg" width="300" title="GoBarber">

</h1>

<div align="center">

<img src="http://img.shields.io/static/v1?label=License&message=MIT&color=green&style=for-the-badge"/>
<img src="http://img.shields.io/static/v1?label=STATUS&message=CONCLUDED&color=blue&style=for-the-badge"/>

</div>

---

## Layout

This layout was developed by: [Rocketseat](https://github.com/Rocketseat)

  <div align="center">

  <img src="https://github.com/brunohmagro/gobarber-backend/blob/master/.github/images/capa.png" title="Layout">

</div>

## Technologies :books:

- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/) | [Express](https://expressjs.com/pt-br/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/) | [TypeORM](https://typeorm.io/)
- [Mongo](https://www.mongodb.com/cloud/atlas/lp/try2?utm_content=controlhterms&utm_source=google&utm_campaign=gs_americas_brazil_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624308&adgroup=115749706023&gclid=Cj0KCQiA-K2MBhC-ARIsAMtLKRs6wtI-iDIiysx6yaKwCuorIlo5i1JspKYroZ9ejRucwi81Im8LSH4aAnpGEALw_wcB)
- [JWT](https://jwt.io/) | [BCrycptjs](https://github.com/dcodeIO/bcrypt.js#readme)
- [Redis](https://redis.io/)

## Building :arrow_forward:

You'll need [Node.js](https://nodejs.org) on your computer in order to build this app.

#### Docker

```bash
# Database
$ docker run -d --name postgresql -e  POSTGRESQL_PASSWORD=5a2e5bdf9ff70b9ad5ad017af330f5a4 -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_DATABASE=gobarber -p 35432:5432 bitnami/postgresql:latest

# Mongo
$ docker run -d --name mongodb -e MONGODB_USERNAME=gobarber -e MONGODB_PASSWORD=4322a1c28eba323b9471600096c43c43 -e MONGODB_DATABASE=gobarber -p 47017:27017  bitnami/mongodb:latest

# Redis
$ docker run -d --name redis -e REDIS_PASSWORD=3c4797492f3e2dddc83228efdd60593d -p 55379:6379 bitnami/redis:latest

# After that, check if the images are running on the terminal:
$ docker ps
```

#### Backend

```bash
# Enter the project root **/backend** and run the command:
$ yarn install

# After that, run the command:
$ yarn start
```

#### Access to backend with:

``http://localhost:3335``

## Authors ✍️

- [@brunohmagro](https://github.com/brunohmagro) - Coding
- [@rocketseat](https://github.com/rocketseat) - Conseption

Make always with ❤️ for Bruno Magro 👋🏽 Contact:

<br>

[![Linkedin Badge](https://img.shields.io/badge/-Bruno%20Magro-000657?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brunohmagro/)](https://www.linkedin.com/in/brunohmagro/)
[![Outlook Badge](https://img.shields.io/badge/-brunohmagro@hotmail.com-000657?style=flat-square&logo=microsoft-outlook&logoColor=white&link=mailto:brunohmagro@hotmail.com)](mailto:brunohmagro@hotmail.com)

<p style="color: #4978FF;"><b>#dontstoptolearning</b></p>
