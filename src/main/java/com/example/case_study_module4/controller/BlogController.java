package com.example.case_study_module4.controller;

import com.example.case_study_module4.model.Blog;
import com.example.case_study_module4.model.Category;
import com.example.case_study_module4.model.account.Account;
import com.example.case_study_module4.model.account.DTO.AccountDTO;
import com.example.case_study_module4.service.IAccountService;
import com.example.case_study_module4.service.IBlogService;
import com.example.case_study_module4.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Objects;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/controller")
public class BlogController {
    @Autowired
    IBlogService iBlogService;
    @Autowired
    IAccountService iAccountService;
    @Autowired
    ICategoryService iCategoryService;

    @Value("${upload.path}")
    private String upload;

    @GetMapping("/update/{id}")
    public ResponseEntity<Blog> findOne(@PathVariable("id_blog") Long id){
        return new ResponseEntity<>(iBlogService.findById(id), HttpStatus.OK);
    }
    @PostMapping("/update/{id_account}/{id_category}")
    public ResponseEntity<?> update(@RequestBody Blog new_Blog,
                                 @PathVariable("id_account") Long id_account,
                                 @PathVariable("id_category") Long id_category,
                                 @RequestPart(value = "file", required = false) MultipartFile file){
        getImagePath(new_Blog, file);
        Account account = iAccountService.findOneAccountById(id_account);
        Category category = iCategoryService.findById(id_category);
        new_Blog.setCategory(category);
        new_Blog.setAccount(account);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    private void getImagePath(Blog blog, MultipartFile file) {
        if (file.getSize() == 0) {
            if (Objects.equals(blog.getId(), null)) {
                blog.setUrl_img("oto2.jpg");
            }
        } else {
            String name = file.getOriginalFilename();
            try {
                FileCopyUtils.copy(file.getBytes(), new File(upload + name));
            } catch (Exception e) {
                e.printStackTrace();
            }
           blog.setUrl_img(name);
        }
    }


}
