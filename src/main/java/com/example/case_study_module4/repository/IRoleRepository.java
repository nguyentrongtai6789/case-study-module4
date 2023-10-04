package com.example.case_study_module4.repository;

import com.example.case_study_module4.model.account.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {
}
