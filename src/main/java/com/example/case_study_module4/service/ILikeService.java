package com.example.case_study_module4.service;

import com.example.case_study_module4.model.Like;

public interface ILikeService extends IGenerateService<Like> {
    void deleteByAccountAndBlog(Long id_account, Long id_blog);
}
