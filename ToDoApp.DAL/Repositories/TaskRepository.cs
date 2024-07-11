using ToDoApp.DAL.Interfaces;
using ToDoApp.DAL.Models;

namespace ToDoApp.DAL.Repositories
{
    public class TaskRepository(ApplicationDbContext dbContext):GenericRepository<ToDoTasks>(dbContext),ITaskRepository
    {
        private readonly ApplicationDbContext _dbContext=dbContext;

        public async Task<List<ToDoTasks>> GetAllTasksByUid(int id)
        {
            List<ToDoTasks> tasks = await GetAll();
            List<ToDoTasks> toDoTasks = new List<ToDoTasks>();
            foreach (var task in tasks)
            {
                if(task.Uid == id)
                {
                    toDoTasks.Add(task);
                }
            }
            return toDoTasks;
        }

        public async Task DeleteAllTasks(int uid)
        {
            var tasksToDelete=_dbContext.ToDoTasks.Where(task => task.Uid == uid).ToList();
            _dbContext.RemoveRange(tasksToDelete);
            await _dbContext.SaveChangesAsync();
        }
    }
}
