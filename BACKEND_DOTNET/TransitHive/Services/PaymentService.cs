using AutoMapper;
using TransitHive.Dtos;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _repository;

        public PaymentService(IPaymentRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Payment1>> GetAllPayments()
        {
            return await _repository.GetPayments();
        }

        public async Task<Payment1> GetPayment(int id)
        {
            return await _repository.GetPaymentById(id);
        }

        public async Task ProcessPayment(Payment1 payment)
        {
            //if (string.IsNullOrEmpty(payment.UserId))
            //{
            //    throw new ArgumentException("UserId is required for processing payment.");
            //}
            await _repository.AddPayment(payment);
            await _repository.SaveChanges();
        }
    }
}
