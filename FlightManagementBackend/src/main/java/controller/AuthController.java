package controller;
import org.springframework.security.crypto.password.PasswordEncoder;
import config.JwtUtil;
import entity.AppUser;
import repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepo, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    // Register USER (as per diagram)
    @PostMapping("/register")
    public HashMap<String, Object> register(@RequestBody HashMap<String, String> req) {
        String name = req.get("name");
        String email = req.get("email");
        String password = req.get("password");
        String mobile = req.get("mobile");
        String city = req.get("city");

        if (userRepo.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }

        AppUser u = new AppUser();
        u.setName(name);
        u.setEmail(email);
        u.setPasswordHash(encoder.encode(password));
        u.setMobile(mobile);
        u.setCity(city);
        u.setRole("USER");

        userRepo.save(u);

        HashMap<String, Object> res = new HashMap<>();
        res.put("message", "Registered");
        return res;
    }

    // Login (Email + Password)
    @PostMapping("/login")
    public HashMap<String, Object> login(@RequestBody HashMap<String, String> req) {
        String email = req.get("email");
        String password = req.get("password");

        AppUser u = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!encoder.matches(password, u.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(u.getEmail(), u.getRole(), u.getName());

        HashMap<String, Object> res = new HashMap<>();
        res.put("token", token);
        res.put("role", u.getRole());
        res.put("name", u.getName());
        res.put("email", u.getEmail());
        return res;
    }
}