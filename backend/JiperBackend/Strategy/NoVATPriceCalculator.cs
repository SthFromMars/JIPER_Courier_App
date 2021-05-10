using JiperBackend.Models;

namespace JiperBackend.Strategy
{
    public class NoVATPriceCalculator : IPriceCalculator
    {
        public double CalculatePrice(Order order)
        {
            double price = order.Package.Price;

            foreach (Service service in order.Services)
            {
                price += service.Price;
            }

            return price;
        }
    }
}