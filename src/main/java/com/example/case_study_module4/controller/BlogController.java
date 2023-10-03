package com.example.case_study_module4.controller;

import com.example.case_study_module4.model.Blog;
import com.example.case_study_module4.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/controller")
public class BlogController {
    @Autowired
    IBlogService iBlogService;

    @GetMapping("/update/{id}")
    public ResponseEntity<Blog> findOne(@PathVariable("id_blog") Long id){
        return new ResponseEntity<>(iBlogService.findById(id), HttpStatus.OK);
    }
    @PostMapping("/update")
    public ResponseEntity update(@RequestBody Blog new_Blog){

    }


}
