namespace Electronic.Models
{
    public class ProductModel
    {
        public string P_Id { get; set; }
        public int Raw_P_Id { get; set; } // Actual ID

        public string P_Name { get; set; }
        public string P_Description { get; set; }
        public bool P_IsApproved { get; set; }
        public DateTime P_CreatedDate { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public List<string> ImagePaths { get; set; }

        public List<IFormFile> Images { get; set; }

    }
    public class ProductListModel:ProductModel { 
    public List<ProductListModel> ProductList { get; set; }
    }
}
