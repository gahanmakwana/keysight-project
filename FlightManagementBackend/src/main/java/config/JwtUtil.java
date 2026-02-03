package config;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expMinutes}")
    private int expMinutes;

    public String generateToken(String email, String role, String name) {
        long now = System.currentTimeMillis();
        long exp = now + (long) expMinutes * 60 * 1000;

        return Jwts.builder()
                .subject(email)
                .claim("role",role)
                .claim("name", name)
                .issuedAt(new Date(now))
                .expiration(new Date(exp))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .compact();
    }

    public String getEmail(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}