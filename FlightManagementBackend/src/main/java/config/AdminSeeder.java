package config;

import entity.AppUser;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import repository.UserRepository;

@Component
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepo;
    private final BCryptPasswordEncoder encoder;

    public AdminSeeder(UserRepository userRepo, BCryptPasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
    	
    	
        String adminEmail = "admin@skyline.com";

        if (!userRepo.existsByEmail(adminEmail)) {
            AppUser admin = new AppUser();
            admin.setName("Admin");
            admin.setEmail(adminEmail);
            admin.setPasswordHash(encoder.encode("Admin@123"));
            admin.setMobile("9999999999");
            admin.setCity("HQ");
            admin.setRole("ADMIN");

            userRepo.save(admin);
        }
    }
}