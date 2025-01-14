using System.Numerics;
using System;
using Microsoft.EntityFrameworkCore;
using TransitHive.Data;
using TransitHive.Interfaces.Repositories;
using TransitHive.Models;
using TransitHive.Dtos;
using System.Collections;

namespace TransitHive.Repositories
{
    public class VendorRepository : IVendorRepository
    {
        private readonly AppDbContext _context;

        public VendorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Vendor> GetVendorByIdAsync(int id)
        {
            return await _context.Vendors.FindAsync(id);
        }

        public async Task<IEnumerable<Vendor>> GetAllVendorsAsync()
        {
            return await _context.Vendors.ToListAsync();
        }

        public async Task AddVendorAsync(Vendor vendor)
        {
            await _context.Vendors.AddAsync(vendor);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateVendorAsync(Vendor vendor)
        {
            _context.Vendors.Update(vendor);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteVendorAsync(int id)
        {
            var vendor = await _context.Vendors.FindAsync(id);
            if (vendor != null)
            {
                _context.Vendors.Remove(vendor);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Vendor> GetVendorByEmailAsync(string email) {

            Vendor vendor = await _context.Vendors.SingleOrDefaultAsync(u => u.Email == email);
            return vendor;

        }

        public async Task<IEnumerable<VendorRespDto>> GetVendorByStatusAsync(Status status)
        {
            return await _context.Vendors
                                 .Where(v => v.Status == status)
                                 .Select(v => new VendorRespDto
                                 {
                                     Id = v.Id,
                                     CompanyName = v.CompanyName,
                                     Email = v.Email,
                                     Phone = v.Phone,
                                     Gstin = v.Gstin,
                                     CompanyOwnerName = v.CompanyOwnerName,
                                     OwnerAadharNumber = v.OwnerAadharNumber,
                                     PanNumber = v.PanNumber,
                                     City = v.City,
                                     Status = v.Status
                                 }).ToListAsync();
        }

        public async Task UpdateVendorStatusAsync(int id, Status status)
        {
            var vendor = await _context.Vendors.FindAsync(id);
            if (vendor != null)
            {
                vendor.Status = status;
                await _context.SaveChangesAsync();
            }
        }

    }
}
