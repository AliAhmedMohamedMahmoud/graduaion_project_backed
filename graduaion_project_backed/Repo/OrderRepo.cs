using graduaion_project_backed.Dto;
using graduaion_project_backed.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace graduaion_project_backed.Repo
{
    public class OrderRepo : IOrderRepo
    {
        private readonly Context context;
        int pageSize = 2;

        public OrderRepo(Context context)
        {
            this.context = context;
        }


        public List<OrderDtoWithLocation> GetAllOrders()
        {
            List<Order> orderList = context.Orders
                .Include(o=>o.City)
                .Include(o=>o.Status)
                .Include(o=>o.State)
                .ToList();
            List<OrderDtoWithLocation> orders = new List<OrderDtoWithLocation>();

            foreach (var res in orderList)
            {
                var Dto = new OrderDtoWithLocation()
                {
                    Id = res.Id,
                    city = res.City.Name,
                    state = res.State.Name,
                    status = res.Status.Name,
                    customerPhone = res.CustomerPhone,
                    customerName = res.CustomerName,
                    cost = (int)res.Cost,
                    Date = res.Date,
                    userId = res.UserId
                };
                orders.Add(Dto);
            }
            
      
             return orders;
        }

        public int add(Order order)
        {
            context.Orders.Add(order);
            context.SaveChanges();
            return order.Id;
        }
        public OrderDTO GetById(int id)
        {
            var res = context.Orders.FirstOrDefault(o => o.Id == id);
            return new OrderDTO()
            {
                cityId = res.CityId,
                stateId = res.StateId,
                statusId = res.StatusId,
                customerPhone = res.CustomerPhone,
                customerName = res.CustomerName,
                cost = (int)res.Cost,
                Date = res.Date,
                userId = res.UserId
            };
        }

        public int Edit(int id, OrderDTO order)
        {
            Order old = GetByIdOrder(id);
            if (old != null)
            {
                old.Date = order.Date;
                old.Cost = order.cost;
                old.CustomerName = order.customerName;
                old.CustomerPhone = order.customerPhone;
                old.StateId = order.stateId;
                old.CityId = order.cityId;
                old.StatusId = order.statusId;
                return context.SaveChanges();
            }
            return -1;
        }

       

        public List<Order> getByStatus(int statusId, int pageIndex)
        {
            return context.Orders.Where(o => o.StatusId == statusId).Skip(pageSize * (pageIndex-1)).Take(pageSize).ToList();
              
        }

        public int Delete(int id)
        {
            Order order1 = context.Orders.FirstOrDefault(p => p.Id == id);
            if (order1 != null)
            {
                context.Orders.Remove(order1);
                int rowRemoved = context.SaveChanges();
                return rowRemoved;
            }
            return 0;
        }

        public List<Order> GetByDateAndStatus(DateTime start, DateTime end, int statusId, int pageIndex)
        {
            return context.Orders.
                   Where(o => o.StatusId == statusId && (o.Date < end && o.Date > start)).Skip(pageSize * (pageIndex - 1)).Take(pageSize).
                   ToList();
                  
        }

        public Order GetByIdOrder(int id)
        {
            return context.Orders.FirstOrDefault(o => o.Id == id);
        }

        public List<OrderDtoWithLocation> GetOrdersByUserId(string userId)
        {
            List<Order> orderList = context.Orders.Where(o=>o.UserId==userId)
                .Include(o => o.City)
                .Include(o => o.Status)
                .Include(o => o.State)
                .ToList();
            List<OrderDtoWithLocation> orders = new List<OrderDtoWithLocation>();

            foreach (var res in orderList)
            {
                var Dto = new OrderDtoWithLocation()
                {
                    Id = res.Id,
                    city = res.City.Name,
                    state = res.State.Name,
                    status = res.Status.Name,
                    customerPhone = res.CustomerPhone,
                    customerName = res.CustomerName,
                    cost = (int)res.Cost,
                    Date = res.Date,
                    userId = res.UserId
                };
                orders.Add(Dto);
            }
            return orders;
        }
    }
}
