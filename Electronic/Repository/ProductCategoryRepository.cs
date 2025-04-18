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

       
        #endregion  Product Category List

        #region Product Category Add


        #endregion Product Category Add

        #region Product Category Edit


        #endregion Product Category Edit

        #region Product Category Status
        #endregion Product Category Status

    }
}
