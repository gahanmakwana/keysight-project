package entity;

import jakarta.persistence.*;

@Entity
@Table(name="flights")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String flightNo;     // for "Flight_No" column + search

    @Column(nullable=false)
    private String flightName;   // optional but useful

    @Column(nullable=false)
    private String source;

    @Column(nullable=false)
    private String destination;

    private String deptTime;     // simple string "10:30 AM" (MySQL 5.1 safe)

    private Integer availSeats;

    private Double price;

    private String logoUrl;      // optional

    public Flight() {}

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFlightNo() { return flightNo; }
    public void setFlightNo(String flightNo) { this.flightNo = flightNo; }

    public String getFlightName() { return flightName; }
    public void setFlightName(String flightName) { this.flightName = flightName; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getDeptTime() { return deptTime; }
    public void setDeptTime(String deptTime) { this.deptTime = deptTime; }

    public Integer getAvailSeats() { return availSeats; }
    public void setAvailSeats(Integer availSeats) { this.availSeats = availSeats; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
}