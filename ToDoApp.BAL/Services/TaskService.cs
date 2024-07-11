using ToDoApp.BAL.DTO;
using ToDoApp.BAL.Exceptions;
using ToDoApp.BAL.Extensions;
using ToDoApp.BAL.Interfaces;
using ToDoApp.DAL.Interfaces;

namespace ToDoApp.BAL.Services
{
    public class TaskService(IUserRepository userRepository,ITaskRepository taskRepository):ITaskService
    {
        private readonly IUserRepository _userRepository=userRepository;
        private readonly ITaskRepository _taskRepository=taskRepository;

        public async Task AddTask(DTO.ToDoTask toDoTask,string Email)
        {
            var user = (await _userRepository.GetAll()).FirstOrDefault(emp => string.Equals(emp.Email.ToLower(),Email));
            int Uid = user!.Id;
            if (toDoTask.Description.IsNullOrEmptyOrWhiteSpace())
            {
                toDoTask.Description = toDoTask.Title;
            }
            DAL.Models.ToDoTasks toDoTasks = new DAL.Models.ToDoTasks()
            {
                Uid = Uid,
                Title=toDoTask.Title,
                Description=toDoTask.Description,
                Status="Active",
                CreatedDate=DateTime.Now,
            };
            await _taskRepository.Add(toDoTasks);
        }

        public async Task<List<DTO.TaskInfo>> GetAllTasksByEmail(string Email)
        {
            var user = (await _userRepository.GetAll()).FirstOrDefault(emp => string.Equals(emp.Email.ToLower(), Email));
            int Uid = user!.Id;
            List<DTO.TaskInfo> taskList = new List<DTO.TaskInfo>();
            List<DAL.Models.ToDoTasks> listOfTasks= await _taskRepository.GetAllTasksByUid(Uid);
            foreach(var task in listOfTasks)
            {
                DTO.TaskInfo item = new()
                {
                    Id = task.Id,
                    Description=task.Description,
                    Title=task.Title,
                    status=task.Status,
                    CreatedDate = task.CreatedDate,
                };
                taskList.Add(item);
            }
            return taskList;
        }

        public async Task<List<DTO.TaskInfo>> GetActiveTasksByEmail(string Email)
        {
            var user = (await _userRepository.GetAll()).FirstOrDefault(emp => string.Equals(emp.Email.ToLower(), Email));
            int Uid = user!.Id;
            List<DTO.TaskInfo> taskList = new List<DTO.TaskInfo>();
            List<DAL.Models.ToDoTasks> listOfTasks = await _taskRepository.GetAllTasksByUid(Uid);
            foreach (var task in listOfTasks)
            {
                if(task.Status=="Active")
                {
                    DTO.TaskInfo item = new()
                    {
                        Id = task.Id,
                        Description = task.Description,
                        Title = task.Title,
                        status = task.Status,
                        CreatedDate = task.CreatedDate,
                    };
                    taskList.Add(item);
                }
            }
            return taskList;
        }


        public async Task<List<DTO.TaskInfo>> GetCompletedTasksByEmail(string Email)
        {
            var user = (await _userRepository.GetAll()).FirstOrDefault(emp => string.Equals(emp.Email.ToLower(), Email));
            int Uid = user!.Id;
            List<DTO.TaskInfo> taskList = new List<DTO.TaskInfo>();
            List<DAL.Models.ToDoTasks> listOfTasks = await _taskRepository.GetAllTasksByUid(Uid);
            foreach (var task in listOfTasks)
            {
                if (task.Status == "InActive")
                {
                    DTO.TaskInfo item = new()
                    {
                        Id = task.Id,
                        Description = task.Description,
                        Title = task.Title,
                        status = task.Status,
                        CreatedDate = task.CreatedDate,
                    };
                    taskList.Add(item);
                }
            }
            return taskList;
        }

        public async Task UpdateTaskByTaskId(string Email,TaskInfo getToDoTask)
        {
            var user = (await _userRepository.GetAll()).FirstOrDefault(emp => string.Equals(emp.Email.ToLower(), Email));
            int Uid = user!.Id;
            List<DAL.Models.ToDoTasks> listOfTasks= await _taskRepository.GetAllTasksByUid(Uid);
            DAL.Models.ToDoTasks? task = listOfTasks.FirstOrDefault(t => t.Id == getToDoTask.Id);
            if(task is null)
            {
                throw new InValidCredentials("Task Not Found");
            }
            task.Id = getToDoTask.Id;
            task.Description = getToDoTask.Description;
            task.Title = getToDoTask.Title;
            task.Status = getToDoTask.status;
            task.CreatedDate = getToDoTask.CreatedDate;
            await _taskRepository.Update(task);
        }

        public async Task DeleteTaskByTaskId(string email,int id)
        {
            var user = (await _userRepository.GetAll()).FirstOrDefault(emp => string.Equals(emp.Email.ToLower(), email));
            int Uid = user!.Id;
            List<DAL.Models.ToDoTasks> listOfTasks = await _taskRepository.GetAllTasksByUid(Uid);
            DAL.Models.ToDoTasks? task = listOfTasks.FirstOrDefault(t => t.Id == id);
            if (task is null)
            {
                throw new InValidCredentials("Task Not Found");
            }
            await _taskRepository.Delete(task);
        }

        public async Task DeleteTasks(string email)
        {
            var user = (await _userRepository.GetAll()).FirstOrDefault(emp => string.Equals(emp.Email.ToLower(), email));
            int Uid = user!.Id;
            List<DAL.Models.ToDoTasks> listOfTasks = await _taskRepository.GetAllTasksByUid(Uid);
            await _taskRepository.DeleteAllTasks(Uid);
        }
    }
}