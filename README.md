# DESAFÍO ENTREGABLE OPCIONAL: Práctica de integración sobre tu ecommerce

En esta entrega opcional se implementan:

Gestores de “productos” y de “usuarios” para guardar los datos en la memoria (memory), en archivos (files) y en MongoDB
    - create(data) para crear un recurso
    - read() para leer todos los recursos
    - readOne(id) para leer este recurso
    - update(id,data) para actualizar este recurso
    - destroy(id) para eliminar este recurso

El desarrollo está 100% en inglés para definir una API REST.

Se crearon todos los endpoints requeridos para la entrega tanto para usuarios como para productos.

Se manejan errores de todas las rutas con errorHandler y rutas que no existen con pathHandler y el registro de las solicitudes con Morgan.

Se definieron cuatro usuarios, cuarenta productos y dos carritos.

Cada producto tiene las propiedades:
    - id (código identificador de 12bytes y hexadecimal)
    - title (titulo, obligatorio)
    - photo (ruta de imagen, con valores por defecto)
    - category (categoria del producto, con valores por defecto)
    - price (precio, por defecto 1)
    - stock (unidades disponibles, por defecto 1)

Cada usuario tiene las propiedades:
    - id (12bytes y hexadecimal)
    - photo (ruta de imagen, dar valores por defecto)
    - email (obligatorio)
    - password (obligatorio)
    - role (rol de usuario, por defecto 0)

Cada carrito tiene las propiedades: 
    - id de carrito
    - user_id (para referenciar el usuario que agregó el producto a su carrito)
    - product_id (para referenciar el producto que se agregó al carrito)
    - quantity: de tipo númerico y obligatorio para indicar cuantas unidades se enviaron al carrito
    - state: para identificar el estado de la compra

Sockets:
    Quedan implementados de la entrega anterior.

Vistas
    - localhost:8080/ “landing page” con barra de navegación, logo y todos los productos disponibles (no es necesario el filtro).
    - localhost:8080/products/:pid debe mostrar el detalle del producto y un botón para agregar al carrito.
    - localhost:8080/users/register debe mostrar la página con un formulario para registrar un usuario.
    - localhost:8080/users/:uid debe mostrar la página con los datos del usuario.