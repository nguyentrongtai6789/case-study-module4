package com.example.case_study_module4.repository;

import com.example.case_study_module4.model.Comment;
import com.example.case_study_module4.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ILikeRepository extends JpaRepository<Like, Long> {
    @Transactional
    @Modifying
    @Query(value = "delete from likes where id_account = ?1 and id_blog = ?2", nativeQuery = true)
    void deleteByAccountAndBlog(Long id_account, Long id_blog);
}
