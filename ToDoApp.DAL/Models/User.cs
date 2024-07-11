using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoApp.DAL.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Index(IsUnique = true)]
        public string Email { get; set; }=string.Empty;

        public string Password { get; set; }=string.Empty;

        public virtual List<ToDoTasks> ToDoTasksNavigation { get; set; } = null!;
    }
}
