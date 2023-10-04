package com.example.case_study_module4.model;

import com.example.case_study_module4.model.account.Account;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalTime;

@Entity
@Table(name = "comment")
@Getter
@Setter
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(nullable = false)
    private String content;
    @NotNull
    @Column(nullable = false)
    private LocalTime time;
    @ManyToOne
    @JoinColumn(name = "id_blog")
    private Blog blog;
    @ManyToOne
    @JoinColumn(name = "id_account")
    private Account account;
}
