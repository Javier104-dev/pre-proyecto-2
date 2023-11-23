<h1 align='center'>Pre-proyecto 2 - Coches</h1>

### Introducción
Pre entrega del proyecto 2, en esta ocasión se creó un servidor API RESTful pero usando `MongoDB Cloud`, que es una `base de datos no relacional` en la nube. De esta forma tenemos una mayor flexibilidad a la hora de crear y enviar los registros, ya que no tendremos que preocuparnos por los atributos que tengan. La única desventaja es la de no poder establecer relaciones entre ellos, pero para este proyecto no representara ningún problema.

Las propiedades de las entidades que se usan en este proyecto son:
``` json
{
  "_id": "64a65682450dc9606752b1c9",
  "id": 1,
  "marca": "Ford",
  "modelo": "Ranger",
  "anio": 2023,
  "precio": 12500250,
  "descuento": 3.5,
  "es_0km": true,
  "velocidad_crucero": "Control en el volante"
}
```

### Conexión a la base de datos
Para conectarnos a la nube se utilizó el paquete de controladores oficial `mongodb v6.3.0`, así logramos instanciar la clase `MongoClient` en nuestro proyecto con el que creamos las funciones necesarias para conectarnos y desconectarnos al cliente cada vez que hacíamos una consulta con lo cual evitábamos un bloque de recursos.

### Especificaciones
- Servidor: http://127.0.0.1:8080/coches
- Versión: 1.0.0
- Autor: Javier Anibal Villca
- Repositorio GitHub: git+https://github.com/Javier104-dev/pre-proyecto-2.git

### Tecnologías utilizadas
- **MongoDB Cloud:** Base de datos no relacional en la nube.
- **Mongodb:** El controlador oficial de MongoDB para Node.js.
- **Node.js v18.16.0:** Plataforma de ejecución de JavaScript del lado del servidor.
- **Express:** Framework web para Node.js, simplifica la creación de aplicaciones web y APIs.
- **ESLint:** Herramienta de linting para mantener un código JavaScript/Node.js consistente y legible.
- **Dotenv:** Carga variables de entorno desde un archivo `.env` en la aplicación.

### Explicación de la arquitectura utilizada
El proyecto tiene una arquitectura en capas, para separar responsabilidades y hacerlo lo más modular posible.

| Ruta                   | Explicación                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| src                    | Contiene toda nuestra aplicación                                     |
| src/server.js          | Punto de entrada de nuestra aplicación                               |
| src/coches             | Contiene la estructura de capas del módulo coches                    |
| src/coches/controllers | Capa encargada de gestionar las solicitudes HTTP del proyecto        |
| src/coches/services    | Lógica de negocio de nuestra aplicación                              |
| src/coches/model       | Contiene las funciones necesarias para la conexión con MongoDB Cloud |
| src/coches/routes      | Gestiona las rutas de acceso para cada endpoint del módulo           |
| src/coches/utilities   | Contiene funciones en común que se utilizan en todo el módulo        |
| src/config             | Distribuye las variables de entorno provenientes del archivo `.env`  |

<h1 align='center'>Métodos HTTP y ejemplos</h1>

### Métodos utilizados en el proyecto
| Tipo   | URI                              | Descripción                                           |
| ------ | -------------------------------- | ----------------------------------------------------- |
| GET    | http://127.0.0.1:8080/coches     | Obtiene los registros de los coches (permite filtros) |
| GET    | http://127.0.0.1:8080/coches/:id | Obtiene el registro de un coche en específico         |
| POST   | http://127.0.0.1:8080/coches     | Crea un registro de un nuevo coche                    |
| PUT    | http://127.0.0.1:8080/coches:id  | Modifica el registro de un coche en específico        |
| DELETE | http://127.0.0.1:8080/coches:id  | Elimina el registro de un coche en específico         |
| USE    | http://127.0.0.1:8080/*          | 404 Page Not Found                                    |

## Método GET
**Request**
- Ejemplo de URI utilizado
  ```
  http://127.0.0.1:8080/coches?marca=Ford&modelo=Ranger
  ```

- Parámetros opcionales de tipo QUERY
  - **marca=Ford**: *(tipo: string. Trae los coches de una misma marca)*
  - **modelo=Ranger**: *(tipo: string. Traerá los coches modelo Ranger)*

**Response**
- Código **HTTP 200** *Ok*
  ``` json
  [
    {
      "_id": "64a65682450dc9606752b1c9",
      "id": 1,
      "marca": "Ford",
      "modelo": "Ranger",
      "anio": 2023,
      "precio": 12500250,
      "descuento": 3.5,
      "es_0km": true,
      "velocidad_crucero": "Control en el volante"
    },
  ]
  ```
- Código **HTTP 500**: *Error interno*

## Método GET - Específico
**Request**

- Ejemplo de URI utilizado
  ```
  http://127.0.0.1:8080/coches/1
  ```

