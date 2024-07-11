using ToDoApp.DAL.Interfaces;

namespace ToDoApp.DAL.Repositories
{
    public class UserRepository(Models.ApplicationDbContext dbContext):GenericRepository<Models.User>(dbContext), IUserRepository
    {

    }
}
