package com.example.case_study_module4.repository;

import com.example.case_study_module4.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
@Repository
public interface IBlogRepository extends JpaRepository<Blog, Long> {

    @Query(value = "select * from blog where id_account = ?", nativeQuery = true)
    List<Blog> disPlayListBlogByIdAccount(Long id_account);

    @Query(value = "select * from blog where title like %?%", nativeQuery = true)
    List<Blog> searchByTitle(String title);
}
