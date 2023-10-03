package com.example.case_study_module4.service;

import com.example.case_study_module4.model.account.Account;
import com.example.case_study_module4.model.account.DTO.AccountDTO;

import java.util.List;

public interface IAccountService{
    List<AccountDTO> findAll();
    AccountDTO findById(Long id);
    Account findByAccountName(String name);
    boolean save(Account account);
    void delete(Long id);
    AccountDTO toDTO(Account account);
}
