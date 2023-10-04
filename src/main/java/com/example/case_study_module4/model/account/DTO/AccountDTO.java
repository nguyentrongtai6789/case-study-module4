package com.example.case_study_module4.model.account.DTO;

import com.example.case_study_module4.model.account.Role;

import java.util.Set;

public class AccountDTO {
    private Long id;
    private String name;

    private String phone;
    private String email;
    private Set<Role> roles;

    public AccountDTO() {
    }


    public AccountDTO(Long id, String name, String phone, String email, Set<Role> roles) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
