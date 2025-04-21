using System.ComponentModel.DataAnnotations;

namespace Electronic.Data
{
    public class ProductMst
    {
        [Key]
        public int P_Id { get; set; }
        public string P_Name { get; set; }
        public string P_Description { get; set; }
        public bool P_IsApproved { get; set; }
        public DateTime P_CreatedDate { get; set; }
        public int CategoryId { get; set; }

        public ProductCategoryMst Category { get; set; }
        public  ICollection<ProductImageMst> ProductImages { get; set; }

    }
}
