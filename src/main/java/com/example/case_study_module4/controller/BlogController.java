package com.example.case_study_module4.controller;

import com.example.case_study_module4.model.Blog;
import com.example.case_study_module4.model.Category;
import com.example.case_study_module4.model.account.Account;
import com.example.case_study_module4.model.account.DTO.AccountDTO;
import com.example.case_study_module4.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/blog")
public class BlogController {
    @Autowired
    IBlogService iBlogService;
    @Autowired
    IAccountService iAccountService;
    @Autowired
    ICategoryService iCategoryService;
    @Autowired
    ICommentService iCommentService;
    @Autowired
    ILikeService iLikeService;

    @Value("${upload.path}")
    private String upload;

    @GetMapping
    public ResponseEntity<List<Blog>> disPlayBlog(){
        return new ResponseEntity<>(iBlogService.findALl(), HttpStatus.OK);
    }
    @GetMapping("/display/{id_account}")
    public ResponseEntity<List<Blog>> disPlayListBlogByAcount(@PathVariable("id_account") Long id_account){
        return new ResponseEntity<>(iBlogService.listBlogByAccount(id_account), HttpStatus.OK);
    }
    @GetMapping("/displayoneblog/{id_blog}")
    public ResponseEntity<Blog> disPlayOneBlog(@PathVariable("id_blog") Long id_blog){
        return new ResponseEntity<>(iBlogService.findById(id_blog), HttpStatus.OK);
    }

    @GetMapping("/update/{id-blog}")
    public ResponseEntity<Blog> findOne(@PathVariable("id-blog") Long id){
        return new ResponseEntity<>(iBlogService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/update/{id_account}/{id_category}")
    public ResponseEntity<?> update(@RequestPart("blog") Blog new_Blog,
                                    @PathVariable("id_account") Long id_account,
                                    @PathVariable("id_category") Long id_category,
                                    @RequestPart(value = "file", required = false) MultipartFile file){
        getImagePath(new_Blog, file);
        Account account = iAccountService.findOneAccountById(id_account);
        Category category = iCategoryService.findById(id_category);
        new_Blog.setCategory(category);
        new_Blog.setAccount(account);
        iBlogService.save(new_Blog);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/delete/{id_blog}")
    public ResponseEntity<?> delete(@PathVariable("id_blog") Long id_blog){

        iLikeService.deleteLikeByIdBlog(id_blog);
        iCommentService.deleteCommentByIdBlog(id_blog);
        iBlogService.deleteById(id_blog);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    private void getImagePath(Blog blog, MultipartFile file) {
        if (file.getSize() == 0) {
            if (Objects.equals(blog.getId(), null)) {
                blog.setUrl_img("anh_bua.JPG");
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

    @GetMapping("/search_by_category/{id_category}")
    public ResponseEntity<List<Blog>> searchByCategory(@PathVariable("id_category") Long id_category){
        return new ResponseEntity<>(iBlogService.searchByCategory(id_category), HttpStatus.OK);
    }

    @GetMapping("/search_by_title/{title}")
    public ResponseEntity<List<Blog>> searchByTitle(@PathVariable("title") String title){
        return new ResponseEntity<>(iBlogService.searchByTitleBlog(title), HttpStatus.OK);
    }
    @PostMapping("/create/{id_account}/{id_category}")
    public ResponseEntity<?> createBlog(@RequestPart("blog") Blog new_Blog,
                                        @PathVariable("id_account") Long id_account,
                                        @PathVariable("id_category") Long id_category,
                                        @RequestPart(value = "file", required = false) MultipartFile file){
        new_Blog.setCategory(iCategoryService.findById(id_category));
        new_Blog.setAccount(iAccountService.findOneAccountById(id_account));
        getImagePath(new_Blog, file);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
