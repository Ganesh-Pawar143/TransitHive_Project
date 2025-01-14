using System.Threading.Tasks;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Services
{
    public class OtpService : IOtpService
    {
        private readonly IOtpRepository _otpRepository;

        public OtpService(IOtpRepository otpRepository)
        {
            _otpRepository = otpRepository;
        }

        public async Task<bool> GenerateAndSendOtpAsync(int bookingId)
        {
            var otp = await _otpRepository.GenerateOtpAsync(bookingId);
            if (otp == null)
            {
                return false;
            }

            await _otpRepository.SendOtpAsync(otp);
            return true;
        }

        public async Task<bool> VerifyOtpAsync(int bookingId, string code)
        {
            var otp = await _otpRepository.VerifyOtpAsync(bookingId, code);
            return otp != null;
        }
    }
}
