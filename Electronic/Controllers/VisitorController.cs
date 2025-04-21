using Electronic.Data;
using Electronic.Models;
using Electronic.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

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
            ProductCategoryListModel categoryListModel = new ProductCategoryListModel();
            ProductCategoryRepository product = new ProductCategoryRepository(_dataContext, _webHostEnvironment);

            var fullList = await product.GetProductList(); // get all categories (flat)
            categoryListModel.categoryList = product.BuildCategoryTree(fullList); // get only root categories with children

            return View(categoryListModel);
        }

        #endregion Index

        #region Product
        public async Task<IActionResult> Category(string id)
        {
            if (string.IsNullOrEmpty(id)) return RedirectToAction("Index");

            int rawId = int.Parse(Encoding.UTF32.GetString(Convert.FromBase64String(id)));

            ProductCategoryRepository product = new ProductCategoryRepository(_dataContext, _webHostEnvironment);
            var fullList = await product.GetProductList();

            var selectedCategory = fullList.FirstOrDefault(x => x.Raw_C_Id == rawId);
            var subCategories = fullList.Where(x => x.ParentCategoryId == rawId).ToList();
            var rootCategories = fullList.Where(x => x.ParentCategoryId == null).ToList();

            ViewBag.SelectedCategory = selectedCategory;
            ViewBag.RootCategories = rootCategories;
            ViewBag.SubCategories = subCategories;

            return View();
        }

        #endregion Product

        #region Sub Product
        //public async Task<IActionResult> SubProduct(int Id)
        //{
        //    var filteredSubCategories = await _dataContext.SubProductCategoryMsts
        //        .Where(s => s.Main_P_C_Id == Id)
        //        .Select(s => new SubProductCategoryListModel
        //        {
        //            Sub_P_C_Ids = s.Sub_P_C_Id,
        //            Main_P_C_Id = s.Main_P_C_Id,
        //            Sub_P_C_Name = s.Sub_P_C_Name,
        //            Sub_P_C_Image = s.Sub_P_C_Image,

        //        })
        //        .ToListAsync();

        //    return View(filteredSubCategories);
        //}

        #endregion Sub Product



        #region Sub Product Detail
        //public async Task<IActionResult> SubProductDetail(int id)
        //{
        //    var subProductDetail = await _dataContext.SubProductCategoryMsts
        //        .Where(s => s.Sub_P_C_Id == id)
        //        .Select(s => new SubProductCategoryListModel
        //        {
        //            Sub_P_C_Ids = s.Sub_P_C_Id,
        //            Main_P_C_Id = s.Main_P_C_Id,
        //            Sub_P_C_Name = s.Sub_P_C_Name,
        //            Sub_P_C_Image = s.Sub_P_C_Image,
        //            Sub_P_C_Description = s.Sub_P_C_Description
        //        })
        //        .FirstOrDefaultAsync();

        //    if (subProductDetail == null)
        //    {
        //        return NotFound(); // Show 404 if no data found
        //    }

        //    return View(subProductDetail);
        //}
        #endregion Sub ProductDetail
    }
}
