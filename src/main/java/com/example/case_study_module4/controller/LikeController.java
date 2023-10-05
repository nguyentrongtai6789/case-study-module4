package com.example.case_study_module4.controller;

import com.example.case_study_module4.model.Blog;
import com.example.case_study_module4.model.Like;
import com.example.case_study_module4.model.account.Account;
import com.example.case_study_module4.service.IAccountService;
import com.example.case_study_module4.service.IBlogService;
import com.example.case_study_module4.service.ILikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/like")
public class LikeController {
    @Autowired
    private ILikeService likeService;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IBlogService blogService;
    @PostMapping("/createLike")
    public ResponseEntity<String> createLike(@RequestBody Like like) {
        likeService.save(like);
        return new ResponseEntity<>("xxx", HttpStatus.OK);
    }
    @GetMapping("/findAllLike")
    public ResponseEntity<List<Like>> findAllLike() {
        return new ResponseEntity<>(likeService.findALl(), HttpStatus.OK);
    }
    @DeleteMapping("/unLike")
    public ResponseEntity<String> unLike(@RequestBody Like like) {
        likeService.deleteByAccountAndBlog(like.getAccount().getId(), like.getBlog().getId());
        return new ResponseEntity<>("xxx", HttpStatus.OK);
    }
}
