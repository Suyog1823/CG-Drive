using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cg_drive.Models;
using cg_drive.RequestModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cg_drive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoldersController : ControllerBase
    {
        private readonly cgdriveContext _cg;
        public FoldersController(cgdriveContext data)
        {
            _cg = data;
        }
        // GET: api/Folders
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var folders = _cg.Folders;
                return Ok(folders);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
            }            
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _cg.Folders.Where(o => o.CreatedBy == id);
                if (result == null) return NotFound();
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
            }
        }

        //POST: api/Folders
        [HttpPost]
        public IActionResult PostFolder([FromBody] FoldersModel value)
        {
            Folders obj = new Folders();

            obj.FolderName = value.FolderName;
            obj.CreatedBy = value.CreatedBy;
            obj.CreatedAt = value.CreatedAt;
            obj.IsDeleted = value.IsDeleted;

            _cg.Folders.Add(obj);
            _cg.SaveChanges();
            return Ok();
        }

        [HttpGet("{id}/{value}")]
        public IActionResult Get(int id, string value)
        {
            var result = _cg.Folders.Where(obj => obj.FolderName.Contains(value));
            return Ok(result);
        }

        /*// PUT: api/Folders/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }*/

        // DELETE: api/ApiWithActions/5
        /*[HttpDelete("{FolderName}")]
        public IActionResult DeleteFolder([FromBody] FoldersModel value)
        {
            Folders data = _cg.Folders.FirstOrDefault(obj => obj.FolderName == value.FolderName);
            if ( data.FolderName == value.FolderName)
            {
                _cg.Folders.Remove(data);
                _cg.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }*/
    }
}
