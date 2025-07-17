
import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Form, Input, InputNumber, Select, Button, Card, Row, Col, Upload, message, Spin } from "antd";
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Brand, ProductCategory, ProductType, VehicleModel } from "@/types/MasterData/Product/ProductClassification";
import { Color, Material, UnitOfMeasure } from "@/types/MasterData/Product/ProductProperties";
import { useProducts } from "@features/Product/store/Product/hooks/useProduct";
import { ProductSave, VariantParam } from "@/types/MasterData/Product/ProductManagement";
import { productSaveSchema } from "@features/Product/schemas/ProductSchema";
import { useNavigate } from "react-router-dom";
import { useBrands } from "@features/Product/store/Brand/hooks/useBrand";
import { useVehicleModels } from "@features/Product/store/VehicleModel/hooks/useVehicleModel";
import { useProductTypes } from "@features/Product/store/ProductType/hooks/useProductType";
import { useProductCategories } from "@features/Product/store/ProductCategory/hooks/useProductCategory";
import { useUoM } from "@features/Product/store/UoM/hooks/useUoM";
import { useColors } from "@features/Product/store/Color/hooks/useColor";
import { useMaterials } from "@features/Product/store/Material/hooks/useMaterial";


interface ProductFormProps {
    productCode?: string;
    mode: "add" | "edit";
}



