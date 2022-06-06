using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cg_drive.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.StaticFiles;

namespace cg_drive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly cgdriveContext _cg;
        private readonly IHostingEnvironment _env;
        public DocumentsController(cgdriveContext data, IHostingEnvironment environment)
        {
            _cg = data;
            _env = environment;
        }

        // GET: api/Documents
        [HttpGet]
        public IActionResult Get()
        {
            var datas = _cg.Documents;
            return Ok(datas);
        }

        /*// GET: api/Documents/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }*/

        // POST: api/Documents
        [HttpPost]
        public IActionResult Post([FromBody] Documents value)
        {
            Documents doc = new Documents
            {
                DocumentId = value.DocumentId,
                DocumentName = value.DocumentName,
                ContentType = value.ContentType,
                Size = value.Size,
                CreatedBy = value.CreatedBy,
                CreatedAt = value.CreatedAt,
                FolderId = value.FolderId,
                IsDeleted = value.IsDeleted
            };

            _cg.Documents.Add(doc);
            _cg.SaveChanges();

            return Ok();
        }
        [HttpPost]
        [Route("upload")]
        public async Task<ActionResult> Upload(List<IFormFile> files)
        {
            long size = files.Sum(f => f.Length);

            var rootPath = Path.Combine(_env.ContentRootPath, "Resources", "Documents");

            if (!Directory.Exists(rootPath))
                Directory.CreateDirectory(rootPath);
            foreach (var file in files)
            {
                var filePath = Path.Combine(rootPath, file.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    var document = new Documents
                    {
                        DocumentName = file.FileName,
                        ContentType = file.ContentType,
                        Size = Convert.ToInt32(file.Length),
                    };

                    await file.CopyToAsync(stream);
                    _cg.Documents.Add(document);
                    await _cg.SaveChangesAsync();
                }
            }
            return Ok();
        }

        [HttpPost]
        [Route("download/{id}")]
        public async Task<ActionResult> Download (int id)
        {
            var provider = new FileExtensionContentTypeProvider();

            var document = await _cg.Documents.FindAsync(id);

            if (document == null)
                return NotFound();
            var file = Path.Combine(_env.ContentRootPath, "Resources", "Documents", document.DocumentName);

            string contentType;
            if(!provider.TryGetContentType(file, out contentType))
            {
                contentType = "application/octet-stream";
            }
          
            byte[] fileBytes;
            if (System.IO.File.Exists(file))
            {
                fileBytes = System.IO.File.ReadAllBytes(file);
            }
            else
            {
                return NotFound();
            }

            return File(fileBytes, contentType, document.DocumentName);
        }



        // PUT: api/Documents/5
        /*[HttpPut("{id}")]
        public IA Put(int id, [FromBody] string value)
        {
        }*/

        /*// DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }*/
    }
}
