using Electronic.Data;
using Electronic.Models;
using Electronic.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Electronic.Controllers
{
    public class AdminController : Controller
    {
        #region DataContext

        private readonly protected DataContext _dataContext;
        private IWebHostEnvironment _webHostEnvironment;
        
        public AdminController(DataContext dataContext, IWebHostEnvironment webHostEnvironment)
        {
            _dataContext = dataContext;
            _webHostEnvironment = webHostEnvironment;
        }

        #endregion DataContext


        public IActionResult Index()
        {
            return View();
        }

        #region  Product Category



        

        
        #endregion Product Category


        #region Sub Product Category


       


        

       
        #endregion Sub Product Category


    }
}
