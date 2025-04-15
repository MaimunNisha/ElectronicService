namespace Electronic.Models
{
    public class SubProductCategoryModel
    {
        public string Sub_P_C_Id { get; set; }
        public int Sub_P_C_Ids { get; set; }
        public int Main_P_C_Id { get; set; }
        public string Enc_Main_P_C_Id { get; set; }
        public string Sub_P_C_Name { get; set; }
        public IFormFile Sub_P_C_Image_Temp { get; set; }

        public string Sub_P_C_Image { get; set; }
        public string Sub_P_C_Description { get; set; }
        public int Sub_P_C_Oder { get; set; }
        public bool Sub_P_C_Status { get; set; }
        public DateTime Sub_P_C_Date { get; set; }
    }
    public class SubProductCategoryListModel : SubProductCategoryModel
    {
        public List<SubProductCategoryListModel> SubProductCategoryLists { get; set; }
        public List<ProductCategoryListModel> ProductCategoryList { get; set; }

    }
}
