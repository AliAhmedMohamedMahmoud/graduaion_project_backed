using graduaion_project_backed.Dto;
using graduaion_project_backed.Model;
using System;
using System.Collections.Generic;

namespace graduaion_project_backed.Repo
{
    public interface IOrderRepo
    {
        int add(Order order);
        List<OrderDtoWithLocation> GetAllOrders();
        List<OrderDtoWithLocation> GetOrdersByUserId(string userId);
        int Delete(int id);
        int Edit(int id, OrderDTO order);
        List<Order> GetByDateAndStatus(DateTime start, DateTime end, int statusId, int pageIndex);
        OrderDTO GetById(int id);
        Order GetByIdOrder(int id);
        List<Order> getByStatus(int statusId, int pageIndex);
    }
}