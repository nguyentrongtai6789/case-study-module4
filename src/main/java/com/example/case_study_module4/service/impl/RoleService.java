package com.example.case_study_module4.service.impl;

import com.example.case_study_module4.model.account.Role;
import com.example.case_study_module4.repository.IRoleRepository;
import com.example.case_study_module4.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepository roleRepository;
    @Override
    public List<Role> findALl() {
        return roleRepository.findAll();
    }
    @Override
    public Page<Role> findAll() {
        return null;
    }

    @Override
    public void save(Role role) {

    }

    @Override
    public Role findById(Long id) {
        return roleRepository.findById(id).get();
    }

    @Override
    public void deleteById(Long id) {

    }
}
