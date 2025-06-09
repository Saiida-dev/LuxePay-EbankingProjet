# Stage 1: Build the .war file using Maven and JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Run the .war file using Tomcat (JDK 21 support)
FROM tomcat:10.1-jdk21

# Clean default app
RUN rm -rf /usr/local/tomcat/webapps/ROOT

# Copy built WAR file
COPY --from=builder /app/target/*.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080
CMD ["catalina.sh", "run"]
