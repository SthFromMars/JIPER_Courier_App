using JiperBackend.Models;

namespace JiperBackend.Strategy
{
    public interface IPriceCalculator
    {
        public double CalculatePrice(Order order);
    }
}