package service;

import entity.Flight;

import java.util.List;

public interface FlightService {
    Flight addFlight(Flight flight);
    List<Flight> getAllFlights();
    Flight getFlightById(Long id);
    Flight updateFlight(Long id, Flight flight);
    void deleteFlight(Long id);
}