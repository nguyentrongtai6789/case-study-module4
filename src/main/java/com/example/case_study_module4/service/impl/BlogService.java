package com.example.case_study_module4.service.impl;

import com.example.case_study_module4.model.Blog;
import com.example.case_study_module4.model.account.Account;
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
        return blogRepository.findAll();
    }

    @Override
    public Page<Blog> findAll() {
        return null;
    }

    @Override
    public void save(Blog blog) {
        blogRepository.save(blog);
    }

    @Override
    public Blog findById(Long id) {
        return blogRepository.findById(id).get();
    }

    @Override
    public void deleteById(Long id) {
        blogRepository.deleteById(id);
    }

    @Override
    public List<Blog> listBlogByAccount(Long id_account) {
        return blogRepository.disPlayListBlogByIdAccount(id_account);
    }
}
