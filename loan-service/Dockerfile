# Etapa 1: Construcción del proyecto
FROM maven:3.9.5-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Creación de la imagen final
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/target/loan-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "app.jar"]
