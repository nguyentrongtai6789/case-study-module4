package com.example.case_study_module4.service.impl;

import com.example.case_study_module4.model.Blog;
import com.example.case_study_module4.repository.IBlogRepository;
import com.example.case_study_module4.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BlogService implements IBlogService {
    @Autowired
    private IBlogRepository blogRepository;
    @Override
    public List<Blog> findALl() {
        return null;
    }

    @Override
    public Page<Blog> findAll() {
        return null;
    }

    @Override
    public void save(Blog blog) {

    }

    @Override
    public Blog findById(Long id) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }
}
