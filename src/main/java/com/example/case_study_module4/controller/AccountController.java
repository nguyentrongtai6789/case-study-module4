package com.example.case_study_module4.controller;

import com.example.case_study_module4.jwt.service.JwtResponse;
import com.example.case_study_module4.jwt.service.JwtService;
import com.example.case_study_module4.model.account.Account;
import com.example.case_study_module4.model.account.DTO.AccountDTO;
import com.example.case_study_module4.service.impl.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/accounts")
    public ResponseEntity<List<AccountDTO>> getAllAccount() {
        return new ResponseEntity<>(accountService.findAll(), HttpStatus.OK);
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

}