- Parámetro obligatorio de tipo URL
  - **1**: *(tipo: integer. Indica el código del coche que se requiere obtener)*

**Response**
- Código **HTTP 200** *Ok*
  ``` json
  {
    "_id": "64a65682450dc9606752b1c9",
    "id": 1,
    "marca": "Ford",
    "modelo": "Ranger",
    "anio": 2023,
    "precio": 12500250,
    "descuento": 3.5,
    "es_0km": true,
    "velocidad_crucero": "Control en el volante"
  }
  ```
- Código **HTTP 500**: *El id no esta definido*
- Código **HTTP 500**: *El id no corresponde a un vehículo registrado*

## Método POST
**Request**
- URI utilizado
  ```
  http://127.0.0.1:8080/coches
  ```

- Parámetros requeridos del BODY
  - **marca=Ford**: *(tipo: string. Establece el valor de la marca)*
  - **modelo=Ranger**: *(tipo: string. Establece el valor del modelo)*
  - **anio=2023**: *(tipo: integer. Establece el valor del anio)*
  - **precio=12500250**: *(tipo: decimal. Establece el valor del precio)*

- Parámetros opcionales del BODY
  - **descuento=3.5**: *(tipo: decimal. Establece el valor del descuento)*
  - **es_0km=true**: *(tipo: boolean. Establece si es un coche 0km)*

**Response**
  - Código **HTTP 200** Ok: *Coche registrado con exito*
    ``` json
    {
      "_id": "64a8bdc543338572ea34fc73",
      "id": 12,
      "marca": "Ford",
      "modelo": "Ranger",
      "anio": 2023,
      "precio": 12500250,
      "descuento": 3.5,
      "es_0km": true
    }
    ```
  - Código **HTTP 400**: *Faltan datos relevantes*;

## Método PUT
**Request**
- URI utilizado
  ```
  http://127.0.0.1:8080/coches/12
  ```

- Parámetro obligatorio de tipo URL
  - **12**: *(tipo: integer. Indica el id del coche que se requiere modificar)*

- Parámetros requeridos del BODY
  - **marca=Ford**: *(tipo: string. Establece el valor de la marca)*
  - **modelo=Fiesta**: *(tipo: string. Establece el valor del modelo)*
  - **anio=2018**: *(tipo: integer. Establece el valor del anio)*
  - **precio=2500750**: *(tipo: decimal. Establece el valor del precio)*

- Parámetros opcionales del BODY
  - **descuento=3.5** *(tipo: decimal. Establece el valor del descuento)*
  - **es_0km=true** *(tipo: boolean. Establece si es un coche 0km)*

**Response**
  - Código **HTTP 200** Ok: *Coche editado con éxito*
    ``` json
    {
      "_id": "64a8bdc543338572ea34fc73",
      "id": 12,
      "marca": "Ford",
      "modelo": "Fiesta",
      "anio": 2018,
      "precio": 2500750,
      "descuento": 3.5,
      "es_0km": true
    }
    ```
  - Código **HTTP 500**: *Faltan datos relevantes*;
  - Código **HTTP 500**: *El id no corresponde a un vehiculo registrado*;

## Método DELETE
**Request**
- URI utilizado
  ```
  http://127.0.0.1:8080/coches/12
  ```

- Parámetro obligatorio de tipo URL
  - **12**: *(tipo: integer. Indica el id del coche que se requiere eliminar)*

**Response**
- Código **HTTP 200** Ok: *Coche eliminado con exito*
- Código **HTTP 500**: *El id no esta definido*
- Código **HTTP 500**: *El id no corresponde a un vehiculo registrado*

## Método USE
**Request**
- URI utilizado
  ```
  http://127.0.0.1:8080/cualquier-url-erronea
  ```

- Parámetro obligatorio de tipo URL
  - **cualquier-url-erronea**: *(tipo: string. Indica una URI inexistente)*

**Response**
- Código **HTTP 404**: *Url no encontrada*

<h2 align='center'>Instrucciones de instalación</h2>

### Requerimientos
- IDE - Visual Studio Code v1.84.2
- MongoDB
- Git v2.43.0
- Node.js v20.9.0

### Preparando el ambiente
- Descargar o clonar el repositorio.
- Instalar las dependencias necesarias con el comando `npm install`.
- En la raíz del proyecto crear un archivo `.env`, copiar las variables de entorno que se encuentran en el archivo `.env.dist` y reemplazar su valor siguiendo las indicaciones.
- Correr el comando `npm start` para iniciar el servidor en modo desarrollo.
- Usar la URL base `http://127.0.0.1:8080/coches` para interactuar con el servidor.

---

### Autor
| [<img src='https://avatars.githubusercontent.com/u/105408069?v=4' width=115><br><sub>Javier Anibal Villca</sub>](https://github.com/Javier104-dev) |
| :------------------------------------------------------------------------------------------------------------------------------------------------: |
