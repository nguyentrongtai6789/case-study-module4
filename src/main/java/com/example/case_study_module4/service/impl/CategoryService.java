package com.example.case_study_module4.service.impl;

import com.example.case_study_module4.model.Category;
import com.example.case_study_module4.repository.ICategoryRepository;
import com.example.case_study_module4.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository categoryRepository;
    @Override
    public List<Category> findALl() {
        return null;
    }

    @Override
    public Page<Category> findAll() {
        return null;
    }

    @Override
    public void save(Category category) {

    }

    @Override
    public Category findById(Long id) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }
}
