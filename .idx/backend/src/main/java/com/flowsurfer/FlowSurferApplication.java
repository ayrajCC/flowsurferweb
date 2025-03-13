package com.flowsurfer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class FlowSurferApplication {
    public static void main(String[] args) {
        SpringApplication.run(FlowSurferApplication.class, args);
    }
}

@RestController
class HelloController {
    @GetMapping("/api/hello")
    public String hello() {
        return "Welcome to FlowSurfer Web!";
    }
}