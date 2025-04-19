using Electronic.Data;
using Electronic.Models;
using Electronic.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Electronic.Controllers
{
    [Authorize]

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


        #region Category List

        public async Task<IActionResult> ProductCategoryList()
        {
            ProductCategoryListModel categoryListModel = new ProductCategoryListModel();
            ProductCategoryRepository categoryRepository = new ProductCategoryRepository(_dataContext, _webHostEnvironment);

            var flatList = await categoryRepository.GetProductList();
            categoryListModel.categoryList = categoryRepository.BuildCategoryTree(flatList);



            return View(categoryListModel);
        }



        #endregion Category List


        #region Category Add

        [HttpPost]
        public async Task<IActionResult> AddCategory(ProductCategoryModel category)
        {

            ProductCategoryRepository categoryRepositroy = new ProductCategoryRepository(_dataContext, _webHostEnvironment);
            await categoryRepositroy.AddCategory(category);
            TempData["alertupdate"] = "Your Category Add is Successfull!";

            return RedirectToAction("ProductCategoryList");
        }


        #endregion Category Add

        #region Category Edit

        [HttpPost]
        public async Task<IActionResult> EditProductCategory(ProductCategoryModel categoryModel)
        {

            ProductCategoryRepository category = new ProductCategoryRepository(_dataContext, _webHostEnvironment);
            await category.EditCategory(categoryModel);
            TempData["alertupdate"] = "Your Product Category Update is Successfull!";

            return RedirectToAction("ProductCategoryList");

        }


        #endregion Category Edit


        #region Category Status

        [HttpPost]
        public async Task<JsonResult> Category_Status(string id, bool check)
        {
            ProductCategoryRepository category = new ProductCategoryRepository(_dataContext, _webHostEnvironment);
            await category.Status_Category(id, check);
            return Json("Status Updated");
        }


        #endregion Category Status


        #region Category Delete

        [HttpPost]
        public async Task<IActionResult> Category_delete(string id)
        {
            ProductCategoryRepository category = new ProductCategoryRepository(_dataContext, _webHostEnvironment);
            await category.DeleteCategory(id); // Only call it once with the encoded ID
            TempData["alertdelete"] = "Category deleted successfully!";
            return RedirectToAction("User_List");
        }


        #endregion Category Delete


        #endregion Product Category





    }
}
