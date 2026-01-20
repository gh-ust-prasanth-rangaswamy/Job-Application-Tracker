package com.example.jobapplicationtracker.service;

import com.example.jobapplicationtracker.model.Application;
import com.example.jobapplicationtracker.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository repo;

    public List<Application> getAll() {
        return repo.findAll();
    }

    public Application save(Application app) {
        return repo.save(app);
    }

    public Application update(int id, Application app) {
        app.setId(id);
        return repo.save(app);
    }

    public void delete(int id) {
        repo.deleteById(id);
    }

//    public Page<Application> getPaginatedApplications(int page, int size) {
//        return repo.findAll(PageRequest.of(page, size));
//    }

    public Page<Application> getFilteredPaginatedApplications(
            int page,
            int size,
            String search,
            String status
    ) {
        Pageable pageable = PageRequest.of(page, size);

        if ((status == null || status.equals("All")) &&
                (search == null || search.isEmpty())) {
            return repo.findAll(pageable);
        }

        return repo.findByFilters(
                search == null ? "" : search,
                status == null || status.equals("All") ? "" : status,
                pageable
        );
    }
    public Map<String, Long> getStatistics() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", repo.countTotal());
        stats.put("applied", repo.countByStatus("Applied"));
        stats.put("interview", repo.countByStatus("Interview"));
        stats.put("rejected", repo.countByStatus("Rejected"));
        return stats;
    }


}
