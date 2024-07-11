using ToDoApp.DAL.Models;

namespace ToDoApp.DAL.Interfaces
{
    public interface ITaskRepository:IGenericRepository<ToDoTasks>
    {
        public Task<List<ToDoTasks>> GetAllTasksByUid(int id);

        public Task DeleteAllTasks(int uid);

    }
}
