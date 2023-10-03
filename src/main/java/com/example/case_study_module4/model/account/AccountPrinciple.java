package com.example.case_study_module4.model.account;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class AccountPrinciple implements UserDetails {
    private static final long serialVersionUID = 1L;
    private final String name;
    private final String password;
    private final Collection<? extends GrantedAuthority> roles;
    public AccountPrinciple(String name, String password, Collection<? extends GrantedAuthority> roles) {
        this.name = name;
        this.password = password;
        this.roles = roles;
    }
    public static AccountPrinciple build(Account account) {
        List<GrantedAuthority> authorities = new ArrayList<>(); // danh sách các quyền của account
        for (Role role : account.getRoles()) { // duyệt qua các role của đối tượng account
            authorities.add(new SimpleGrantedAuthority(role.getName())); // add vào list danh sách các quyền của account
        }
        return new AccountPrinciple(account.getName(), account.getPassword(), authorities);
        // trả về một đối tượng của lớp này chứa tài khoản, mật khẩu và danh sách các quyền của tài khoản này
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
