package com.example.case_study_module4.configuration;




import com.example.case_study_module4.jwt.CustomAccessDeniedHandler;
import com.example.case_study_module4.jwt.JwtAuthenticationTokenFilter;
import com.example.case_study_module4.jwt.RestAuthenticationEntryPoint;
import com.example.case_study_module4.service.impl.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private AccountService accountService;

    @Bean
    public JwtAuthenticationTokenFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationTokenFilter();
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(accountService).passwordEncoder(new BCryptPasswordEncoder(10));
    }

    @Bean
    public RestAuthenticationEntryPoint restServicesEntryPoint() {
        return new RestAuthenticationEntryPoint();
    }

    @Bean
    public CustomAccessDeniedHandler customAccessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    }

    protected void configure(HttpSecurity http) throws Exception {
        // Disable crsf cho đường dẫn /api/**
        http.csrf().ignoringAntMatchers("/api/**");
        http.httpBasic().authenticationEntryPoint(restServicesEntryPoint());
        http.authorizeRequests()
                .antMatchers("/api/login").permitAll()
                .antMatchers("/api/blog2/findAllBlog").permitAll()
                .antMatchers("/api/blog2/**").hasAnyRole("USER")
                .antMatchers("/api/blog/**").hasAnyRole(new String[]{"ADMIN", "USER"})
                .antMatchers("/api/category").permitAll()
                .antMatchers("/api/comment/**").hasAnyRole("USER")
                .antMatchers("/api/like/**").hasAnyRole("USER")
                .antMatchers("/api/saveAccount").permitAll()
                .antMatchers("/api/searchAccountByName/**").hasAnyRole(new String[]{"ADMIN", "USER"})
                .antMatchers("/api/passwordRetrieval").permitAll()
                .antMatchers("/api/findAllAccounts").hasAnyRole("ADMIN")
                .antMatchers("/api/saveNewRole/**").hasAnyRole("ADMIN")
                .antMatchers("/api/deleteAccount/**").hasAnyRole("ADMIN")
                .antMatchers("/api/blog").hasAnyRole("ADMIN")
//                .antMatchers(HttpMethod.GET, "/api/**").hasAnyRole(new String[]{"ADMIN", "USER"})
//                .antMatchers(HttpMethod.POST, "/api/**").hasAnyRole("ADMIN")
//                .antMatchers(HttpMethod.DELETE, "/api/**").hasAnyRole("ADMIN")
                .anyRequest().authenticated()
                .and().csrf().disable();
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.cors();
    }
}