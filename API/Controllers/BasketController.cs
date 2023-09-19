using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO.Pipelines;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using System.Xml.Linq;
using API.Data;
using API.Data.DTO;
// using API.Data.Migrations;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext storeContext)
        {
            _context = storeContext;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            return BasketToDto(basket);
        }

        private BasketDto BasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    PictureUrl = item.Product.PictureUrl,
                    Price = item.Product.Price,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Quantity = item.Quantity,
                }).ToList()
            };
        }

        [HttpPost] // api/basket?productId=3&quantity=2
        public async Task<ActionResult<Basket>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            if (basket == null) basket = CreateBasket();

            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();


            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket", BasketToDto(basket));
            return BadRequest(new ProblemDetails { Title = "Problem saving item to the Basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //get the basket
            //remove item || reduce quantity
            //save changes
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            basket.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return StatusCode(200);
            return BadRequest(new ProblemDetails { Title = "Problem removing item from the Basket" });

        }

        private async Task<Basket> RetrieveBasket()
        {
            Basket basket = await _context.Baskets
                                    .Include(i => i.Items)
                                    .ThenInclude(i => i.Product)
                                    .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
            return basket;
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }

        /*
        [HttpPost]
        public ActionResult<Basket> AddItemToBasket(int productid, int quantity)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == productid);
            var basket = _context.Baskets.FirstOrDefault(b => b.BuyerId == Request.Cookies["buyerid"]);

            if (product == null) return NotFound();

            if (basket == null)
            {
                var buyerid = Guid.NewGuid().ToString();
                var newbasket = new Basket() { BuyerId = buyerid };
                basket = newbasket;
                basket.AddItem(product, quantity);
                _context.SaveChanges();
            }
            else
            {
                if(basket.Items.All(p=>p.ProductId != productid))
                {
                    basket.AddItem(product, quantity);
                }
            }

            var result = _context.SaveChanges() > 0;
            if(result) return Ok(basket);
            return BadRequest(new ProblemDetails { Title="Internal error of storing" });
        }



*/




    }
}