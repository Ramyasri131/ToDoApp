using ToDoApp.BAL.Interfaces;
using ToDoApp.DAL.Interfaces;

namespace ToDoApp.BAL.Services
{
    public class UserService(IUserRepository userRepository):IUserService
    {
        private readonly IUserRepository _userRepository = userRepository;

        public async Task RegisterUser(DTO.User user)
        {
            string password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            DAL.Models.User userInputs = new DAL.Models.User()
            {
                Email = user.Email,
                Password = password,
            };
            await _userRepository.Add(userInputs);
        }
    }
}
