package com.example.case_study_module4.service.impl;

import com.example.case_study_module4.model.Like;
import com.example.case_study_module4.repository.ILikeRepository;
import com.example.case_study_module4.service.ILikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService implements ILikeService {
    @Autowired
    private ILikeRepository likeRepository;

    @Override
    public void deleteByAccountAndBlog(Long id_account, Long id_blog) {
        likeRepository.deleteByAccountAndBlog(id_account, id_blog);
    }

    @Override
    public List<Like> findALl() {
        return likeRepository.findAll();
    }

    @Override
    public Page<Like> findAll() {
        return null;
    }

    @Override
    public void save(Like like) {
        likeRepository.save(like);
    }

    @Override
    public Like findById(Long id) {
        return likeRepository.findById(id).get();
    }

    @Override
    public void deleteById(Long id) {
        likeRepository.deleteById(id);
    }

}
