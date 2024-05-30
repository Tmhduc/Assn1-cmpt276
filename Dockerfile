FROM maven:3.8.4-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21
COPY --from=build /target/asn1-0.0.1-SNAPSHOT.jar /opt/app/assn1duc.jar
CMD ["java", "-jar", "/opt/app/assn1duc.jar"]