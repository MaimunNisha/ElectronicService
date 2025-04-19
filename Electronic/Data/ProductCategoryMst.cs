using System.ComponentModel.DataAnnotations;

namespace Electronic.Data
{
    public class ProductCategoryMst
    {
        [Key]
        public int C_Id { get; set; }
        public string C_Name { get; set; }
        public bool C_IsApproved { get; set; }
        public int C_Order { get; set; }
        public string C_Image { get; set; }
        public DateTime C_CreatedDate { get; set; } = System.DateTime.Now;

        public int? ParentCategoryId { get; set; }
        public ProductCategoryMst? ParentCategory { get; set; }

        public ICollection<ProductCategoryMst> SubCategories { get; set; } = new List<ProductCategoryMst>();

    }
}
