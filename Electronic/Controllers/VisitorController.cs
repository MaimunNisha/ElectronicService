using Electronic.Data;
using Electronic.Models;
using Electronic.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Electronic.Controllers
{
    public class VisitorController : Controller
    {
        #region DataContext

        private readonly protected DataContext _dataContext;
        private IWebHostEnvironment _webHostEnvironment;

        public VisitorController(DataContext dataContext, IWebHostEnvironment webHostEnvironment)
        {
            _dataContext = dataContext;
            _webHostEnvironment = webHostEnvironment;
        }

        #endregion DataContext

        #region Index
        public async Task<IActionResult> Index()
        {
            SubProductCategoryListModel categoryModelList = new SubProductCategoryListModel();

            SubProductCategoryRepository category = new SubProductCategoryRepository(_dataContext, _webHostEnvironment);
            ProductCategoryRepository product = new ProductCategoryRepository(_dataContext, _webHostEnvironment);
            categoryModelList.ProductCategoryList = await product.GetProductList();
            categoryModelList.SubProductCategoryLists = await category.GetSubProductList();
            return View(categoryModelList);
        }
        #endregion Index

        #region Product
        public async Task<IActionResult> Product()
        {
            ProductCategoryListModel categoryModelList = new ProductCategoryListModel();

            ProductCategoryRepository product = new ProductCategoryRepository(_dataContext, _webHostEnvironment);
            categoryModelList.productCategoryList = await product.GetProductList();
            return View(categoryModelList);
        }

        #endregion Product

        #region Sub Product
        public async Task<IActionResult> SubProduct(int Id)
        {
            var filteredSubCategories = await _dataContext.SubProductCategoryMsts
                .Where(s => s.Main_P_C_Id == Id)
                .Select(s => new SubProductCategoryListModel
                {
                    Sub_P_C_Ids = s.Sub_P_C_Id,
                    Main_P_C_Id = s.Main_P_C_Id,
                    Sub_P_C_Name = s.Sub_P_C_Name,
                    Sub_P_C_Image = s.Sub_P_C_Image,
                    
                })
                .ToListAsync();

            return View(filteredSubCategories);
        }

        #endregion Sub Product



        #region Sub Product Detail
        public async Task<IActionResult> SubProductDetail(int id)
        {
            var subProductDetail = await _dataContext.SubProductCategoryMsts
                .Where(s => s.Sub_P_C_Id == id)
                .Select(s => new SubProductCategoryListModel
                {
                    Sub_P_C_Ids = s.Sub_P_C_Id,
                    Main_P_C_Id = s.Main_P_C_Id,
                    Sub_P_C_Name = s.Sub_P_C_Name,
                    Sub_P_C_Image = s.Sub_P_C_Image,
                    Sub_P_C_Description = s.Sub_P_C_Description
                })
                .FirstOrDefaultAsync();

            if (subProductDetail == null)
            {
                return NotFound(); // Show 404 if no data found
            }

            return View(subProductDetail);
        }
        #endregion Sub ProductDetail
    }
}
