package com.th.service;

import java.util.List;

import com.th.dto.AdminDTO;
import com.th.dto.ApiResponse;
import com.th.dto.AuthRequest;
import com.th.dto.UserDTO;

public interface AdminService {
    AdminDTO getAdminById(Long id);
    AdminDTO updateAdmin(AdminDTO adminDTO);
    List<AdminDTO> getAllAdmins();
	ApiResponse saveAdmin(AdminDTO adminDTO);
	AdminDTO authenticateUser(AuthRequest request);
}
