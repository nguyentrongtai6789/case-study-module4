package com.example.case_study_module4.service;

import com.example.case_study_module4.model.Blog;
import com.example.case_study_module4.model.account.Account;

import java.util.List;

public interface IBlogService extends IGenerateService<Blog>{
    public List<Blog> listBlogByAccount(Long id_account);
    public List<Blog> searchByCategory(Long id_category);
    public List<Blog> searchByTitleBlog(String title);
}
