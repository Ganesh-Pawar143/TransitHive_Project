package com.th.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.th.dto.ApiResponse;
import com.th.dto.AuthRequest;
import com.th.dto.VendorDTO;
import com.th.entity.Vendor;
import com.th.exception.AuthenticationException;
import com.th.exception.ResourceNotFoundException;
import com.th.repository.VendorRepository;

@Service
public class VendorServiceImpl implements VendorService {

	@Autowired
	private VendorRepository vendorRepository;

	@Autowired
	private EmailService emailService;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public VendorDTO getVendorById(Long id) {
		Vendor vendor = vendorRepository.findById(id).orElse(null);
		if (vendor == null) {
			return null;
		}
		return modelMapper.map(vendor, VendorDTO.class);
	}

	@Override
	public VendorDTO updateVendor(VendorDTO vendorDTO) {
		Vendor vendor = modelMapper.map(vendorDTO, Vendor.class);
		vendor = vendorRepository.save(vendor);
		return modelMapper.map(vendor, VendorDTO.class);
	}

	@Override
	public List<VendorDTO> getAllVendors() {
		return vendorRepository.findAll().stream().map(vendor -> modelMapper.map(vendor, VendorDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse saveVendor(Vendor vendor) {

		//Vendor vendor = modelMapper.map(vendorDTO, Vendor.class);
		Vendor saveVendor = vendorRepository.save(vendor);

		String subject = "Registration Successful";
		String body = String.format(
				"Dear %s,\n\nThank you for joining our platform!\nYour application has been successfully submitted with Application ID: %d.\n\nWe are currently reviewing your application. Please be patient during this time.\n\nBest regards,\nThe Team TransitHive",
				vendor.getCompanyName(), vendor.getId());
		emailService.sendEmail(vendor.getEmail(), subject, body);

		return new ApiResponse("Added new Vendor with ID : " + saveVendor.getId());
	}

	@Override
	public VendorDTO authenticateUser(AuthRequest request) {

		Vendor vendor = vendorRepository.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new AuthenticationException("Invalid Email or Password !!!!!!"));

		return modelMapper.map(vendor, VendorDTO.class);
	}

	@Override
	public void deleteVendorById(Long id) {
		vendorRepository.deleteById(id);
	}

	// admin crud -- admin approve the vendor and change the status from pending to
	// approved --
	// or admin can suspend the vendor with any misbehaviral account..approved to
	// suspend
	// or admin can terminate the suspension of vendor account.. suspended to
	// approved
	@Override
	public VendorDTO changeVendorStatus(Long vendorId, Vendor.Status status) {
		Vendor vendor = vendorRepository.findById(vendorId)
				.orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));
		vendor.setStatus(status);
		vendor = vendorRepository.save(vendor);

		// Send status change email
		String subject;
		String body;
		if (status == Vendor.Status.APPROVED) {
			subject = "Application Approved";
			body = String.format(
					"Dear %s,\n\nYour vendor application has been approved.\nVendor ID: %d\nThank you! /n The Team TransitHive",
					vendor.getCompanyName(), vendor.getId());
		} else if (status == Vendor.Status.SUSPENDED) {
			subject = "Application Suspended";
			body = String.format(
					"Dear %s,\n\nYour vendor application has been suspended.\nVendor ID: %d\n\nPlease contact TransitHive support for more details.",
					vendor.getCompanyName(), vendor.getId());
		} else {
			subject = null;
			body = null;
		}
		if (subject != null && body != null) {
			emailService.sendEmail(vendor.getEmail(), subject, body);
		}

		return modelMapper.map(vendor, VendorDTO.class);
	}

	@Override
	public List<VendorDTO> getVendorsByStatus(Vendor.Status status) {
		return vendorRepository.findByStatus(status).stream().map(vendor -> modelMapper.map(vendor, VendorDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<String> getDistinctCities() {
		return vendorRepository.findDistinctCities();
	}
}