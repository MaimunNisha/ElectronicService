using Electronic.Data;
using Electronic.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Electronic.Repository
{
    public class ProductRepository
    {
        #region DataContext

        private readonly protected DataContext _dataContext;
        private protected IWebHostEnvironment _webHostEnvironment;
        public ProductRepository(DataContext dataContext, IWebHostEnvironment webHostEnvironment)
        {
            _dataContext = dataContext;
            _webHostEnvironment = webHostEnvironment;
        }
        #endregion DataContext

        #region Product List

        public async Task<List<ProductListModel>> GetProductList()
        {
            List<ProductListModel> productList = new List<ProductListModel>();

            var data = await _dataContext.ProductMsts
                .Include(x => x.Category)
                .Include(x => x.ProductImages)
                .OrderByDescending(x => x.P_CreatedDate)
                .ToListAsync();

            foreach (var item in data)
            {
                ProductListModel model = new ProductListModel()
                {
                    P_Id = Convert.ToBase64String(Encoding.UTF32.GetBytes(item.P_Id.ToString())),
                    Raw_P_Id = item.P_Id,
                    P_Name = item.P_Name,
                    P_Description = item.P_Description,
                    P_IsApproved = item.P_IsApproved,
                    P_CreatedDate = item.P_CreatedDate,
                    CategoryId=item.CategoryId,
                    CategoryName = item.Category?.C_Name,
                    ImagePaths = item.ProductImages?.Select(img => img.ImagePath).ToList()
                };

                productList.Add(model);
            }

            return productList;
        }


        #endregion Prduct List


        #region Product Add

        public async Task AddProduct(ProductModel model)
        {
            ProductMst product = new ProductMst
            {
                P_Name = model.P_Name,
                P_Description = model.P_Description,
                CategoryId = model.CategoryId,
                P_IsApproved = model.P_IsApproved,
                P_CreatedDate = DateTime.Now
            };

            _dataContext.ProductMsts.Add(product);
            await _dataContext.SaveChangesAsync(); // Save to get product ID

            if (model.Images != null && model.Images.Count > 0)
            {
                string uploadFolder = Path.Combine(_webHostEnvironment.WebRootPath, "UploadImg");

                // Create folder if it doesn't exist
                if (!Directory.Exists(uploadFolder))
                {
                    Directory.CreateDirectory(uploadFolder);
                }

                foreach (var image in model.Images)
                {
                    if (image != null && image.Length > 0)
                    {
                        string uniqueFileName = "ProductImg_" + Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                        string filePath = Path.Combine(uploadFolder, uniqueFileName);
                        string dbPath = Path.Combine("UploadImg", uniqueFileName); // Path for DB

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }

                        var img = new ProductImageMst
                        {
                            ImagePath = dbPath,
                            ProductId = product.P_Id
                        };

                        _dataContext.ProductImageMsts.Add(img);
                    }
                }

                await _dataContext.SaveChangesAsync();
            }
        }

        #endregion Product Add



        #region Product  Edit

        public async Task EditProduct(ProductModel model)
        {
            ProductMst product = new ProductMst
            {
                P_Name = model.P_Name,
                P_Description = model.P_Description,
                CategoryId = model.CategoryId,
                P_IsApproved = model.P_IsApproved,
                P_CreatedDate = DateTime.Now
            };

            _dataContext.ProductMsts.Add(product);
            await _dataContext.SaveChangesAsync(); // Save to get product ID

            if (model.Images != null && model.Images.Count > 0)
            {
                string uploadFolder = Path.Combine(_webHostEnvironment.WebRootPath, "UploadImg");

                // Create folder if it doesn't exist
                if (!Directory.Exists(uploadFolder))
                {
                    Directory.CreateDirectory(uploadFolder);
                }

                foreach (var image in model.Images)
                {
                    if (image != null && image.Length > 0)
                    {
                        string uniqueFileName = "ProductImg_" + Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                        string filePath = Path.Combine(uploadFolder, uniqueFileName);
                        string dbPath = Path.Combine("UploadImg", uniqueFileName); // Path for DB

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }

                        var img = new ProductImageMst
                        {
                            ImagePath = dbPath,
                            ProductId = product.P_Id
                        };

                        _dataContext.ProductImageMsts.Add(img);
                    }
                }

                await _dataContext.SaveChangesAsync();
            }
        
        }

        #endregion Product Product Edit

        #region Product Product Status

        public async Task Status_Product(string id, bool check)
        {
            var status = _dataContext.ProductMsts.Find(Convert.ToInt32(Encoding.UTF32.GetString(Convert.FromBase64String(id.ToString()))));
            if (status != null)
            {
                status.P_IsApproved = check;
                _dataContext.ProductMsts.Update(status);
                await _dataContext.SaveChangesAsync();
            }
        }


        #endregion Product Product Status


        #region Product Delete
        public async Task DeleteProduct(string id)
        {
            var cat = _dataContext.ProductMsts.Find(Convert.ToInt32(Encoding.UTF32.GetString(Convert.FromBase64String(id))));
            if (cat != null)
            {
                _dataContext.ProductMsts.Remove(cat);
                await _dataContext.SaveChangesAsync();
            }
        }

        #endregion Product Delete


    }
}
