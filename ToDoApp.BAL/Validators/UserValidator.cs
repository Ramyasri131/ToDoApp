using ToDoApp.BAL.Exceptions;
using ToDoApp.BAL.Interfaces;
using ToDoApp.DAL.Interfaces;

namespace ToDoApp.BAL.Validators
{
    public class UserValidator(IUserRepository userRepository): IUserValidator
    {
        private readonly IUserRepository _userRepository = userRepository;

        public async Task ValidateUserCredentials(DTO.User user,string typeOfCall)
        {
            List<DAL.Models.User> userDetails = await _userRepository.GetAll();
            var item=userDetails.FirstOrDefault(i => i.Email.ToLower() == user.Email.ToLower());
            if (string.Equals(typeOfCall,"login"))
            {
                if (item is null)
                {
                    throw new InValidCredentials("Invalid UserName or Password");
                }
                bool isVerified = BCrypt.Net.BCrypt.Verify(user.Password,item.Password);
                if(!isVerified)
                {
                    throw new InValidCredentials("Invalid UserName or Password");
                }
            }
            if (string.Equals(typeOfCall, "signup"))
            {
                if (item is not null)
                {
                    throw new InValidCredentials("User Already Exists");
                }
            }
        }
    }
}