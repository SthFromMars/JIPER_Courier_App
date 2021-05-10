using JiperBackend.Models;

namespace JiperBackend.Strategy
{
    public class LithuanianVATPriceCalculator: IPriceCalculator
    {
        public double CalculatePrice(Order order)
        {
            double price = order.Package.Price;

            foreach (Service service in order.Services)
            {
                price += service.Price;
            }

            price += price * 0.21;

            return price;
        }
    }
}