package com.th.service;

import java.util.List;

import com.th.dto.ApiResponse;
import com.th.dto.AuthRequest;
import com.th.dto.VendorDTO;
import com.th.entity.Vendor;

public interface VendorService {

	VendorDTO getVendorById(Long id);

	VendorDTO updateVendor(VendorDTO vendorDTO);

	List<VendorDTO> getAllVendors();

	ApiResponse saveVendor(Vendor vendor);

	VendorDTO authenticateUser(AuthRequest request);

	void deleteVendorById(Long id);

	VendorDTO changeVendorStatus(Long vendorId, Vendor.Status status);

	List<VendorDTO> getVendorsByStatus(Vendor.Status status);
	
	List<String> getDistinctCities();
}
