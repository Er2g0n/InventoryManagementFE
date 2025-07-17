import { z } from "zod";

export const productSaveSchema = z.object({
  product: z.object({
    productCode: z.string().optional(),
    productName: z.string().min(1, "Tên sản phẩm là bắt buộc"),
    modelID: z.number().min(1, "Vui lòng chọn mẫu xe"),
    categoryID: z.number().min(1, "Vui lòng chọn danh mục"),
    typeID: z.number().min(1, "Vui lòng chọn loại sản phẩm"), 
    brandID: z.number().min(1, "Vui lòng chọn thương hiệu"),
    uoMID: z.number().min(1, "Vui lòng chọn đơn vị tính"),
    description: z.string(),
    imagePath: z.string().nullable().optional(),
    publicImgID: z.string().nullable().optional(),
    purchasePrice: z.number().min(0, "Giá mua phải lớn hơn hoặc bằng 0"),
    salePrice: z.number().min(0, "Giá bán phải lớn hơn hoặc bằng 0"),
  }),
  dimension: z.object({
    height: z.number().min(0, "Chiều cao phải lớn hơn hoặc bằng 0"),
    length: z.number().min(0, "Chiều dài phải lớn hơn hoặc bằng 0"),
    width: z.number().min(0, "Chiều rộng phải lớn hơn hoặc bằng 0"),
    uoMHeightCode: z.string().min(1, "Đơn vị chiều cao là bắt buộc"),
    uoMLengthCode: z.string().min(1, "Đơn vị chiều dài là bắt buộc"),
    uoMWidthCode: z.string().min(1, "Đơn vị chiều rộng là bắt buộc"),
    productCode: z.string().optional(), // Thêm để khớp với ProductSave
  }),
  variantParams: z.array(
    z.object({
      productVariantCode: z.string().optional(),
      imageCode: z.string().optional(),
      attributeCode: z.string().optional(),
      refProductCode: z.string().optional(),
      position: z.number().optional(),
      imagePath: z.string().optional(),
      isPrimary: z.boolean().optional(),
      colorID: z.number().min(0, "Vui lòng chọn màu sắc"),
      colorName: z.string().nullable().optional(),
      materialID: z.number().min(0, "Vui lòng chọn chất liệu"),
      materialName: z.string().nullable().optional(),
    })
  ).optional(),
  productImg: z.instanceof(File, { message: "Ảnh chính sản phẩm là bắt buộc" }).nullable().optional(),
  imageFiles: z.array(
    z.object({
      imageFile: z.instanceof(File).nullable().optional(),
      isPrimary: z.boolean().optional(),
    })
  ).nullable().optional(),
  variantImgs: z.array(
    z.object({
      imageFile: z.instanceof(File).nullable().optional(),
      isPrimary: z.boolean(),
    })
  ).optional(),
});