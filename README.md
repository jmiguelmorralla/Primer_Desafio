# DESAFÍO ENTREGABLE: Websockets + Handlebars

En esta entrega se implementan:

Gestores de “productos” y de “usuarios” para guardar los datos en la memoria (memory) y en archivos (files).
    - create(data) para crear un recurso
    - read() para leer todos los recursos
    - readOne(id) para leer este recurso
    - update(id,data) para actualizar este recurso
    - destroy(id) para eliminar este recurso

El desarrollo está 100% en inglés para definir una API REST.

Se crearon todos los endpoints requeridos para la entrega tanto para usuarios como para productos.

Se manejan errores de todas las rutas con errorHandler y rutas que no existen con pathHandler y el registro de las solicitudes con Morgan.

Se definieron cuatro usuarios y cuarenta productos.

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

Sockets:
    - “connection” para configurar los dos puntos de conexión (sockets) del back y del front:
        -socketServer.on() en el socket del servidor
        -script de socket y ejecutar io() para generar el socket del cliente
    - Emisión “products”: en el socket del servidor (back), llamar al manager de productos de FS para enviar un objeto con todos los productos hacia el socket del cliente.
    - Recepción “products”: en el socket del cliente de la vista /real de handlebars, con js renderizar dinámicamente y en tiempo real los productos recibidos.
    - Emisión “new product”: en el socket del cliente de la vista /real de handlebars, con js, capturar los datos del formulario y luego emitir el producto para guardarlo en el json del back.
    - Recepción “new product”: en el socket del servidor, guardar el producto en el archivo y luego emitir todos los productos para actualizar en tiempo real la vista /real