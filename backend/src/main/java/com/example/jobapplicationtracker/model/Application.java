package com.example.jobapplicationtracker.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "applications")
@Data
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String candidateName;
    private String company;
    private String role;
    private String status;
    private String Description;
}
