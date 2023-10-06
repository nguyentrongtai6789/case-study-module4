package com.example.case_study_module4.service.impl;

import com.example.case_study_module4.model.Comment;
import com.example.case_study_module4.repository.ICommentRepository;
import com.example.case_study_module4.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CommentService implements ICommentService {
    @Autowired
    private ICommentRepository commentRepository;
    @Override
    public List<Comment> findALl() {
        return null;
    }

    @Override
    public Page<Comment> findAll(Pageable pageable) {
        return commentRepository.findAll(pageable);
    }

    @Override
    public void save(Comment comment) {

    }

    @Override
    public Comment findById(Long id) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }
}
