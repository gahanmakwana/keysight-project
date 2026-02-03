package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain chain(HttpSecurity http) throws Exception {

        http.cors(cors -> {});
        http.csrf(csrf -> csrf.disable());

        // ✅ JWT => stateless
        http.sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // ✅ disable basic auth + form login (this is causing your 401 basic realm)
        http.httpBasic(basic -> basic.disable());
        http.formLogin(form -> form.disable());

        http.authorizeHttpRequests(auth -> auth
                // ✅ allow preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ✅ allow register/login without auth
                .requestMatchers("/auth/register", "/auth/login").permitAll()

                // ✅ everything else needs JWT
                .requestMatchers(HttpMethod.GET, "/flights/**").hasAnyAuthority("ADMIN", "USER")
                .requestMatchers(HttpMethod.POST, "/flights/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/flights/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/flights/**").hasAuthority("ADMIN")

                .requestMatchers("/bookings/**").hasAnyAuthority("ADMIN", "USER")
             
                .requestMatchers(HttpMethod.POST, "/bookings/createPending").hasAnyAuthority("USER","ADMIN")
                .requestMatchers(HttpMethod.POST, "/bookings/confirm/**").hasAnyAuthority("USER","ADMIN")
                .requestMatchers(HttpMethod.GET, "/bookings/my").hasAnyAuthority("USER","ADMIN")
                .anyRequest().authenticated()
        );

        // ✅ apply JWT filter
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}