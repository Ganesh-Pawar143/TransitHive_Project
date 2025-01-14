using Microsoft.AspNetCore.Mvc.ViewEngines;
using TransitHive.Models;
namespace TransitHive.Interfaces.Repositories
{
    public interface IReviewRepository
    {
        Task<Review> GetReviewByIdAsync(int id);
        Task<IEnumerable<Review>> GetAllReviewsAsync();
        Task AddReviewAsync(Review review);
        Task UpdateReviewAsync(Review review);
        Task DeleteReviewAsync(int id);
    }
}
