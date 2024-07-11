namespace ToDoApp.BAL.Interfaces
{
    public interface IUserValidator
    {
        public Task ValidateUserCredentials(DTO.User user, string typeOfCall);

    }
}
