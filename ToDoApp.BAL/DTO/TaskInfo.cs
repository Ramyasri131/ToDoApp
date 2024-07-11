﻿namespace ToDoApp.BAL.DTO
{
    public class TaskInfo
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string status {  get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; }

    }
}
