namespace Electronic.Models
{
    public class ProductCategoryModel
    {
        public string C_Id { get; set; }
        public int Raw_C_Id { get; set; }
        public string C_Name { get; set; }
        public bool C_IsApproved { get; set; }
        public int C_Order { get; set; }
        public IFormFile C_Image_Temp { get; set; }

        public string C_Image { get; set; }
        public DateTime C_CreatedDate { get; set; } = System.DateTime.Now;

        public int? ParentCategoryId { get; set; }


    }
    public class ProductCategoryListModel : ProductCategoryModel
    {
        public List<ProductCategoryListModel> categoryList { get; set; }

    }
}
