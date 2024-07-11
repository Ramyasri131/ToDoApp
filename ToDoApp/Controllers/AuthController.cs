using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ToDoApp.BAL.Exceptions;
using ToDoApp.BAL.Interfaces;

namespace ToDoApp.Controllers
{
    [ApiController]
    public class AuthController(IUserValidator userValidator,IUserService userService,IConfiguration configuration) : Controller
    {
        private readonly IUserValidator _userValidator=userValidator;
        private readonly IUserService _userService=userService;
        private readonly IConfiguration _configuration=configuration;

        [HttpPost]
        [Route("[controller]/sign-up")]
        public async Task<ActionResult> RegisterUser([FromBody] BAL.DTO.User user)
        {
            try
            {
                await _userValidator.ValidateUserCredentials(user, "signup");
                await _userService.RegisterUser(user);
                return Ok(user);
            }
            catch (InValidCredentials ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("[controller]/login")]
        public async Task<ActionResult<string>> LoginUser([FromBody] BAL.DTO.User user)
        {
            try
            {
                await _userValidator.ValidateUserCredentials(user, "login");
                List<Claim> claims = new List<Claim>()
                {
                       new Claim("Email", user.Email),

                };
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var jwtToken = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddDays(1),
                    signingCredentials: credentials);
                var token = new JwtSecurityTokenHandler().WriteToken(jwtToken)?? "error";
                return token;
            }   
            catch (InValidCredentials ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
