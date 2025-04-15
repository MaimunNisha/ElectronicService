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

        public async Task<IActionResult> ProductCategoryList()
        {
            ProductCategoryListModel categoryModelList = new ProductCategoryListModel();

            ProductCategoryRepository category = new ProductCategoryRepository(_dataContext,_webHostEnvironment);
            categoryModelList.productCategoryList = await category.GetProductList();


            return View(categoryModelList);
        }


        [HttpPost]
        public async Task<IActionResult> AddProductCategory(ProductCategoryModel category)
        {
            
            ProductCategoryRepository categoryRepositroy = new ProductCategoryRepository(_dataContext, _webHostEnvironment);
            await categoryRepositroy.AddProductCategory(category);
            TempData["alertupdate"] = "Your Product Add is Successfull!";

            return RedirectToAction("ProductCategoryList");
        }


        [HttpPost]
        public async Task<IActionResult> EditProductCategory(ProductCategoryModel categoryModel)
        {
           
            ProductCategoryRepository category = new ProductCategoryRepository(_dataContext, _webHostEnvironment);
            await category.EditProductCategory(categoryModel);
            TempData["alertupdate"] = "Your Product Update is Successfull!";

            return RedirectToAction("ProductCategoryList");

        }

        [HttpPost]
        public async Task<JsonResult> Category_Status(string id, bool check)
        {
            ProductCategoryRepository category = new ProductCategoryRepository(_dataContext, _webHostEnvironment);
            await category.Status_Category(id, check);
            return Json("Status Updated");
        }
        #endregion Product Category


        #region Sub Product Category

        public async Task<IActionResult> SubProductCategoryList()
        {
            SubProductCategoryListModel categoryModelList = new SubProductCategoryListModel();

            SubProductCategoryRepository category = new SubProductCategoryRepository(_dataContext,_webHostEnvironment);
            ProductCategoryRepository product = new ProductCategoryRepository(_dataContext, _webHostEnvironment);
            categoryModelList.ProductCategoryList = await product.GetProductList();
            categoryModelList.SubProductCategoryLists = await category.GetSubProductList();


            return View(categoryModelList);
        }


        [HttpPost]
        public async Task<IActionResult> SubAddProductCategory(SubProductCategoryModel category)
        {
           
            SubProductCategoryRepository categoryRepositroy = new SubProductCategoryRepository(_dataContext, _webHostEnvironment);
                await categoryRepositroy.AddSubProductCategory(category);
                TempData["alertupdate"] = "Your Sub Product Add is Successfull!";

                return RedirectToAction("SubProductCategoryList");

            
            }


        [HttpPost]
        public async Task<IActionResult> SubEditProductCategory(SubProductCategoryModel categoryModel)
        {
            
            SubProductCategoryRepository category = new SubProductCategoryRepository(_dataContext, _webHostEnvironment);
            await category.EditSubProductCategory(categoryModel);
            TempData["alertupdate"] = "Your Sub Product Update is Successfull!";

            return RedirectToAction("SubProductCategoryList");

        }

        [HttpPost]
        public async Task<JsonResult> SubCategory_Status(string id, bool check)
        {
            SubProductCategoryRepository category = new SubProductCategoryRepository(_dataContext, _webHostEnvironment);
            await category.SubStatus_Category(id, check);
            return Json("Status Updated");
        }
        #endregion Sub Product Category


    }
}
