@echo off
:: Cambia a la ruta de destino
cd /d C:\ruta\loan-service

:: Crear las carpetas necesarias
mkdir controller
mkdir service
mkdir repository
mkdir dto
mkdir config
mkdir entity

:: Crear los archivos en cada carpeta
cd controller
echo // Controladores REST para préstamos > LoanController.java
cd ..

cd service
echo // Lógica de negocio para préstamos > LoanService.java
cd ..

cd repository
echo // Acceso a datos para préstamos > LoanRepository.java
cd ..

cd dto
echo // Objetos de transferencia de datos para préstamos > LoanDto.java
cd ..

cd config
echo // Configuración de base de datos para préstamos > DatabaseConfig.java
cd ..

cd entity
echo // Entidades JPA relacionadas con préstamos > Loan.java
cd ..

@echo Carpetas y archivos para loan-service creados correctamente.
pause
