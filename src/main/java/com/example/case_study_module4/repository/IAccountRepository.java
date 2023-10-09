package com.example.case_study_module4.repository;

import com.example.case_study_module4.model.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface IAccountRepository extends JpaRepository<Account, Long> {
    Account findByName(String name);
}
