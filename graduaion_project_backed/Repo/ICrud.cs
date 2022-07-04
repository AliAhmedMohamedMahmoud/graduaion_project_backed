using System.Collections.Generic;

namespace graduaion_project_backed.Repo
{
    public interface ICrud<T>
    {
        int Add(T New);
        int Delete(int id);
        int Edit(int id, T New);
        List<T> GetAll();
        T GetById(int id);
    }
}
