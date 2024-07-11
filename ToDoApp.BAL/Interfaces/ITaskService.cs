using ToDoApp.BAL.DTO;
using ToDoApp.DAL.Models;

namespace ToDoApp.BAL.Interfaces
{
    public interface ITaskService
    {
        public Task AddTask(DTO.ToDoTask toDoTask, string Email);

        public Task<List<DTO.TaskInfo>> GetAllTasksByEmail(string Email);

        public Task UpdateTaskByTaskId(string Email, TaskInfo getToDoTask);

        public Task DeleteTaskByTaskId(string email, int id);

        public Task<List<DTO.TaskInfo>> GetActiveTasksByEmail(string Email);

        public Task<List<DTO.TaskInfo>> GetCompletedTasksByEmail(string Email);

        public Task DeleteTasks(string email);
    }
}
