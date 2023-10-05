package com.example.case_study_module4.controller;

import com.example.case_study_module4.model.Blog;
import com.example.case_study_module4.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/blog2")
public class BlogControllerTai {
    @Autowired
    private IBlogService blogService;
    @Value("${upload.path}")
    private String upload;
    @PostMapping ("/createNewBlog")
    public ResponseEntity<String> createNewBlog(@RequestPart Blog blog,
                                                @RequestPart(value = "file", required = false) MultipartFile multipartFile) {
        saveImage(multipartFile, blog);
        LocalDate date = LocalDate.now();
        blog.setDate(date);
        blogService.save(blog);
        return new ResponseEntity<>("Ok xxx", HttpStatus.OK);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<Blog> findById(@PathVariable Long id) {
        Blog blog = blogService.findById(id);
        if (blog != null) {
            return new ResponseEntity<>(blog, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    private void saveImage(MultipartFile file, Blog blog) {
        // nếu chọn file thì tiến hành lưu ảnh
        if (file.getSize() > 0) {
            String name = file.getOriginalFilename();
            try {
                FileCopyUtils.copy(file.getBytes(), new File(upload + name));
            } catch (Exception e) {
                e.printStackTrace();
            }
            blog.setUrl_img(name);
        }

        // nếu không chọn file và id student khác null thì đặt ảnh cũ:
        if (file.getSize() == 0 && !Objects.equals(blog.getId(), null)) {
            Blog blog1 = blogService.findById(blog.getId());
            blog.setUrl_img(blog1.getUrl_img());
        }
    }
    @GetMapping("/findBlogByAccount/{id}")
    public ResponseEntity<List<Blog>> findBlogByAccount(@PathVariable Long id) {
        List<Blog> blogs = blogService.listBlogByAccount(id);
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }
}
