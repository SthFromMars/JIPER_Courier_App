using JiperBackend.Models;
using System;

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

            price += Math.Round(price * 0.21, 2, MidpointRounding.AwayFromZero);

            return price;
        }
    }
}