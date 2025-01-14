package com.th.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.th.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
	List<Booking> findByCityAndStatus(String city, Booking.Status status);
	List<Booking> findByUserId(Long userId);
	List<Booking> findByVendorId(Long vendorId);
}
