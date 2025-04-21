namespace Electronic.Models
{
    public class ProductImageModel
    {
        public int ImageId { get; set; }
        public IFormFile ImagePathTemp { get; set; }
        public string ImagePath { get; set; }
        public int ProductId { get; set; }
    }
    public class ProductImageListModel : ProductImageModel
    {
        public List<ProductImageListModel> ProductImages { get; set; }
    }
}
