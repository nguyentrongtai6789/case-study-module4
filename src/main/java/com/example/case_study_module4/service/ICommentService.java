package com.example.case_study_module4.service;

import com.example.case_study_module4.model.Comment;
import com.example.case_study_module4.model.Like;

import java.util.List;

public interface ICommentService extends IGenerateService<Comment>{
    List<Comment> findByAccountId(Long id);
    List<Comment> findByBlogId(Long id);
}
