package com.example.case_study_module4.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IGenerateService <E>{
    List<E> findALl();
    Page<E> findAll();
    void save(E e);
    E findById(Long id);
    void deleteById(Long id);
}
