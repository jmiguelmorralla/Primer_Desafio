
# Challenge_3
En esta entrega se pretenden implementar:

Gestores de “productos”, de “usuarios” y de “carritos” para guardar los datos en la memoria (memory) y en archivos (files) y en la nube (mongo) con el CRUD correspondiente de cada recurso.
App 100% en inglés para definir una API REST
Manejar errores de todas las rutas con errorHandler y rutas que no existen con pathhandler
Manejar el registro de las solicitudes con morgan
Definir cuatro usuarios y cuarenta productos
Incluir conexión de mongo
Definir las capas de enrutamiento, control, servicios, repositorios (dao y dto) y data

PASSPORT y JWT
passport local con callback personalizable sólo para register y login
la autenticación y autorización se realizará exclusivamente con jwt dentro de las políticas del CustomRouter

ENTORNOS
Manejar con argumentos los entornos dev, prod y test. Los diferentes entornos manejan al menos diferentes variables PORT y MONGO_LINK
Manejar la persistencia según el entorno: dev y prod se conectan con mongo mientras que test con fs

VISTAS
Todas las vistas se desarrollarán con handlebars, js o react (lo que prefieran)
Velar por el correcto consumo y renderizado por parte del cliente y probar la correcta visualización según los diferentes roles.

VERIFICACION
El registro debe enviar un email con una plantilla y un código de verificación
Agregar toda la seguridad necesaria para que ahora un usuario registrado NO VERIFICADO no pueda iniciar sesión ni acceder a las funcionalidades de la app.
Agregar un nuevo formulario a las vistas para poder ingresar el código y verificar correctamente el registro de un usuario.
