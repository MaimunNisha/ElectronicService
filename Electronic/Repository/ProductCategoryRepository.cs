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
            List<ProductCategoryListModel> productCategoryListModels = new List<ProductCategoryListModel>();
            var data = await _dataContext.ProductCategoryMsts.OrderByDescending(x => x.P_C_Status).ThenBy(x => x.P_C_Order).ToListAsync();
            foreach (var item in data)
            {
                ProductCategoryListModel list = new ProductCategoryListModel()
                {
                    P_C_Id = Convert.ToBase64String(Encoding.UTF32.GetBytes(item.P_C_Id.ToString())),
                    P_C_Ids = item.P_C_Id,
                    P_C_Name = item.P_C_Name,
                    P_C_Order = item.P_C_Order,
                    P_C_Entery_Date = item.P_C_Entery_Date,
                    P_C_Status = item.P_C_Status,
                    P_C_Image=item.P_C_Image
                };
                productCategoryListModels.Add(list);
            }
            return productCategoryListModels;
        }

        #endregion  Product Category List

        #region Product Category Add

        public async Task  AddProductCategory(ProductCategoryModel add)
        {
            ProductCategoryMst addProduct = new ProductCategoryMst();

            addProduct.P_C_Name = add.P_C_Name;
            addProduct.P_C_Order = add.P_C_Order;
            addProduct.P_C_Status = add.P_C_Status;
            addProduct.P_C_Entery_Date = add.P_C_Entery_Date;
               if (add.P_C_Image_Temp != null)
            {
                string uniqueFileName = "MainProductImg_" + add.P_C_Image_Temp.FileName; //  starting name set as profile_image.
                string Productimg = "UploadImg/" + uniqueFileName;
                string Productimgs = Path.Combine(_webHostEnvironment.WebRootPath, Productimg);
                add.P_C_Image_Temp.CopyTo(new FileStream(Productimgs, FileMode.Create));
                addProduct.P_C_Image = Productimg; // Assign image path
            }
            await _dataContext.ProductCategoryMsts.AddAsync(addProduct);
            await _dataContext.SaveChangesAsync();
        }

        #endregion Product Category Add

        #region Product Category Edit

        public async Task EditProductCategory(ProductCategoryModel edit)
        {
            ProductCategoryMst editProduct = new ProductCategoryMst();

            editProduct.P_C_Id = Convert.ToInt32(Encoding.UTF32.GetString(Convert.FromBase64String(edit.P_C_Id)));
            editProduct.P_C_Name = edit.P_C_Name;
            editProduct.P_C_Order = edit.P_C_Order;
            editProduct.P_C_Entery_Date = edit.P_C_Entery_Date;
                editProduct.P_C_Status = edit.P_C_Status;
            if (edit.P_C_Image_Temp != null)
            {
                string uniqueFileName = "MainProductImg_" + edit.P_C_Image_Temp.FileName; //  starting name set as profile_image.
                string Productimg = "UploadImg/" + uniqueFileName;
                string Productimgs = Path.Combine(_webHostEnvironment.WebRootPath, Productimg);
                edit.P_C_Image_Temp.CopyTo(new FileStream(Productimgs, FileMode.Create));
                editProduct.P_C_Image = Productimg; // Assign image path
            }
            _dataContext.ProductCategoryMsts.Update(editProduct);
            await _dataContext.SaveChangesAsync();
        }

        #endregion Product Category Edit

        #region Product Category Status
        public async Task Status_Category(string id, bool check)
        {
            var status = _dataContext.ProductCategoryMsts.Find(Convert.ToInt32(Encoding.UTF32.GetString(Convert.FromBase64String(id.ToString()))));
            if (status != null)
            {
                status.P_C_Status = check;
                _dataContext.ProductCategoryMsts.Update(status);
                await _dataContext.SaveChangesAsync();
            }
        }
        #endregion Product Category Status

    }
}
