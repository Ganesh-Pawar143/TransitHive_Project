package com.th.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.th.entity.Booking.Status;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookingDTO extends BaseDTO {
    private Long userId;
    private String name;
    private String mobile;
    private String email;
    private String city;
    private LocalDate moveDate;
    private String pickupLocation;
    private String dropLocation;
    private Integer pickupFloors;
    private Integer dropFloors;
    private String packagingType;
    private BigDecimal cost;
    private Status status;
    private String pickupLift; // This will be mapped to LiftAvailability enum in Booking entity
    private String dropLift;   // This will be mapped to LiftAvailability enum in Booking entity
    private List<BookingItemDTO> items;
}