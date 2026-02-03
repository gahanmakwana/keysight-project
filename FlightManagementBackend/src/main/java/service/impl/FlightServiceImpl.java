package service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import entity.Flight;
import exception.ResourceNotFoundException;
import repository.FlightRepository;
import service.FlightService;

@Service
public class FlightServiceImpl implements FlightService {

    private final FlightRepository flightRepository;

    public FlightServiceImpl(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @Override
    public Flight addFlight(Flight flight) {
        // id is auto-generated
        flight.setId(null);
        return flightRepository.save(flight);
    }

    @Override
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    @Override
    public Flight getFlightById(Long id) {
        return flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found with id: " + id));
    }

    @Override
    public Flight updateFlight(Long id, Flight flight) {
        Flight existing = getFlightById(id);
        existing.setFlightName(flight.getFlightName());
        existing.setSource(flight.getSource());
        existing.setDestination(flight.getDestination());
        return flightRepository.save(existing);
    }

    @Override
    public void deleteFlight(Long id) {
        Flight existing = getFlightById(id);
        flightRepository.delete(existing);
    }
}