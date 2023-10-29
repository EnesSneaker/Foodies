package com.foodies.backend.security.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:5173",
        "http://13.51.176.163:5173",
        "http://127.0.0.11",
        "http://172.26.0.2",
        "http://frontend"})
@RequestMapping("/api/v1/demo-controller")
public class DemoController {
   @GetMapping
    public ResponseEntity<String> sayHello() {
       return ResponseEntity.ok("Hello from Secured endpoint!");
   }
}
