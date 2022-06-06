using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cg_drive.RequestModels;
using cg_drive.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cg_drive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly cgdriveContext _cg;
        public UsersController(cgdriveContext data)
        {
            _cg = data;
        }
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var getData = _cg.Users;
            return Ok(getData);
        }

        [HttpPost]
        public IActionResult PostUser([FromBody] UsersRequest value)
        {
            Users user = new Users();
            user.Username = value.Username;
            user.Password = value.Password;
            user.CreatedAt = value.CreatedAt;

            _cg.Users.Add(user);
            _cg.SaveChanges();
            return Ok();
        }
    }
}
