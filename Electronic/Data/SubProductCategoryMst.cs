using System.ComponentModel.DataAnnotations;

namespace Electronic.Data
{
    public class SubProductCategoryMst
    {
        [Key]
        public int Sub_P_C_Id { get; set; }
        public int Main_P_C_Id { get; set; }
        public string Sub_P_C_Name { get; set; }
        public string Sub_P_C_Image { get;set; }
        public string Sub_P_C_Description { get; set; }
        public int Sub_P_C_Oder { get; set; }
        public bool Sub_P_C_Status { get; set; }
        public DateTime Sub_P_C_Date { get; set; }
    }
}
