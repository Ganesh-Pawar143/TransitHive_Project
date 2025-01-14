﻿using TransitHive.Dtos;
using TransitHive.Models;

namespace TransitHive.Interfaces.Services
{
    public interface IAuthService
    {
        Task<string> Login(AuthDto authDto);
        Task RegisterAdmin(AdminDto adminDto);
        Task RegisterVendor(VendorDto vendorDto);
        Task RegisterUser(UserDto userDto);
        
    }
}