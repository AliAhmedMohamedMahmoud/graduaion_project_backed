using graduaion_project_backed.Model;

namespace graduaion_project_backed.Repo
{
    public interface IWeightRepo
    {
        void EditSetting(WeightSetting setting);
        WeightSetting GetWeightSetting();
    }
}