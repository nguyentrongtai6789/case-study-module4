package com.example.case_study_module4.controller;

import com.example.case_study_module4.jwt.service.JwtResponse;
import com.example.case_study_module4.jwt.service.JwtService;
import com.example.case_study_module4.model.account.Account;
import com.example.case_study_module4.model.account.DTO.AccountDTO;
import com.example.case_study_module4.model.account.Role;
import com.example.case_study_module4.service.impl.AccountService;
import com.example.case_study_module4.service.impl.RoleService;
import javafx.scene.effect.SepiaTone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class AccountController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleService roleService;

    @GetMapping("/findAllAccounts")
    public ResponseEntity<List<AccountDTO>> getAllAccount() {
        return new ResponseEntity<>(accountService.findAll(), HttpStatus.OK);
    }
    @GetMapping("/searchAccountByName/{name}")
    public ResponseEntity<AccountDTO> searchAccountByName(@PathVariable String name) {
        Account account = accountService.findByAccountName(name);
        if (account != null) {
            AccountDTO accountDTO = accountService.toDTO(account);
            return new ResponseEntity<>(accountDTO, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Account account) {
        // phương thức này sẽ trả về một token
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(account.getName(), account.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtService.generateTokenLogin(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Account accountInfo = accountService.findByAccountName(account.getName());
        return ResponseEntity.ok(new JwtResponse(accountInfo.getId(), jwt, accountInfo.getName(),
                accountInfo.getName(), userDetails.getAuthorities()));
    }

    @PostMapping("/saveAccount")
    public ResponseEntity<String> saveAccount(@RequestBody Account account) {
        Set<Role> roles = new HashSet<>();
        roles.add(roleService.findById(2L));
        account.setRoles(roles);
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        List<AccountDTO> accountDTOSs = accountService.findAll();
        AccountDTO accountDTO = accountService.toDTO(account);
        for (AccountDTO account1 : accountDTOSs) {
            if (account1.getName().equals(accountDTO.getName())) {
                return new ResponseEntity<>("Tên đã tồn tại!", HttpStatus.BAD_REQUEST);
            }
            if (account1.getPhone().equals(accountDTO.getPhone())) {
                return new ResponseEntity<>("Số điện thoại đã tồn tại!", HttpStatus.BAD_REQUEST);
            }
            if (account1.getEmail().equals(accountDTO.getEmail())) {
                return new ResponseEntity<>("Email đã tồn tại!", HttpStatus.BAD_REQUEST);
            }
        }
        accountService.save(account);
        return new ResponseEntity<>("Đăng kí thành công!", HttpStatus.OK);
    }
    @PostMapping("/saveNewRole/{id}")
    public ResponseEntity<String> saveNewRole(@PathVariable Long id) {
        AccountDTO accountDTO = accountService.findById(id);
        if (accountDTO != null) {
            Account account = accountService.findByAccountName(accountDTO.getName());
            Set<Role> roles = new HashSet<>();
            roles.add(roleService.findById(1L));
            roles.add(roleService.findById(2L));
            account.setRoles(roles);
            accountService.save(account);
            return new ResponseEntity<>("Thêm quyền admin thành công!", HttpStatus.OK);
        }
        return new ResponseEntity<>("xxx", HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/passwordRetrieval")
    public ResponseEntity<String> passwordRetrieval(@RequestBody Account account) {
        Account account1 = accountService.findByAccountName(account.getName());
        if (account1 != null) {
            if (account1.getName().equals(account.getName())
                    && account1.getPhone().equals(account.getPhone())
                    && account1.getEmail().equals(account.getEmail())) {
                account1.setPassword(passwordEncoder.encode(account.getPassword()));
                accountService.save(account1);
                return new ResponseEntity<>("Bạn đã lấy lại mật khẩu thành công!", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Thông tin không đúng!", HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody Account account) {
        Account account1 = accountService.findByAccountName(account.getName());
        if (account1 != null) {
            if (account1.getName().equals(account.getName())
                    && account1.getPhone().equals(account.getPhone())
                    && account1.getEmail().equals(account.getEmail())) {
                account1.setPassword(passwordEncoder.encode(account.getPassword()));
                accountService.save(account1);
                return new ResponseEntity<>("Đổi mật khẩu thành công!", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Thông tin không đúng!", HttpStatus.BAD_REQUEST);
    }
    @DeleteMapping("/deleteAccount/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id) {
        AccountDTO account = accountService.findById(id);
        if (account != null) {
            accountService.delete(id);
            return new ResponseEntity<>("Xoá thành công!", HttpStatus.OK);
        }
        return new ResponseEntity<>("xxx", HttpStatus.BAD_REQUEST);
    }
}