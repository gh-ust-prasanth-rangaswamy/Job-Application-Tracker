package com.example.jobapplicationtracker.repository;

import com.example.jobapplicationtracker.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ApplicationRepository
        extends JpaRepository<Application, Integer> {

  //  Page<Application> findAll(Pageable pageable);

    @Query("""
                SELECT a FROM Application a WHERE
                (:search = '' OR LOWER(a.candidateName) LIKE LOWER(CONCAT('%', :search, '%')))
                AND (:status = '' OR a.status = :status)
                """)
    Page<Application> findByFilters(
            @Param("search") String search,
            @Param("status") String status,
            Pageable pageable
    );
    @Query("SELECT COUNT(a) FROM Application a")
    long countTotal();

    @Query("SELECT COUNT(a) FROM Application a WHERE a.status = :status")
    long countByStatus(@Param("status") String status);


}

