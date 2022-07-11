using graduaion_project_backed.Model;
namespace graduaion_project_backed.Repo
{
    public interface IstateRepo : ICrud<State>
    {
       
        
        public System.Collections.Generic.List<State> GetAllPageination(int pageNumber);
      
        
    }
}
