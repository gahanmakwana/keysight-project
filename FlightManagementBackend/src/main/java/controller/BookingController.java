package controller;

import config.AuthHelper;
import entity.AppUser;
import entity.Booking;
import entity.Flight;
import repository.BookingRepository;
import repository.FlightRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final AuthHelper authHelper;
    private final BookingRepository bookingRepo;
    private final FlightRepository flightRepo;

    public BookingController(AuthHelper authHelper, BookingRepository bookingRepo, FlightRepository flightRepo) {
        this.authHelper = authHelper;
        this.bookingRepo = bookingRepo;
        this.flightRepo = flightRepo;
    }

    // STEP 1: Create pending booking (from Passenger Details page)
    @PostMapping("/createPending")
    public HashMap<String, Object> createPending(@RequestHeader("Authorization") String auth,
                                                 @RequestBody HashMap<String, String> req) {

        AppUser user = authHelper.requireUser(auth);

        Long flightId = Long.parseLong(req.get("flightId"));
        String passengerName = req.get("passengerName");
        String idNumber = req.get("idNumber");
        String idType = req.get("idType");
        Integer noOfPassengers = Integer.parseInt(req.get("noOfPassengers"));

        Flight flight = flightRepo.findById(flightId).orElseThrow(() -> new RuntimeException("Flight not found"));
        if (flight.getAvailSeats() == null) flight.setAvailSeats(0);
        if (flight.getPrice() == null) flight.setPrice(0.0);

        if (flight.getAvailSeats() < noOfPassengers) {
            throw new RuntimeException("Not enough seats available");
        }

        Booking b = new Booking();
        b.setUser(user);
        b.setFlight(flight);
        b.setPassengerName(passengerName);
        b.setIdNumber(idNumber);
        b.setIdType(idType);
        b.setNoOfPassengers(noOfPassengers);
        b.setAmount(flight.getPrice() * noOfPassengers);

        b.setPaymentStatus("PENDING");
        b.setBookingStatus("PENDING");

        b = bookingRepo.save(b);

        HashMap<String, Object> res = new HashMap<>();
        res.put("bookingId", b.getId());
        res.put("amount", b.getAmount());
        return res;
    }

    // STEP 2: Confirm payment (Payment Page Confirm button)
    @PostMapping("/confirm/{bookingId}")
    public HashMap<String, Object> confirm(@RequestHeader("Authorization") String auth,
                                           @PathVariable Long bookingId) {

        AppUser user = authHelper.requireUser(auth);

        Booking b = bookingRepo.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));

        // only owner or admin can confirm
        if (!"ADMIN".equals(user.getRole()) && !b.getUser().getEmail().equals(user.getEmail())) {
            throw new RuntimeException("Not allowed");
        }

        if (!"PENDING".equals(b.getPaymentStatus())) {
            throw new RuntimeException("Already confirmed");
        }

        Flight flight = b.getFlight();
        int seats = b.getNoOfPassengers();

        if (flight.getAvailSeats() < seats) {
            throw new RuntimeException("Seats no longer available");
        }

        flight.setAvailSeats(flight.getAvailSeats() - seats);
        flightRepo.save(flight);

        b.setPaymentStatus("SUCCESS");
        b.setBookingStatus("CONFIRMED");
        bookingRepo.save(b);

        HashMap<String, Object> res = new HashMap<>();
        res.put("message", "Booking Successful");
        res.put("bookingId", b.getId());
        return res;
    }

    // My Bookings page
    @GetMapping("/my")
    public List<Booking> my(@RequestHeader("Authorization") String auth) {
        AppUser user = authHelper.requireUser(auth);
        return bookingRepo.findByUser_Email(user.getEmail());
    }
}