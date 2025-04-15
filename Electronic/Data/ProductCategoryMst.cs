using System.ComponentModel.DataAnnotations;

namespace Electronic.Data
{
    public class ProductCategoryMst
    {
        [Key]
        public int P_C_Id { get; set; }
        public string P_C_Name { get; set; }
        public bool P_C_Status { get; set; }
        public int P_C_Order { get; set; }

        public string P_C_Image { get; set; }
        public DateTime P_C_Entery_Date { get;set; }
    }
}
