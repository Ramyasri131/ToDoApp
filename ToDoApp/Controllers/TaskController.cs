using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ToDoApp.BAL.DTO;
using ToDoApp.BAL.Exceptions;
using ToDoApp.BAL.Interfaces;

namespace ToDoApp.Controllers
{
    [ApiController]
    public class TaskController(ITaskService taskService) : Controller
    {
        private readonly ITaskService _taskService = taskService;

        [HttpPost]
        [Route("[controller]/AddTask")]
        [Authorize]
        public async Task<ActionResult> AddTask(ToDoTask toDoTask)
        {
            string email = User.FindFirstValue("Email")!;
            try
            {
                    await _taskService.AddTask(toDoTask, email);
            }
            catch (NullReferenceException ex)
            {
                return BadRequest("Login or sign up");
            }
            catch(InValidCredentials ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(toDoTask);
        }

        [HttpGet]
        [Authorize]
        [Route("[controller]/GetTasks")]
        public async Task<ActionResult<List<TaskInfo>>> GetTasksByEmail()
        {
            string email = User.FindFirstValue("Email")!;
            try
            {
                return await _taskService.GetAllTasksByEmail(email.ToLower());
            }
            catch (NullReferenceException ex)
            {
                return BadRequest("Login or sign up");
            }
            catch (InValidCredentials ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("[controller]/GetActiveTasks")]
        public async Task<ActionResult<List<TaskInfo>>> GetActiveTasksByEmail()
        {
            string email = User.FindFirstValue("Email")!;
            try
            {
                return await _taskService.GetActiveTasksByEmail(email.ToLower());
            }
            catch (NullReferenceException ex)
            {
                return BadRequest("Login or sign up");
            }
            catch (InValidCredentials ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Authorize]
        [Route("[controller]/GetCompletedTasks")]
        public async Task<ActionResult<List<TaskInfo>>> GetCompletedTasksByEmail()
        {
            string email = User.FindFirstValue("Email")!;
            try
            {
                return await _taskService.GetCompletedTasksByEmail(email.ToLower());
            }
            catch (NullReferenceException ex)
            {
                return BadRequest("Login or sign up");
            }
            catch (InValidCredentials ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut]
        [Authorize]
        [Route("[controller]/UpdateTask")]

        public async Task<ActionResult> UpdateTaskByTaskId(TaskInfo getToDoTask)
        {
            string email = User.FindFirstValue("Email")!;
            try
            {
                await _taskService.UpdateTaskByTaskId(email.ToLower(), getToDoTask);
                return Ok();

            }
            catch (NullReferenceException ex)
            {
                return BadRequest("Login or sign up");
            }
            catch (InValidCredentials ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete]
        [Authorize]
        [Route("[controller]/DeleteTask")]
        public async Task<ActionResult> DeleteTaskByTaskId(int Id)
        {
            string email = User.FindFirstValue("Email")!;
            try
            {
                await _taskService.DeleteTaskByTaskId(email.ToLower(), Id);
                return Ok();
            }
            catch (NullReferenceException ex)
            {
                return BadRequest("Login or sign up");
            }
            catch (InValidCredentials ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Authorize]
        [Route("[controller]/DeleteAllTasks")]
        public async Task<ActionResult> DeleteAllTasks()
        {
            string email = User.FindFirstValue("Email")!;
            try
            {
                await _taskService.DeleteTasks(email.ToLower());
                return Ok();
            }
            catch (NullReferenceException ex)
            {
                return BadRequest("Login or sign up");
            }
            catch (InValidCredentials ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}