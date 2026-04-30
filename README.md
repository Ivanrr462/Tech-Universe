# Tech Universe

## Índice

- [Descripción del proyecto](#descripción-del-proyecto)
- [Miembros](#miembros)
- [Partes del proyecto](#partes-del-proyecto)
  - [Frontend Angular](#frontend-angular)
  - [Frontend React](#frontend-react)
  - [Backend Laravel](#backend-laravel)
  - [Despliegue](#despliegue)
- [Ramas](#ramas)
- [Diseño y diagramas](#diseño-y-diagramas)

## Descripción del proyecto

TechUniverse es un e-commerce tecnológico. Este trabajo constituye el Trabajo de Fin de Grado (TFG) del grado superior de Desarrollo de Aplicaciones Web. El objetivo de nuestro proyecto es crear un e-commerce que incluya la parte pública, el panel del administrador, una API que sirva datos al e-commerce y un despliegue en AWS.

## Miembros

- Iván Ríos Raya
- Alexander Sánchez Jara

## Partes del proyecto

### Frontend Angular

### Frontend React

### Backend Laravel

API REST creado en Laravel con autenticación, gestión de usuarios, productos, categorías, especificaciones, carrito y lista de deseos. Utiliza Sanctum para la seguridad y Filament para un panel de administrador.

> Puedes leer la documentación de la API en: [`Documentación`](https://ivan123.alwaysdata.net/api/documentation/)

> Puedes irte también al repo original donde se ha desarrollado toda la API: [`Repo`](https://github.com/Ivanrr462/API-TechUniverse)

### Despliegue

Aunque el despliegue de la aplicación no este implementado por ahora, la intención es utilizar Terraform , Github Actions y AWS para automatizar la infraestructura y la subida de código. 

Igualmente la API esta subida en AlwaysData mientras se hace el despliegue de la aplicación.

> Enlace a la API: [`API`](https://ivan123.alwaysdata.net/api/productos)

## Ramas

El proyecto sigue una estrategia de ramas sencilla:

- `main`: rama estable y lista para producción.
- `develop`: rama de integración y pruebas.

## Diseño y diagramas

- **Figma**: [`Enlace-al-figma`](https://www.figma.com/design/CdztUWth7lbVUKpVMSYNvb/Proyecto-Intermodular?node-id=0-1&p=f&t=3Ktj0fuLzQOQryqP-0)
- **Draw.io**: [`Modelo-E/R`](https://app.diagrams.net/#G1vMNrhgW8aM7IMlQlUvtK2p8JPdPG2GnY#%7B%22pageId%22%3A%22xxhzdqV2dHcMtNHvoPZn%22%7D)
- **Tablero Trello**: [`Trello`](https://trello.com/invite/b/697b4853d8ecbe0e5996204b/ATTIc810d1fd18a816186cc78a2e81e4ce46EBBE5D9A/tfg)
