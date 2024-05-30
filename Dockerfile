FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:22-jdk-slim
COPY --from=build /target/assn1duc-0.0.1-SNAPSHOT.jar assn1duc.jar
EXPOSE 8080
ENTRYPOINT [ "java","-jar","assn1duc.jar"]