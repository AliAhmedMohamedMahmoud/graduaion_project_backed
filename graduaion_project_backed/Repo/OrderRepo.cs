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


        public List<Order> GetAllOrders()
        {
            List<Order> orderList = context.Orders.ToList();
           
             return orderList;
        }

        public int add(Order order)
        {
            context.Orders.Add(order);
            context.SaveChanges();
            return order.Id;
        }

        public int Edit(int id, Order order)
        {
            Order old = GetById(id);
            if (old != null)
            {
                old.Date = order.Date;
                old.Cost = order.Cost;
                old.CustomerName = order.CustomerName;
                old.CustomerPhone = order.CustomerPhone;
                old.StateId = order.StateId;
                old.CityId = order.CityId;
                old.StatusId = order.StatusId;
                return context.SaveChanges();
            }
            return -1;
        }

        public Order GetById(int id)
        {
            return context.Orders.FirstOrDefault(o => o.Id == id);
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

    }
}
