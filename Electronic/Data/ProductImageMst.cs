using System.ComponentModel.DataAnnotations;

namespace Electronic.Data
{
    public class ProductImageMst
    {
        [Key]
        public int ImageId { get; set; }
        public string ImagePath { get; set; }
        public int ProductId { get; set; }

        public  ProductMst Product { get; set; }
    }
}
