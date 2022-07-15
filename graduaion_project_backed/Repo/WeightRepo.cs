using graduaion_project_backed.Model;
using System.Linq;
namespace graduaion_project_backed.Repo
{
    public class WeightRepo : IWeightRepo
    {
        private readonly Context context;

        public WeightRepo(Context context)
        {
            this.context = context;
        }
        public void EditSetting(WeightSetting setting)
        {
            var Wsetting = context.WeightSettings.FirstOrDefault(w => w.id == 1);
            Wsetting.ExreaCost = setting.ExreaCost;
            Wsetting.DeafultCost = setting.DeafultCost;
            Wsetting.DeafultWeight = setting.DeafultWeight;
            context.SaveChanges();
        }

        public WeightSetting GetWeightSetting()
        {
            return context.WeightSettings.Take(1).SingleOrDefault();
        }
    }
}
