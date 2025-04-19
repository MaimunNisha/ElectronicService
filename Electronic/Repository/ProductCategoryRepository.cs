using Electronic.Data;
using Electronic.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Imaging;
using System.Text;

namespace Electronic.Repository
{
    public class ProductCategoryRepository
    {
        #region DataContext

        private readonly protected DataContext _dataContext;
        private protected IWebHostEnvironment _webHostEnvironment;
        public ProductCategoryRepository(DataContext dataContext,IWebHostEnvironment webHostEnvironment)
        {
            _dataContext = dataContext;
            _webHostEnvironment = webHostEnvironment;
        }

        #endregion DataContext

        #region Product Category List


        public async Task<List<ProductCategoryListModel>> GetProductList()
        {
            List<ProductCategoryListModel> CategoryListModels = new List<ProductCategoryListModel>();
            var data = await _dataContext.ProductCategoryMsts.OrderByDescending(x => x.C_IsApproved).ThenBy(x => x.C_Order).ToListAsync();

            foreach (var item in data)
            {
                ProductCategoryListModel list = new ProductCategoryListModel()
                {
                    C_Id = Convert.ToBase64String(Encoding.UTF32.GetBytes(item.C_Id.ToString())),
                    Raw_C_Id = item.C_Id,

                    C_Name = item.C_Name,
                    C_Image = item.C_Image,
                    C_Order = item.C_Order,
                    C_CreatedDate = item.C_CreatedDate,
                    C_IsApproved = item.C_IsApproved,
                    ParentCategoryId = item.ParentCategoryId,

                };
                CategoryListModels.Add(list);
            }
            return CategoryListModels;
        }

        public List<ProductCategoryListModel> BuildCategoryTree(List<ProductCategoryListModel> categories, int? parentId = null)
        {
            return categories
                .Where(x => x.ParentCategoryId == parentId)
                .Select(x => new ProductCategoryListModel
                {
                    Raw_C_Id = x.Raw_C_Id,

                    C_Id = x.C_Id,
                    C_Name = x.C_Name,
                    C_IsApproved = x.C_IsApproved,
                    C_Order = x.C_Order,
                    C_Image = x.C_Image,
                    C_CreatedDate = x.C_CreatedDate,
                    ParentCategoryId = x.ParentCategoryId,
                    categoryList = BuildCategoryTree(categories, x.Raw_C_Id)

                }).ToList();
        }

        #endregion  Product Category List

        #region Product Category Add

        public async Task AddCategory(ProductCategoryModel add)
        {

            ProductCategoryMst entity = new ProductCategoryMst();

            entity.C_Name = add.C_Name;
            entity.C_Order = add.C_Order;
            entity.ParentCategoryId = add.ParentCategoryId;
            entity.C_CreatedDate = add.C_CreatedDate;
            entity.C_IsApproved = add.C_IsApproved;
            if (add.C_Image_Temp != null)
            {
                string uniqueFileName = "MainCategoryImg_" + add.C_Image_Temp.FileName; //  starting name set as profile_image.
                string Categoryimg = "UploadImg/" + uniqueFileName;
                string Categoryimgs = Path.Combine(_webHostEnvironment.WebRootPath, Categoryimg);
                add.C_Image_Temp.CopyTo(new FileStream(Categoryimgs, FileMode.Create));
                entity.C_Image = Categoryimg; // Assign image path
            }



            await _dataContext.ProductCategoryMsts.AddAsync(entity);

            await _dataContext.SaveChangesAsync();
        }


        #endregion Product Category Add

        #region Product Category Edit

        public async Task EditCategory(ProductCategoryModel edit)
        {
            ProductCategoryMst editCategory = new ProductCategoryMst();

            editCategory.C_Id = Convert.ToInt32(Encoding.UTF32.GetString(Convert.FromBase64String(edit.C_Id)));
            editCategory.C_Name = edit.C_Name;
            editCategory.C_Order = edit.C_Order;
            editCategory.C_IsApproved = edit.C_IsApproved;
            editCategory.ParentCategoryId = edit.ParentCategoryId;
            if (edit.C_Image_Temp != null)
            {
                string uniqueFileName = "MainCategoryImg_" + edit.C_Image_Temp.FileName; //  starting name set as profile_image.
                string Categoryimg = "UploadImg/" + uniqueFileName;
                string Categoryimgs = Path.Combine(_webHostEnvironment.WebRootPath, Categoryimg);
                edit.C_Image_Temp.CopyTo(new FileStream(Categoryimgs, FileMode.Create));
                editCategory.C_Image = Categoryimg; // Assign image path
            }
            _dataContext.ProductCategoryMsts.Update(editCategory);
            await _dataContext.SaveChangesAsync();
        }

        #endregion Product Category Edit

        #region Product Category Status

        public async Task Status_Category(string id, bool check)
        {
            var status = _dataContext.ProductCategoryMsts.Find(Convert.ToInt32(Encoding.UTF32.GetString(Convert.FromBase64String(id.ToString()))));
            if (status != null)
            {
                status.C_IsApproved = check;
                _dataContext.ProductCategoryMsts.Update(status);
                await _dataContext.SaveChangesAsync();
            }
        }


        #endregion Product Category Status


        #region Category Delete
        public async Task DeleteCategory(string id)
        {
            var cat = _dataContext.ProductCategoryMsts.Find(Convert.ToInt32(Encoding.UTF32.GetString(Convert.FromBase64String(id))));
            if (cat != null)
            {
                _dataContext.ProductCategoryMsts.Remove(cat);
                await _dataContext.SaveChangesAsync();
            }
        }

        #endregion Category Delete

    }
}
