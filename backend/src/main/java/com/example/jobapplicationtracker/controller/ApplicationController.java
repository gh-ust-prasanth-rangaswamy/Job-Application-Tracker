package com.example.jobapplicationtracker.controller;

import com.example.jobapplicationtracker.model.Application;
import com.example.jobapplicationtracker.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    @Autowired
    private ApplicationService service;

    @GetMapping
    public List<Application> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Application create(@RequestBody Application app) {
        return service.save(app);
    }

    @PutMapping("/{id}")
    public Application update(@PathVariable int id,
                              @RequestBody Application app) {
        return service.update(id, app);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        service.delete(id);
    }


    @GetMapping("/page")
    public Page<Application> getPaginatedApplications(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search
    ) {
        return service.getFilteredPaginatedApplications(page, size, search, status);
    }
    @GetMapping("/stats")
    public Map<String, Long> getStatistics() {
        return service.getStatistics();
    }



}   

