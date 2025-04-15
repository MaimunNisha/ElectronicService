using Electronic.Data;
using Electronic.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Electronic.Repository
{
    public class SubProductCategoryRepository
    {

        #region DataContext

        private readonly protected DataContext _dataContext;
        private protected IWebHostEnvironment _webHostEnvironment;

        public SubProductCategoryRepository(DataContext dataContext, IWebHostEnvironment webHostEnvironment)
        {
            _dataContext = dataContext;
            _webHostEnvironment = webHostEnvironment;

        }

        #endregion DataContext

        #region Sub Product Category List

        public async Task<List<SubProductCategoryListModel>> GetSubProductList()
        {
            List<SubProductCategoryListModel> subproductCategoryListModels = new List<SubProductCategoryListModel>();
            var data = await _dataContext.SubProductCategoryMsts.OrderByDescending(x => x.Sub_P_C_Status).ThenBy(x => x.Sub_P_C_Oder).ToListAsync();
            foreach (var item in data)
            {
                SubProductCategoryListModel list = new SubProductCategoryListModel()
                {
                    Sub_P_C_Id = Convert.ToBase64String(Encoding.UTF32.GetBytes(item.Sub_P_C_Id.ToString())),
                    Enc_Main_P_C_Id = Convert.ToBase64String(Encoding.UTF32.GetBytes(item.Main_P_C_Id.ToString())),
                    Main_P_C_Id = item.Main_P_C_Id,
                    Sub_P_C_Name = item.Sub_P_C_Name,
                    Sub_P_C_Image = item.Sub_P_C_Image,
                    Sub_P_C_Oder = item.Sub_P_C_Oder,
                    Sub_P_C_Description = item.Sub_P_C_Description,
                    Sub_P_C_Status = item.Sub_P_C_Status,
                    Sub_P_C_Date = item.Sub_P_C_Date
                };

                subproductCategoryListModels.Add(list);
            }
            return subproductCategoryListModels;
        }

        #endregion Sub Product Category List

        #region Sub Product Category Add

        public async Task AddSubProductCategory(SubProductCategoryModel add)
        {
            SubProductCategoryMst addProduct = new SubProductCategoryMst();

            addProduct.Main_P_C_Id = add.Main_P_C_Id;
            addProduct.Sub_P_C_Name = add.Sub_P_C_Name;
            addProduct.Sub_P_C_Oder = add.Sub_P_C_Oder;
            addProduct.Sub_P_C_Description = add.Sub_P_C_Description;
            addProduct.Sub_P_C_Date = add.Sub_P_C_Date;
            addProduct.Sub_P_C_Status = add.Sub_P_C_Status;
                 if (add.Sub_P_C_Image_Temp != null)
            {
                string uniqueFileName = "SubProductImg_" + add.Sub_P_C_Image_Temp.FileName; //  starting name set as profile_image.
                string Productimg = "UploadImg/" + uniqueFileName;
                string Productimgs = Path.Combine(_webHostEnvironment.WebRootPath, Productimg);
                add.Sub_P_C_Image_Temp.CopyTo(new FileStream(Productimgs, FileMode.Create));
                addProduct.Sub_P_C_Image = Productimg; // Assign image path
            }

        
            await _dataContext.SubProductCategoryMsts.AddAsync(addProduct);
            await _dataContext.SaveChangesAsync();
        }

        #endregion Sub Product Category Add

        #region Sub Product Category Edit

        public async Task EditSubProductCategory(SubProductCategoryModel edit)
        {
            SubProductCategoryMst editProduct = new SubProductCategoryMst();

            editProduct.Sub_P_C_Id = Convert.ToInt32(Encoding.UTF32.GetString(Convert.FromBase64String(edit.Sub_P_C_Id)));
            editProduct.Main_P_C_Id = edit.Main_P_C_Id;
            editProduct.Sub_P_C_Oder = edit.Sub_P_C_Oder;
            editProduct.Sub_P_C_Name = edit.Sub_P_C_Name;
            editProduct.Sub_P_C_Status = edit.Sub_P_C_Status;
            editProduct.Sub_P_C_Description = edit.Sub_P_C_Description;
            editProduct.Sub_P_C_Date = edit.Sub_P_C_Date;

            if (edit.Sub_P_C_Image_Temp != null)
            {
                string uniqueFileName = "SubProductImg_" + edit.Sub_P_C_Image_Temp.FileName; //  starting name set as profile_image.
                string Productimg = "UploadImg/" + uniqueFileName;
                string Productimgs = Path.Combine(_webHostEnvironment.WebRootPath, Productimg);
                edit.Sub_P_C_Image_Temp.CopyTo(new FileStream(Productimgs, FileMode.Create));
                editProduct.Sub_P_C_Image = Productimg; // Assign image path
            }

            _dataContext.SubProductCategoryMsts.Update(editProduct);
            await _dataContext.SaveChangesAsync();
        }

        #endregion Sub Product Category Edit

        #region Sub Product Category Status
        public async Task SubStatus_Category(string id, bool check)
        {
            var status = _dataContext.SubProductCategoryMsts.Find(Convert.ToInt32(Encoding.UTF32.GetString(Convert.FromBase64String(id.ToString()))));
            if (status != null)
            {
                status.Sub_P_C_Status = check;
                _dataContext.SubProductCategoryMsts.Update(status);
                await _dataContext.SaveChangesAsync();
            }
        }
        #endregion Sub Product Category Status


    }
}
