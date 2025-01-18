@echo off
:: Cambia a la ruta de destino
cd /d C:\ruta\user-service

:: Crear las carpetas necesarias
mkdir controller
mkdir service
mkdir repository
mkdir dto
mkdir config
mkdir entity

:: Crear los archivos en cada carpeta
cd controller
echo // Controladores REST y SOAP > UserController.java
cd ..

cd service
echo // Lógica de negocio para usuarios > UserService.java
cd ..

cd repository
echo // Acceso a datos para usuarios > UserRepository.java
cd ..

cd dto
echo // Objetos de transferencia de datos para usuarios > UserDto.java
cd ..

cd config
echo // Configuración de SOAP y base de datos > SOAPConfig.java
echo // Configuración de base de datos > DatabaseConfig.java
cd ..

cd entity
echo // Entidades JPA relacionadas con usuarios > User.java
cd ..

@echo Carpetas y archivos creados correctamente.
pause
