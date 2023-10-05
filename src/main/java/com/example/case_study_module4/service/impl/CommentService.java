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
    public List<Comment> findByBlogId(Long id) {
        return commentRepository.findByBlogId(id);
    }

    @Override
    public List<Comment> findByAccountId(Long id) {
        return commentRepository.findByAccountId(id);
    }

    @Override
    public List<Comment> findALl() {
        return commentRepository.findAll();
    }

    @Override
    public Page<Comment> findAll() {
        return null;
    }

    @Override
    public void save(Comment comment) {
        commentRepository.save(comment);
    }

    @Override
    public Comment findById(Long id) {
        return commentRepository.findById(id).get();
    }

    @Override
    public void deleteById(Long id) {
        commentRepository.deleteById(id);
    }
}
