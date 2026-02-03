package controller;

import config.AuthHelper;
import entity.AppUser;
import entity.Flight;
import repository.FlightRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flights")
public class FlightController {

    private final FlightRepository flightRepo;
    private final AuthHelper authHelper;

    public FlightController(FlightRepository flightRepo, AuthHelper authHelper) {
        this.flightRepo = flightRepo;
        this.authHelper = authHelper;
    }

    @GetMapping("/getAll")
    public List<Flight> getAll(@RequestHeader("Authorization") String auth) {
        authHelper.requireUser(auth); // USER or ADMIN (already validated)
        return flightRepo.findAll();
    }

    @GetMapping("/{id}")
    public Flight getOne(@PathVariable Long id, @RequestHeader("Authorization") String auth) {
        authHelper.requireUser(auth);
        return flightRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
    }

    @PostMapping("/add")
    public Flight add(@RequestBody Flight flight, @RequestHeader("Authorization") String auth) {
        AppUser u = authHelper.requireUser(auth);
        if (!"ADMIN".equals(u.getRole())) throw new RuntimeException("Admin only");
        flight.setId(null);
        return flightRepo.save(flight);
    }

    @PutMapping("/{id}")
    public Flight update(@PathVariable Long id, @RequestBody Flight flight, @RequestHeader("Authorization") String auth) {
        AppUser u = authHelper.requireUser(auth);
        if (!"ADMIN".equals(u.getRole())) throw new RuntimeException("Admin only");

        Flight existing = flightRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        existing.setFlightNo(flight.getFlightNo());
        existing.setFlightName(flight.getFlightName());
        existing.setSource(flight.getSource());
        existing.setDestination(flight.getDestination());
        existing.setDeptTime(flight.getDeptTime());
        existing.setAvailSeats(flight.getAvailSeats());
        existing.setPrice(flight.getPrice());
        existing.setLogoUrl(flight.getLogoUrl());
        return flightRepo.save(existing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, @RequestHeader("Authorization") String auth) {
        AppUser u = authHelper.requireUser(auth);
        if (!"ADMIN".equals(u.getRole())) throw new RuntimeException("Admin only");
        flightRepo.deleteById(id);
    }
}