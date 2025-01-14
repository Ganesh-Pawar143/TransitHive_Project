using System.ComponentModel.DataAnnotations.Schema;

namespace TransitHive.Models
{
    public class Vendor
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Gstin { get; set; }
        public string CompanyOwnerName { get; set; }
        public string OwnerAadharNumber { get; set; }
        public string PanNumber { get; set; }
        public string City { get; set; }
        public string Amount { get; set; }

        [Column(TypeName = "ENUM('PENDING', 'APPROVED', 'SUSPENDED')")]
        public Status Status { get; set; } = Status.PENDING;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<Booking> Bookings { get; set; }
        public ICollection<Payment> Payments { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }

    public enum Status { PENDING, APPROVED, SUSPENDED }
}
