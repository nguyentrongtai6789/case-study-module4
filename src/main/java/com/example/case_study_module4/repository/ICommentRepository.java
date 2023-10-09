package com.example.case_study_module4.repository;

import com.example.case_study_module4.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, Long> {
    @Transactional
    @Modifying
    @Query(value = "select * from comment where id_account = ?1", nativeQuery = true)
    List<Comment> findByAccountId(Long id);
    @Transactional
    @Modifying
    @Query(value = "select * from comment where id_blog = ?1", nativeQuery = true)
    List<Comment> findByBlogId(Long id);

    @Query(value = "delete from comment where id_blog = ?", nativeQuery = true)
    void deleteByIdBlog(Long id_Blog);
}