export default function ProductForm({ productCode, mode }: ProductFormProps) {
    const navigate = useNavigate();
    const { saveProduct, loading, usegetProductByCode, product, error } = useProducts();
    const { loadBrands, brands } = useBrands();
    const { loadVehicleModels, vehicleModels } = useVehicleModels();
    const { loadProductTypes, productTypes } = useProductTypes();
    const { loadProductCategories, productCategories } = useProductCategories();
    const { loadColors, colors } = useColors();
    const { loadUoM, uoMList } = useUoM();
    const { loadMaterials, materials } = useMaterials();
    const [productImgFileList, setProductImgFileList] = useState<UploadFile[]>([]);
    const [imageFilesList, setImageFilesList] = useState<UploadFile[]>([]);
    const [variantImgFiles, setVariantImgFiles] = useState<{ [key: number]: UploadFile[] }>({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);


    //Khởi tạo data cho các select
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsDataLoaded(true);
                await Promise.all([
                    loadBrands(),
                    loadVehicleModels(),
                    loadProductTypes(),
                    loadProductCategories(),
                    loadUoM(),
                    loadColors(),
                    loadMaterials(),
                ]);
            } catch (err) {
                message.error("Failed to load dropdown data");
                console.error("Error loading data:", err);
            } finally {
                setIsDataLoaded(false);
            }
        };
        if (!brands || !vehicleModels || !productTypes || !productCategories || !uoMList || !colors || !materials) {
            setIsDataLoaded(true);
        }
        loadData();
    }, []);


    const form = useForm({
        defaultValues: {
            product: {
                productName: "",
                productCode: "",
                description: "",
                modelID: 0,
                categoryID: 0,
                typeID: 0,
                brandID: 0,
                uoMID: 0,
                purchasePrice: 0,
                salePrice: 0,
                publicImgID: "",
                imagePath: "",
                id: 0,

                createdBy: "admin",
                updatedBy: "admin",
            },
            dimension: {
                productCode: "",
                height: 0,
                length: 0,
                width: 0,
                uoMHeightCode: "CM",
                uoMLengthCode: "CM",
                uoMWidthCode: "CM",


                createdBy: "admin",

                updatedBy: "admin",


            },
            variantParams: [],
            productImg: null,
            imageFiles: [],
            variantImgs: [],
        } as ProductSave,
        validators: {
            onChange: productSaveSchema,
        },
        onSubmit: async ({ value, formApi }) => {
            console.log("onSubmit called with value:", value); // Debug: Kiểm tra dữ liệu đầu vào
            console.log("Form errors before submit:", formApi.state.errors);
            try {
                if (Object.keys(formApi.state.errors).length > 0) {
                    message.error("Vui lòng kiểm tra lại thông tin nhập vào!");
                    console.log("Validation errors:", formApi.state.errors);
                    return;
                }
                if (mode == "edit" && !value.productImg && productImgFileList.length === 0) {
                    message.error("Vui lòng tải lên ảnh chính sản phẩm!");
                    return;
                }
                const productSave: ProductSave = {
                    product: {
                        ...value.product,
                        id: mode === "edit" ? value.product.id || 0 : 0,
                        productCode: value.product.productCode || " ",
                        purchasePrice: value.product.purchasePrice ?? 0,
                        salePrice: value.product.salePrice ?? 0,
                        publicImgID: value.product.publicImgID || "",
                        imagePath: value.product.imagePath || "",
                        productName: value.product.productName || "Default Product",
                        modelID: value.product.modelID || 1,
                        categoryID: value.product.categoryID || 1,
                        typeID: value.product.typeID || 1,
                        brandID: value.product.brandID || 1,
                        uoMID: value.product.uoMID || 1,


                    },
                    dimension: {
                        ...value.dimension,
                        id: mode === "edit" ? value.dimension.id || 0 : 0,
                        productCode: mode === "edit" ? value.dimension.productCode : "",
                        height: value.dimension.height ?? 0.01,
                        length: value.dimension.length ?? 0.01,
                        width: value.dimension.width ?? 0.01,
                        uoMHeightCode: value.dimension.uoMHeightCode || "CM",
                        uoMLengthCode: value.dimension.uoMLengthCode || "CM",
                        uoMWidthCode: value.dimension.uoMWidthCode || "CM",
                    },
                    variantParams: value.variantParams || [],
                    productImg: value.productImg,
                    imageFiles: value.imageFiles || [],
                    variantImgs: value.variantImgs || [],
                };
                console.log("Product Save Data:", productSave);

                const result = await saveProduct(productSave);
                if (result.success) {
                    message.success(result.message || "Lưu sản phẩm thành công!");
                    navigate("/product");
                } else {
                    console.error("Save product error:", result);
                    message.error(result.message || "Có lỗi xảy ra khi lưu sản phẩm");
                }
            } catch (error) {
                message.error("Có lỗi xảy ra khi lưu sản phẩm");
                console.log("Save product error:", error);
            }
        },
    });

    // Load product data for edit mode
    useEffect(() => {
        form.reset();
        const fetchProduct = async () => {
            if (productCode && mode === "edit" && (!product || productCode != product?.productCode)) {
                const result = await usegetProductByCode(productCode);
                if (!result.success) {
                    message.error("Product not found ")
                }
            } else
                if (mode === "edit" && product) {
                    // setIsDataLoading(loading);

                    const productData = product!;
                    console.log("Fetched Product Data:", product);
                    // Gắn dữ liệu ProductParam vào ProductSave (loại bỏ productImg, imageFiles, variantImgs)
                    form.setFieldValue('product', {
                        productCode: productData.productCode,
                        productName: productData.productName,
                        description: productData.description,
                        publicImgID: productData.publicImgID,
                        purchasePrice: productData.purchasePrice,
                        salePrice: productData.salePrice,
                        modelID: productData.vehicleModel.id || 0,
                        categoryID: productData.productCategory?.id || 0,
                        typeID: productData.productType?.id || 0,
                        brandID: productData.brand?.id || 0,
                        uoMID: productData.unitOfMeasure?.id || 0,
                        imagePath: productData.imagePath,
                        id: productData.id || 0,
                        createdBy: productData.createdBy || "admin",
                        updatedBy: productData.updatedBy || "admin",
                        createdDate: productData.createdDate || new Date().toISOString(),
                    });

                    form.setFieldValue('dimension', {
                        ...productData.dimension,
                        productCode: productData.productCode,
                        height: productData.dimension?.height || 0,
                        length: productData.dimension?.length || 0,
                        width: productData.dimension?.width || 0,
                        uoMHeightCode: productData.dimension?.uoMHeightCode || "CM",
                        uoMLengthCode: productData.dimension?.uoMLengthCode || "CM",
                        uoMWidthCode: productData.dimension?.uoMWidthCode || "CM",
                        id: productData.dimension?.id || 0,
                        createdBy: productData.dimension?.createdBy || "admin",
                        updatedBy: productData.dimension?.updatedBy || "admin",
                    });

                    // Ánh xạ ban đầu cho variantParams
                    const initialVariantParams = productData.variantParams.map((variant) => ({
                        ...variant,
                        colorID: variant.colorID || 0,
                        materialID: variant.materialID || 0,
                        position: variant.position || 0,
                        productVariantCode: variant.productVariantCode || "",
                        imageCode: variant.imageCode || "",
                        attributeCode: variant.attributeCode || "",
                        refProductCode: variant.refProductCode || "",
                        imagePath: variant.imagePath || "",
                        isPrimary: variant.isPrimary || false,
                    }));
                    form.setFieldValue('variantParams', initialVariantParams);



                    // Bước 2: Thêm mới dữ liệu từ ProductImages vào variantParams
                    const productImagesList = productData.productImages || [];
                    const existingVariantParams = form.getFieldValue("variantParams") || [];
                    const newVariantParamsFromImages = productImagesList.map((img) => ({
                        colorID: 0, // Giá trị mặc định, có thể điều chỉnh
                        materialID: 0, // Giá trị mặc định, có thể điều chỉnh
                        position: img.position,
                        productVariantCode: "", // Có thể cần logic để tạo mã mới
                        imageCode: img.imageCode,
                        attributeCode: "", // Giá trị mặc định, có thể điều chỉnh
                        refProductCode: img.refProductCode,
                        imagePath: img.imagePath,
                        isPrimary: img.isPrimary,
                    } as VariantParam));

                    // Kết hợp existingVariantParams và newVariantParamsFromImages
                    const updatedVariantParams = [...existingVariantParams, ...newVariantParamsFromImages];

                    // Cập nhật lại variantParams trong form với dữ liệu đã thêm
                    form.setFieldValue("variantParams", updatedVariantParams);




                    // Hiển thị ảnh lên khung upload theo imagePath
                    // Ảnh chính sản phẩm
                    if (productData.productImages.length > 0) {
                        setProductImgFileList([{
                            uid: productData.publicImgID,
                            name: productData.publicImgID,
                            url: productData.imagePath,
                            status: "done",
                        }]);
                    }

                    // Ảnh phụ sản phẩm (imageFilesList)
                    setImageFilesList(productData.productImages.map(img => ({
                        uid: img.imageCode,
                        name: img.imageCode,
                        url: img.imagePath,
                        status: "done",
                    })));

                    // Gắn ProductImages vào variantParams và hiển thị ảnh


                    const updatedVariantImgFiles: { [key: number]: UploadFile[] } = {};
                    productData.variantParams.forEach((variant, index) => {
                        updatedVariantImgFiles[index] = [{
                            uid: variant.imageCode || "",
                            name: " ",
                            url: variant.imagePath,
                            status: "done",
                        }];
                    });
                    setVariantImgFiles(updatedVariantImgFiles);

                    // setIsDataLoading(false);
                }
        };
        fetchProduct();
    }, [mode, productCode, product]);

    const addVariant = () => {
        const currentVariants = form.getFieldValue("variantParams") || [];
        form.setFieldValue("variantParams", [
            ...currentVariants,
            {
                colorID: 0,
                materialID: 0,
                position: 0,
                productVariantCode: "",
                imageCode: "",
                attributeCode: "",
                refProductCode: "",
                imagePath: "",
                isPrimary: true,
            },
        ]);
    };

    const removeVariant = (index: number) => {
        const currentVariants = form.getFieldValue("variantParams") || [];
        const updatedVariants = currentVariants
            .filter((_, i) => i !== index)
            .map((variant) => ({ ...variant }));
        form.setFieldValue("variantParams", updatedVariants);

        // Reindex variantImgFiles
        const newVariantImgFiles: { [key: number]: UploadFile[] } = {};
        Object.keys(variantImgFiles).forEach((key) => {
            const numKey = Number(key);
            if (numKey < index) {
                newVariantImgFiles[numKey] = variantImgFiles[numKey];
            } else if (numKey > index) {
                newVariantImgFiles[numKey - 1] = variantImgFiles[numKey];
            }
        });
        setVariantImgFiles(newVariantImgFiles);

        const currentVariantImgs = form.getFieldValue("variantImgs") || [];
        const updatedVariantImgs = currentVariantImgs.filter((_, i) => i !== index);
        form.setFieldValue("variantImgs", updatedVariantImgs);
    };

    const handleProductImgChange: UploadProps["onChange"] = ({ fileList }) => {
        const validFiles = fileList.filter((file) => {
            if (file.originFileObj) {
                const isImage = file.originFileObj.type.startsWith("image/");
                const isLt2M = file.originFileObj.size / 1024 / 1024 < 2;
                if (!isImage) {
                    message.error("Vui lòng chỉ tải lên file hình ảnh!");
                    return false;
                }
                if (!isLt2M) {
                    message.error("Kích thước ảnh không được vượt quá 2MB!");
                    return false;
                }
            }
            return true;
        });

        setProductImgFileList(validFiles);
        if (validFiles.length > 0 && validFiles[0].originFileObj) {
            form.setFieldValue("productImg", validFiles[0].originFileObj);
        } else {
            form.setFieldValue("productImg", null);
        }
    };

    const handleImageFilesChange: UploadProps["onChange"] = ({ fileList }) => {
        const validFiles = fileList.filter((file) => {
            if (file.originFileObj) {
                const isImage = file.originFileObj.type.startsWith("image/");
                const isLt2M = file.originFileObj.size / 1024 / 1024 < 2;
                if (!isImage) {
                    message.error("Vui lòng chỉ tải lên file hình ảnh!");
                    return false;
                }
                if (!isLt2M) {
                    message.error("Kích thước ảnh không được vượt quá 2MB!");
                    return false;
                }


            }
            return true;
        });

        setImageFilesList(validFiles);
        const files = validFiles
            .map((file) => ({
                imageFile: file.originFileObj || null,
                isPrimary: false,
            }))
            .filter((file) => file.imageFile);
        form.setFieldValue("imageFiles", files);

        // Đồng bộ variantParams với imageFiles
        const currentVariants = form.getFieldValue("variantParams") || [];
        const currentImages = currentVariants.filter(v => !v.isPrimary); //Lấy ảnh phụ 
        const currentImageCodes = new Set(validFiles.map(file => file.uid)); // Lấy imageCode từ fileList hiện tại
        const removedcurrentImages = currentImages.filter(variant => !currentImageCodes.has(variant.imageCode!));

        removedcurrentImages.forEach(e => {
            currentVariants.filter((v) => v.imageCode !== e.imageCode);
        });

        form.setFieldValue("variantParams", currentVariants);
    };

    const handleVariantImgChange =
        (variantIndex: number): UploadProps["onChange"] =>
            ({ fileList }) => {
                const validFiles = fileList.filter((file) => {
                    if (file.originFileObj) {
                        const isImage = file.originFileObj.type.startsWith("image/");
                        const isLt2M = file.originFileObj.size / 1024 / 1024 < 2;
                        if (!isImage) {
                            message.error("Vui lòng chỉ tải lên file hình ảnh!");
                            return false;
                        }
                        if (!isLt2M) {
                            message.error("Kích thước ảnh không được vượt quá 2MB!");
                            return false;
                        }
                    }
                    return true;
                });

                setVariantImgFiles((prev) => ({ ...prev, [variantIndex]: validFiles }));

                const currentVariantImgs = form.getFieldValue("variantImgs") || [];
                const updatedVariantImgs = [...currentVariantImgs];
                updatedVariantImgs[variantIndex] = {
                    imageFile: validFiles[0]?.originFileObj || null,
                    isPrimary: true,
                };
                form.setFieldValue("variantImgs", updatedVariantImgs);
            };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </div>
    );

    const vehicleModelOptions = vehicleModels?.map((model) => ({
        value: model.id,
        label: model.modelName,
    }));
    const categoryOptions = productCategories?.map((category) => ({
        value: category.id,
        label: category.categoryName,
    }));
    const productTypeOptions = productTypes?.map((type) => ({
        value: type.id,
        label: type.productTypeName,
    }));
    const brandOptions = brands?.map((brand) => ({
        value: brand.id,
        label: brand.brandName,
    }));
    const uomOptions = uoMList?.map((uom) => ({
        value: uom.id,
        label: uom.uoMName,
    }));
    const colorOptions = colors?.map((color) => ({
        value: color.id,
        label: color.colorName,
    }));
    const materialOptions = materials?.map((material) => ({
        value: material.id,
        label: material.materialName,
    }));


    if (error) {
        message.error(error);
    }
    if (isDataLoaded) {
        return <Spin tip="Đang tải dữ liệu..." />
    }

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
            <div style={{ marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/product")} style={{ marginBottom: 16 }}>
                    Quay lại
                </Button>
                <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
                    {mode === "add" ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
                </h1>
            </div>

            <Spin spinning={mode == "edit" && loading} tip="Đang tải dữ liệu...">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Form submitted, form state:", form.getAllErrors()); // Debug trạng thái form
                        console.log("Form errors before submit:", form.state.errors);

                        console.log("Form field Value", form.getFieldValue("variantImgs"));
                        form.handleSubmit().catch((error) => {
                            console.error("HandleSubmit error:", error); // Bắt lỗi từ handleSubmit
                        });
                    }}
                >
                    {/* Basic Information */}
                    <Card title="Thông tin cơ bản" style={{ marginBottom: 24 }}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <form.Field
                                    name="product.productName"
                                    children={(field) => (
                                        <Form.Item
                                            label="Tên sản phẩm"
                                            required
                                            validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                            help={field.state.meta.errors[0]?.message}
                                        >
                                            <Input
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Nhập tên sản phẩm"
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                            {mode === "edit" && (
                                <Col xs={24} sm={12}>
                                    <form.Field
                                        name="product.productCode"

                                        children={(field) => (
                                            <Form.Item
                                                label="Mã sản phẩm"
                                                required
                                                validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                                help={field.state.meta.errors[0]?.message}
                                            >
                                                <Input
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    placeholder="Nhập mã sản phẩm"
                                                    readOnly={mode === "edit"} // Sử dụng readOnly thay vì disabled
                                                />
                                            </Form.Item>
                                        )}
                                    />
                                </Col>
                            )}
                        </Row>

                        <form.Field
                            name="product.description"
                            children={(field) => (
                                <Form.Item
                                    label="Mô tả"
                                    validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                    help={field.state.meta.errors[0]?.message}
                                >
                                    <Input.TextArea
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Nhập mô tả sản phẩm"
                                        rows={3}
                                    />
                                </Form.Item>
                            )}
                        />

                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} md={8}>
                                <form.Field
                                    name="product.modelID"
                                    children={(field) => (
                                        <Form.Item
                                            label="Mẫu xe"
                                            required
                                            validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                            help={field.state.meta.errors[0]?.message}
                                        >
                                            <Select
                                                value={field.state.value || undefined}
                                                onChange={(value) => field.handleChange(value)}
                                                placeholder="Chọn mẫu xe"
                                                options={vehicleModelOptions}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                                <form.Field
                                    name="product.categoryID"
                                    children={(field) => (
                                        <Form.Item
                                            label="Danh mục"
                                            required
                                            validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                            help={field.state.meta.errors[0]?.message}
                                        >
                                            <Select
                                                value={field.state.value || undefined}
                                                onChange={(value) => field.handleChange(value)}
                                                placeholder="Chọn danh mục"
                                                options={categoryOptions}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                                <form.Field
                                    name="product.typeID"
                                    children={(field) => (
                                        <Form.Item
                                            label="Loại sản phẩm"
                                            required
                                            validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                            help={field.state.meta.errors[0]?.message}
                                        >
                                            <Select
                                                value={field.state.value || undefined}
                                                onChange={(value) => field.handleChange(value)}
                                                placeholder="Chọn loại sản phẩm"
                                                options={productTypeOptions}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <form.Field
                                    name="product.brandID"
                                    children={(field) => (
                                        <Form.Item
                                            label="Thương hiệu"
                                            required
                                            validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                            help={field.state.meta.errors[0]?.message}
                                        >
                                            <Select
                                                value={field.state.value || undefined}
                                                onChange={(value) => field.handleChange(value)}
                                                placeholder="Chọn thương hiệu"
                                                options={brandOptions}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                            <Col xs={24} sm={12}>
                                <form.Field
                                    name="product.uoMID"
                                    children={(field) => (
                                        <Form.Item
                                            label="Đơn vị tính"
                                            required
                                            validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                            help={field.state.meta.errors[0]?.message}
                                        >
                                            <Select
                                                value={field.state.value || undefined}
                                                onChange={(value) => field.handleChange(value)}
                                                placeholder="Chọn đơn vị tính"
                                                options={uomOptions}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <form.Field
                                    name="product.purchasePrice"
                                    children={(field) => (
                                        <Form.Item
                                            label="Giá mua (VNĐ)"
                                            required
                                            validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                            help={field.state.meta.errors[0]?.message}
                                        >
                                            <InputNumber
                                                value={field.state.value}
                                                onChange={(value) => field.handleChange(value ?? 0)}
                                                placeholder="0"
                                                style={{ width: "100%" }}
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                parser={(value) => Number((value || "").replace(/\$\s?|(,*)/g, ""))}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                            <Col xs={24} sm={12}>
                                <form.Field
                                    name="product.salePrice"
                                    children={(field) => (
                                        <Form.Item
                                            label="Giá bán (VNĐ)"
                                            required
                                            validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                            help={field.state.meta.errors[0]?.message}
                                        >
                                            <InputNumber
                                                value={field.state.value}
                                                onChange={(value) => field.handleChange(value ?? 0)}
                                                placeholder="0"
                                                style={{ width: "100%" }}
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                parser={(value) => Number((value || "").replace(/\$\s?|(,*)/g, ""))}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                    </Card>

                    {/* Dimensions */}
                    <Card title="Kích thước" style={{ marginBottom: 24 }}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} md={8}>
                                <form.Field
                                    name="dimension.length"
                                    children={(field) => (
                                        <Form.Item
                                            label="Chiều dài (cm)"
                                            validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                            help={field.state.meta.errors[0]?.message}
                                        >
                                            <InputNumber
                                                value={field.state.value}
                                                onChange={(value) => field.handleChange(value ?? 0)}
                                                placeholder="0"
                                                style={{ width: "100%" }}
                                                step={0.1}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                                <form.Field
                                    name="dimension.width"
                                    children={(field) => (
                                        <Form.Item
                                            label="Chiều rộng (cm)"
                                            validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                            help={field.state.meta.errors[0]?.message}
                                        >
                                            <InputNumber
                                                value={field.state.value}
                                                onChange={(value) => field.handleChange(value ?? 0)}
                                                placeholder="0"
                                                style={{ width: "100%" }}
                                                step={0.1}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                                <form.Field
                                    name="dimension.height"
                                    children={(field) => (
                                        <Form.Item
                                            label="Chiều cao (cm)"
                                            validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                            help={field.state.meta.errors[0]?.message}
                                        >
                                            <InputNumber
                                                value={field.state.value}
                                                onChange={(value) => field.handleChange(value ?? 0)}
                                                placeholder="0"
                                                style={{ width: "100%" }}
                                                step={0.1}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                    </Card>

                    {/* Product Images */}
                    <Card title="Hình ảnh sản phẩm" style={{ marginBottom: 24 }}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <Form.Item label="Ảnh chính sản phẩm">
                                    <Upload
                                        listType="picture-card"
                                        fileList={productImgFileList}
                                        onChange={handleProductImgChange}
                                        beforeUpload={() => false}
                                        maxCount={1}
                                    >
                                        {productImgFileList.length >= 1 ? null : uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item label="Ảnh phụ sản phẩm">
                                    <Upload
                                        listType="picture-card"
                                        fileList={imageFilesList}
                                        onChange={handleImageFilesChange}
                                        beforeUpload={() => false}
                                        multiple
                                    >
                                        {imageFilesList.length >= 8 ? null : uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* Product Variants */}
                    <Card
                        title="Biến thể sản phẩm"
                        extra={
                            <Button type="dashed" icon={<PlusOutlined />} onClick={addVariant}>
                                Thêm biến thể
                            </Button>
                        }
                        style={{ marginBottom: 24 }}
                    >
                        <form.Field
                            name="variantParams"
                            children={(field) => {
                                const variants = field.state.value || [];

                                if (variants.length === 0) {
                                    return (
                                        <div style={{ textAlign: "center", padding: "32px 0", color: "#666" }}>
                                            Chưa có biến thể nào. Nhấn "Thêm biến thể" để bắt đầu.
                                        </div>
                                    );
                                }

                                return (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                        {variants.map((variant, index) => (
                                            (variant.isPrimary &&
                                                <Card
                                                    key={index}
                                                    size="small"
                                                    title={`Biến thể #${index + 1}`}
                                                    extra={
                                                        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeVariant(index)}>
                                                            Xóa
                                                        </Button>
                                                    }
                                                >
                                                    <Row gutter={[16, 16]}>
                                                        <Col xs={24} sm={12} md={6}>
                                                            <Form.Item label="Màu sắc" required>
                                                                <Select
                                                                    value={variant.colorID || undefined}
                                                                    onChange={(value) => {
                                                                        const updatedVariants = [...variants];
                                                                        updatedVariants[index] = { ...variant, colorID: value };
                                                                        field.handleChange(updatedVariants);
                                                                    }}
                                                                    placeholder="Chọn màu sắc"
                                                                    options={colorOptions}
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col xs={24} sm={12} md={6}>
                                                            <Form.Item label="Chất liệu" required>
                                                                <Select
                                                                    value={variant.materialID || undefined}
                                                                    onChange={(value) => {
                                                                        const updatedVariants = [...variants];
                                                                        updatedVariants[index] = { ...variant, materialID: value };
                                                                        field.handleChange(updatedVariants);
                                                                    }}
                                                                    placeholder="Chọn chất liệu"
                                                                    options={materialOptions}
                                                                />
                                                            </Form.Item>
                                                        </Col>

                                                        <Col xs={24} sm={12} md={6}>
                                                            <Form.Item label="Ảnh biến thể">
                                                                <Upload
                                                                    listType="picture-card"
                                                                    fileList={variantImgFiles[index] || []}
                                                                    onChange={handleVariantImgChange(index)}
                                                                    beforeUpload={() => false}
                                                                    maxCount={1}
                                                                >
                                                                    {(variantImgFiles[index]?.length || 0) >= 1 ? null : uploadButton}
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            )
                                        ))}
                                    </div>
                                );
                            }}
                        />
                    </Card>

                    {/* Submit Buttons */}
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 16 }}>
                        <Button onClick={() => navigate("/product")}>Hủy</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                            loading={loading}
                            disabled={loading || Object.keys(form.state.errors).length > 0}
                        >
                            {mode === "add" ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
                        </Button>
                    </div>
                </form>
            </Spin>
        </div>
    );
}
