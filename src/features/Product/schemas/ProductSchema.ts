import { z } from "zod";

export const productSaveSchema = z.object({
  product: z.object({
    productCode: z.string().optional(),
    productName: z.string().min(1, "Tên sản phẩm là bắt buộc"),
    modelID: z.number().min(1, "Vui lòng chọn mẫu xe"),
    categoryID: z.number().min(1, "Vui lòng chọn danh mục"),
    typeID: z.number().min(1, "Vui lòng chọn loại sản phẩm"), // Đặt là bắt buộc nếu cần
    brandID: z.number().min(1, "Vui lòng chọn thương hiệu"), // Đặt là bắt buộc nếu cần
    uoMID: z.number().min(1, "Vui lòng chọn đơn vị tính"), // Đặt là bắt buộc nếu cần
    description: z.string().optional(),
    imagePath: z.string().optional(),
    publicImgID: z.string().optional(),
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
      position: z.number().min(0, "Vị trí phải lớn hơn hoặc bằng 0"),
      imagePath: z.string().optional(),
      isPrimary: z.boolean().optional(),
      colorID: z.number().min(1, "Vui lòng chọn màu sắc"),
      materialID: z.number().min(1, "Vui lòng chọn chất liệu"),
    })
  ).optional(),
  productImg: z.instanceof(File, { message: "Ảnh chính sản phẩm là bắt buộc" }),
  imageFiles: z.array(
    z.object({
      imageFile: z.instanceof(File).nullable().optional(),
      isPrimary: z.boolean(),
    })
  ).optional(),
  variantImgs: z.array(
    z.object({
      imageFile: z.instanceof(File).nullable().optional(),
      isPrimary: z.boolean(),
    })
  ).optional(),
});