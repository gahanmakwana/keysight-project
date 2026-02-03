package config;

import entity.Flight;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import repository.FlightRepository;

import java.util.Arrays;
import java.util.List;

@Component
public class FlightSeeder implements CommandLineRunner {

    private final FlightRepository flightRepo;

    public FlightSeeder(FlightRepository flightRepo) {
        this.flightRepo = flightRepo;
    }

    @Override
    public void run(String... args) {
        if (flightRepo.count() >= 20) return;

        List<Flight> flights = Arrays.asList(
            make("FL101","Flight 101","Delhi","Mumbai","10:15 AM", 45, 3999.0,""),
            make("FL102","Flight 102","Delhi","Bengaluru","11:30 AM", 38, 4499.0,""),
            make("FL103","Flight 103","Mumbai","Delhi","09:05 AM", 50, 3899.0,""),
            make("FL104","Flight 104","Mumbai","Goa","01:10 PM", 25, 2999.0,""),
            make("FL105","Flight 105","Bengaluru","Delhi","06:45 PM", 40, 4599.0,""),
            make("FL106","Flight 106","Chennai","Mumbai","08:20 AM", 30, 4199.0,""),
            make("FL107","Flight 107","Kolkata","Delhi","07:30 AM", 32, 4799.0,""),
            make("FL108","Flight 108","Pune","Bengaluru","03:00 PM", 20, 2799.0,""),
            make("FL109","Flight 109","Hyderabad","Delhi","05:15 PM", 28, 4699.0,""),
            make("FSL110","Flight 110","Jaipur","Mumbai","12:40 PM", 35, 2599.0,""),
            make("FL111","Flight 111","Delhi","Chennai","04:25 PM", 41, 4299.0,""),
            make("FL112","Flight 112","Goa","Delhi","02:55 PM", 18, 3199.0,""),
            make("FL113","Flight 113","Ahmedabad","Delhi","09:50 AM", 27, 2399.0,""),
            make("FL114","Flight 114","Delhi","Kolkata","06:20 AM", 48, 4899.0,""),
            make("FL115","Flight 115","Mumbai","Bengaluru","07:10 PM", 36, 3399.0,""),
            make("FL116","Flight 116","Bengaluru","Goa","10:05 AM", 16, 2199.0,""),
            make("FL117","Flight 117","Delhi","Hyderabad","08:35 PM", 22, 4099.0,""),
            make("FL118","Flight 118","Chennai","Delhi","01:25 PM", 29, 4399.0,""),
            make("FL119","Flight 119","Pune","Delhi","11:55 AM", 33, 2699.0,""),
            make("FL120","Flight 120","Delhi","Jaipur","07:45 AM", 55, 1499.0,"")
        );

        flightRepo.saveAll(flights);
        System.out.println("✅ Seeded dummy flights: " + flights.size());
    }

    private Flight make(String flightNo, String flightName, String source, String dest,
                        String deptTime, int seats, double price, String logoUrl) {

        Flight f = new Flight();
        f.setFlightNo(flightNo);
        f.setFlightName(flightName);
        f.setSource(source);
        f.setDestination(dest);
        f.setDeptTime(deptTime);
        f.setAvailSeats(seats);
        f.setPrice(price);
        f.setLogoUrl(logoUrl);
        return f;
    }
}