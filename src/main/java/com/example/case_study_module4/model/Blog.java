package com.example.case_study_module4.model;

import com.example.case_study_module4.model.account.Account;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.parameters.P;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "blog")
@Data
@Getter
@Setter

public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(nullable = false)
    private String title; // tiêu đề
    @NotNull
    @Column(nullable = false)
    private String content; // nội dung
    private String url_img;
    @Transient
    private MultipartFile multipartFile;
    @Column(nullable = false)
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "id_account")
    private Account account;
    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;
}
