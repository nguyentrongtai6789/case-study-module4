package com.example.case_study_module4.model;

import com.example.case_study_module4.model.account.Account;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.parameters.P;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

@Entity
@Table(name = "blog")
@Getter
@Setter
@Data
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    @Column(nullable = false)
    private String title; // tiêu đề
    @NotEmpty
    @Column(nullable = false)
    private String content; // nội dung
    @NotEmpty
    @Column(nullable = false, columnDefinition = "varchar(255) default 'abc.jpg' ")
    private String url_img;
    @Transient
    private MultipartFile multipartFile;
    @NotEmpty
    @Column(nullable = false)
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "id_account")
    private Account account;
    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;
}
