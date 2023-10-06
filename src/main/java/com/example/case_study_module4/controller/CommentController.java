package com.example.case_study_module4.controller;

import com.example.case_study_module4.model.Blog;
import com.example.case_study_module4.model.Comment;
import com.example.case_study_module4.model.account.Account;
import com.example.case_study_module4.model.account.DTO.AccountDTO;
import com.example.case_study_module4.service.IAccountService;
import com.example.case_study_module4.service.IBlogService;
import com.example.case_study_module4.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.BlockView;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private ICommentService commentService;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IBlogService blogService;

    @GetMapping("/findCommentOfAccount/{id}")
    public ResponseEntity<List<Comment>> findCommentOfAccount(@PathVariable Long id) {
        AccountDTO accountDTO = accountService.findById(id);
        if (accountDTO != null) {
            return new ResponseEntity<>(commentService.findByAccountId(id), HttpStatus.OK);
        }
        return null;
    }

    @PostMapping("/createCommentByAccount")
    public ResponseEntity<String> createCommentByAccountId(@RequestBody Comment comment) {
        LocalTime time = LocalTime.now();
        comment.setTime(time);
        commentService.save(comment);
        return new ResponseEntity<>("OK", HttpStatus.CREATED);
    }

    @GetMapping("/findAllCommentOfBlog/{id}")
    public ResponseEntity<List<Comment>> findAllCommentOfBlog(@PathVariable Long id) {
        Blog blog = blogService.findById(id);
        if (blog != null) {
            List<Comment> comments = commentService.findByBlogId(id);
            Collections.reverse(comments);
            return new ResponseEntity<>(comments, HttpStatus.OK);
        }
        return null;
    }
}
