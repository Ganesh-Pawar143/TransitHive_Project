using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TransitHive.Dtos;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] AuthDto authDto)
        {
            var response = await _authService.Login(authDto);
            if (response == null)
            {
                return Unauthorized();
            }
            return Ok(response);
        }

        [HttpPost("admin/register")]
        public async Task<ActionResult> RegisterAdmin([FromBody] AdminDto adminDto)
        {
            try
            {
                await _authService.RegisterAdmin(adminDto);
                return Ok("Admin registered successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("vendor/register")]
        public async Task<ActionResult> RegisterVendor([FromBody] VendorDto vendorDto)
        {
            try
            {
                await _authService.RegisterVendor(vendorDto);
                return Ok("Vendor registered successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("user/register")]
        public async Task<ActionResult> RegisterUser([FromBody] UserDto userDto)
        {
            Console.WriteLine(userDto);
            try
            {
                await _authService.RegisterUser(userDto);
                return Ok("User registered successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
