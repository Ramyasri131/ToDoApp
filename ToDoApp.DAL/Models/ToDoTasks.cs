using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoApp.DAL.Models
{
    public class ToDoTasks
    {
        public int Id { get; set; }

        [ForeignKey("UserNavigation")]
        public int Uid { get; set; }

        public string Title { get; set; }=string.Empty;

        public string Description { get; set; }=string.Empty;

        public DateTime CreatedDate { get; set; }

        public string Status { get; set; }=string.Empty;

        public virtual User UserNavigation { get; set; } = null!;
    }
}
