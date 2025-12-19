# Task Manager API 🚀

Sistema robusto de gestión de tareas desarrollado con **Node.js**, **Express** y **Sequelize**. Esta API permite organizar el flujo de trabajo mediante categorías, prioridades y el desglose de tareas en subtareas.

## ✨ Características Principales

* **Gestión de Tareas:** Creación con título, descripción y fecha límite.
* **Jerarquía de Datos:**  Categorías: Agrupa tus tareas (ej: "Trabajo", "Personal", "Hogar").
* **Subtareas:** Descompón tareas complejas en checklists accionables.

* **Control de Estado:** Marcado de tareas como completadas/pendientes.
* **Organización Avanzada:** Niveles de **Prioridad** (Baja, Media, Alta).
* **Filtrado inteligente:** Por tareas pendientes y por prioridad.

* **Integridad de Datos:** Borrado en cascada (al eliminar una categoría o tarea, se limpian sus dependencias).

---

## 🛠️ Tecnologías Utilizadas

* **Entorno:** Node.js
* **Framework:** Express.js
* **ORM:** Sequelize (SQL)
* **Validación:** Express-validator
* **Base de Datos:** MySQL / MariaDB (o la configurada en `db.js`)

---

## 🚀 Instalación y Configuración

1. **Clonar el repositorio:**

```bash
git clone https://github.com/gavdev1/task-manager-API.git
cd task-manager-API

```

2. **Instalar dependencias:**

```bash
npm install

```

3. **Configurar variables de entorno:**
Crea un archivo `.env` en la raíz y configura tus credenciales:

```env
PORT=8080
DB_NAME=task_manager
DB_USER=user
DB_PASSWORD=password
DB_HOST=localhost

```

4. **Inicializar la base de datos (Seed):**
Este comando crea las tablas y carga las categorías iniciales.

```bash
node seed.js

```

5. **Ejecutar el servidor:**

```bash
npm start

```

---

## 📌 Endpoints Principales

### Tareas (`/task`)

* `GET /task` - Listar todas las tareas.
* `POST /task` - Crear nueva tarea.
* `GET /task/pending` - Ver solo tareas pendientes.
* `PATCH /task/status/:id` - Alternar estado completado.
* `PUT /task/:id` - Editar detalles de la tarea.

### Subtareas (`/task/sub-task`)

* `POST /task/sub-task/:id` - Agregar subtarea a una tarea específica.
* `GET /task/sub-task/:id` - Listar subtareas de una tarea.

### Categorías (`/categories`)

* `GET /categories` - Listar categorías disponibles.
* `POST /categories` - Crear nueva categoría.

---

## 🛡️ Estructura del Proyecto

```text
├── config/         # Conexión a DB
├── controllers/    # Lógica de negocio
├── models/         # Definición de tablas (Sequelize)
├── routes/         # Definición de rutas Express
├── validators/     # Middlewares de validación
├── seed.js         # Script de carga inicial
└── index.js        # Punto de entrada de la app

```

---
