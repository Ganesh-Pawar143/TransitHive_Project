using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TransitHive.Dtos;
using TransitHive.Interfaces.Services;

namespace TransitHive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdminDto>> GetAdmin(int id)
        {
            var admin = await _adminService.GetAdminByIdAsync(id);
            if (admin == null)
            {
                return NotFound();
            }
            return Ok(admin);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminDto>>> GetAllAdmins()
        {
            var admins = await _adminService.GetAllAdminsAsync();
            return Ok(admins);
        }

        [HttpPost]
        public async Task<ActionResult> AddAdmin([FromBody] AdminDto adminDto)
        {
            await _adminService.AddAdminAsync(adminDto);
            return CreatedAtAction(nameof(GetAdmin), new { id = adminDto.Id }, adminDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAdmin(int id, [FromBody] AdminDto adminDto)
        {
            if (id != adminDto.Id)
            {
                return BadRequest();
            }
            await _adminService.UpdateAdminAsync(adminDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAdmin(int id)
        {
            await _adminService.DeleteAdminAsync(id);
            return NoContent();
        }
    }
}
