@echo off
:: Cambia a la ruta de destino
cd /d C:\ruta\book-service

:: Crear las carpetas necesarias
mkdir controller
mkdir service
mkdir repository
mkdir dto
mkdir config
mkdir entity

:: Crear los archivos en cada carpeta
cd controller
echo // Controladores REST y SOAP para libros > BookController.java
cd ..

cd service
echo // Lógica de negocio para libros > BookService.java
cd ..

cd repository
echo // Acceso a datos para libros > BookRepository.java
cd ..

cd dto
echo // Objetos de transferencia de datos para libros > BookDto.java
cd ..

cd config
echo // Configuración de SOAP para libros > SOAPConfig.java
echo // Configuración de base de datos para libros > DatabaseConfig.java
cd ..

cd entity
echo // Entidades JPA relacionadas con libros > Book.java
cd ..

@echo Carpetas y archivos para book-service creados correctamente.
pause
