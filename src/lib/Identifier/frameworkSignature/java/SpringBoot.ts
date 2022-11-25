import { FrameworkSignature } from "../FrameworkSignature";


export class SpringBoot implements FrameworkSignature {
  framework = "SpringBoot";

  checkFramework(path: string) {

    return false;
  }

  Dockerfile = `FROM openjdk:8-jdk-alpine
  RUN addgroup -S spring && adduser -S spring -G spring
  USER spring:spring
  ARG JAR_FILE=target/*.jar
  COPY \${JAR_FILE} app.jar
  EXPOSE 8080
  ENTRYPOINT ["java","-jar","/app.jar"]`;
}