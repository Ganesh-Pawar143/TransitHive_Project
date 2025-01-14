using System.Threading.Tasks;

using TransitHive.Helpers;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;


namespace TransitHive.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IUserRepository _userRepository;
        private readonly IVendorRepository _vendorRepository;
        private readonly JwtTokenHelper _jwtTokenHelper;

        public AuthService(IAuthRepository authRepository, IUserRepository userRepository, IVendorRepository vendorRepository, JwtTokenHelper jwtTokenHelper)
        {
            _authRepository = authRepository;
            _userRepository = userRepository;
            _vendorRepository = vendorRepository;
            _jwtTokenHelper = jwtTokenHelper;
        }

        public async Task<String> Login(Dtos.AuthDto authDto)
        {
            if (await _authRepository.ValidateAdminCredentials(authDto.Email, authDto.Password))
            {

                var token = _jwtTokenHelper.GenerateToken(authDto.Email, authDto.Email, "ADMIN");
                return token;
            }
            if (await _authRepository.ValidateVendorCredentials(authDto.Email, authDto.Password))
            {
                Vendor vendor = await _vendorRepository.GetVendorByEmailAsync(authDto.Email);
                var token = _jwtTokenHelper.GenerateTokenVendor(authDto.Email, authDto.Email,vendor.Id.ToString(),vendor.City, vendor.Status.ToString(), "VENDOR");
                return token;
            }
            if (await _authRepository.ValidateUserCredentials(authDto.Email, authDto.Password))
            {
                User user = await _userRepository.GetUserByEmailAsync(authDto.Email);
                var token = _jwtTokenHelper.GenerateTokenUser(authDto.Email, authDto.Email,user.Id.ToString(),user.Name,user.City,"USER");
                return token;
            }
            return null;
        }

        public async Task RegisterAdmin(Dtos.AdminDto adminDto)
        {
            if (await _authRepository.IsEmailTaken(adminDto.Email))
            {
                throw new Exception("Email ID already taken");
            }

            var admin1 = new Admin
            {
                Name = adminDto.Name,
                Email = adminDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(adminDto.Password),
                Phone = adminDto.Phone,
                CreatedAt = DateTime.Now
            };

            await _authRepository.RegisterAdmin(admin1);
        }

        public async Task RegisterVendor(Dtos.VendorDto vendorDto)
        {
            if (await _authRepository.IsEmailTaken(vendorDto.Email))
            {
                throw new Exception("Email ID already taken");
            }

            var vendor = new Vendor
            {
                CompanyName = vendorDto.CompanyName,
                Email = vendorDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(vendorDto.Password),
                Phone = vendorDto.Phone,
                Gstin = vendorDto.Gstin,
                CompanyOwnerName = vendorDto.CompanyOwnerName,
                OwnerAadharNumber = vendorDto.OwnerAadharNumber,
                PanNumber = vendorDto.PanNumber,
                City = vendorDto.City,
                Amount = vendorDto.Amount,
                Status = Status.PENDING,
                CreatedAt = DateTime.Now
            };

            await _authRepository.RegisterVendor(vendor);
        }

        public async Task RegisterUser(Dtos.UserDto userDto)
        {
            if (await _authRepository.IsEmailTaken(userDto.Email))
            {
                throw new Exception("Email ID already taken");
            }

            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                Phone = userDto.Phone,
                City = userDto.City,
                CreatedAt = DateTime.Now
            };

            await _authRepository.RegisterUser(user);
        }
    }
}
