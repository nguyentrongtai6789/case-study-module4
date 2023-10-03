package com.example.case_study_module4.service.impl;

import com.example.case_study_module4.model.account.Account;
import com.example.case_study_module4.model.account.AccountPrinciple;
import com.example.case_study_module4.model.account.DTO.AccountDTO;
import com.example.case_study_module4.repository.IAccountRepository;
import com.example.case_study_module4.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService implements IAccountService, UserDetailsService {
    @Autowired
    private IAccountRepository accountRepository;
    @Override
    public List<AccountDTO> findAll() {
        List<AccountDTO> accountDTOS = new ArrayList<>();
        for (Account account : accountRepository.findAll()) {
            accountDTOS.add(toDTO(account));
        }
        return accountDTOS; // trả ra 1 list account DTO để thao tác gì đó mà ko thao tác trực tiếp với account
    }

    @Override
    public AccountDTO findById(Long id) {
        Optional<Account> accountOptional = accountRepository.findById(id);
        if (accountOptional.isPresent()) {
            return toDTO(accountOptional.get());
        }
        return null;
    }

    @Override
    public Account findByAccountName(String name) {
        return accountRepository.findByName(name);
    }

    @Override
    public boolean save(Account account) {
        accountRepository.save(account);
        return true;
    }

    @Override
    public void delete(Long id) {
        accountRepository.deleteById(id);
    }

    @Override
    public AccountDTO toDTO(Account account) {
        return new AccountDTO(account.getId(), account.getName(), account.getRoles());
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Account account = accountRepository.findByName(name);
        if (account != null) {
            return AccountPrinciple.build(account); // tạo ra một đối tượng accountPrinciple từ account
        }
        return null;
    }
}