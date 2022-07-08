using graduaion_project_backed.Model;
using System;
using System.Collections.Generic;

namespace graduaion_project_backed.Repo
{
    public interface IOrderRepo
    {
        int add(Order order);
        int Edit(int id, Order order);
        List<Order> GetByDateAndStatus(DateTime start, DateTime end, int statusId, int pageIndex);
        Order GetById(int id);
        List<Order> getByStatus(int statusId, int pageIndex);
    }
}