package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {
        "controller",
        "service",
        "service.impl",
        "repository",
        "entity",
        "config",
        "exception",
        "com.example.programs"
})
@EnableJpaRepositories(basePackages = "repository")
@EntityScan(basePackages = "entity")
public class FlightManagementBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(FlightManagementBackendApplication.class, args);
    }
}