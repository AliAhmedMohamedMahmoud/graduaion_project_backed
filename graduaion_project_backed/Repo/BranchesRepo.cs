﻿using graduaion_project_backed.Dto;
using graduaion_project_backed.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace graduaion_project_backed.Repo
{
    public class BranchesRepo : IBranchRepo
    {
        private readonly Context context;

        public BranchesRepo(Context _context)
        {
            context = _context;
        }
        public int Add(Branches NewBranche)
        {
            context.Branches.Add(NewBranche);
            return context.SaveChanges();
        }
        public int Delete(int id)
        {
            Branches oldBranches = GetById(id);
            if (oldBranches != null)
            {
                context.Branches.Remove(oldBranches);
                return context.SaveChanges();
            }
            else
            {
                return 0;
            }
        }
        public int Edit(int id, Branches NewBranche)
        {
            Branches oldBranches = GetById(id);
            if (oldBranches != null)
            {
                oldBranches.Name = NewBranche.Name;
                oldBranches.CityId = NewBranche.CityId;
                return context.SaveChanges();
            }
            else
            {
                return 0;
            }
        }
        const int pageSize = 10;
        public int recordsCount()=> (context.Branches.Count()) / pageSize;
        public PaginationGlobal<Branches> pagination(int pagenumber)
        {
            int count = recordsCount();
            var branches = context.Branches.Skip((pagenumber - 1) * pageSize).Take(pageSize).ToList();
            return new PaginationGlobal<Branches>()
            {
                count = count,
                Record = branches
            };
        }

        public List<Branches> GetAll() => context.Branches.ToList();

        public Branches GetById(int id) => context.Branches.SingleOrDefault(B =>B.Id == id);

    }
}
