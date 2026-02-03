package config;

import entity.AppUser;
import repository.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class AuthHelper {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;

    public AuthHelper(JwtUtil jwtUtil, UserRepository userRepo) {
        this.jwtUtil = jwtUtil;
        this.userRepo = userRepo;
    }

    public AppUser requireUser(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing token");
        }
        String token = authHeader.substring(7);
        String email = jwtUtil.getEmail(token);
        return userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }
}