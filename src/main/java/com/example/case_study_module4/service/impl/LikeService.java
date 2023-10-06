package com.example.case_study_module4.service.impl;

import com.example.case_study_module4.model.Like;
import com.example.case_study_module4.repository.ILikeRepository;
import com.example.case_study_module4.service.ILikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService implements ILikeService {
    @Autowired
    private ILikeRepository likeRepository;
    @Override
    public List<Like> findALl() {
        return null;
    }

    @Override
    public Page<Like> findAll(Pageable pageable) {
        return likeRepository.findAll(pageable);
    }

    @Override
    public void save(Like like) {

    }

    @Override
    public Like findById(Long id) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }
}
