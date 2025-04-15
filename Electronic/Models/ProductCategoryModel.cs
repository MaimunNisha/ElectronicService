namespace Electronic.Models
{
    public class ProductCategoryModel
    {
        public string P_C_Id { get; set; }
        public int P_C_Ids { get; set; }
        public string P_C_Name { get; set; }
        public bool P_C_Status { get; set; }
        public int P_C_Order { get; set; }
        public IFormFile P_C_Image_Temp { get; set; }

        public string P_C_Image { get; set; }

        public DateTime P_C_Entery_Date { get; set; }
    }
    public class ProductCategoryListModel : ProductCategoryModel
    {
        public List<ProductCategoryListModel> productCategoryList { get; set; }
    }
}
