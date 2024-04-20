import { useEffect, useState } from "react";
import { product } from "~/@types/product";

//style
import style from "./UploadProduct.module.scss";
import classNames from "classnames/bind";
//MUI
import { TextField, MenuItem, Stack, Grid } from "@mui/material";

//redux
import { dispatch, useSelector } from "~/redux/store";
import { getTypeProductList } from "~/redux/slices/typeProduct";

//form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

//component
import Button from "~/components/Button";
import FormProvider from "~/Hook-Form/FormProvider";
import RHFTextField from "~/Hook-Form/RHFTextField";
import ImageComponent from "~/components/ImageComponent";
import { httpRequest } from "~/utils/httpRequest";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import LoadingScreen from "~/components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import {
  createNewProduct,
  postImgProduct,
  removeProduct,
  updateProduct,
} from "~/redux/slices/product";

// import * as cloudinary from "cloudinary/lib";

// cloudinary.config({
//   cloud_name: "garden-market-uth",
//   api_key: 533236431451436,
//   api_secret: "IkOdgxnM7c-KxGUS9hZHAXPoUGQ",
// });

type FormData = {
  IdType: number;
  NameType: string;
  IdUserGen: number;
  Name: string;
  Description: string;
  Price: number;
  Amount: number;
  PriceDiscount: number;
  LinkImages: string[];
};

const createSchema = yup.object({
  IdType: yup.number().required(),
  Name: yup.string().required(),
  NameType: yup.string().when("isNewType", {
    is: true,
    then: yup.string().required(),
    otherwise: yup.string().nullable(),
  }),
  isNewType: yup.boolean(),
  Description: yup.string().required(),
  Price: yup.number().required(),
  Amount: yup.number().required(),
  PriceDiscount: yup.number().required(),
});

type props = {
  editProduct?: product;
};

const cx = classNames.bind(style);

function UploadProduct({ editProduct }: props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { typeProductList } = useSelector((state) => state.typeProduct);
  const { userInfor } = useSelector((state) => state.auth);

  // =======================================================================TYPE PRODUCT

  let optiontypeProduct: any = typeProductList.map((type) => ({
    ...type,
    id: type?.idType,
    name: type?.nameType,
  }));

  optiontypeProduct = [{ id: -1, name: "Khác" }, ...optiontypeProduct];

  useEffect(() => {
    dispatch(getTypeProductList());
  }, []);

  const [typeProductSelect, setTypeProductSelect] = useState<number>(() => {
    return editProduct?.idType ?? -1;
  });

  const handleSelectType = (e: any) => {
    setTypeProductSelect(e.target.value);
  };

  // ====================================================================CLOUDINARY MODAL

  const [images, setImages] = useState<any[]>([]);

  const handleopenWidget = () => {
    let myWidget = window?.cloudinary.createUploadWidget(
      {
        cloudName: "garden-market-uth",
        uploadPreset: "img-upload",
        folder: "product-images",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setImages((prev: any) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    myWidget.open();
  };

  // ====================================================================FORM

  const defaultValues = {
    IdType: editProduct?.idType || -1,
    NameType: editProduct?.idTypeNavigation?.nameType || null,
    isNewType: false,
    IdUserGen: userInfor?.idUser,
    Name: editProduct?.name || "",
    Description: editProduct?.description || "",
    Price: editProduct?.price || 1,
    Amount: editProduct?.amount || 1,
    PriceDiscount: editProduct?.priceDiscount || 1,
    Images: editProduct?.images || [],
  };

  const method = useForm<FormData>({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(createSchema),
  });

  // ==================================================================== DELETE DEFAULT IMAGES===========

  const [defautImg, setDefaultImg] = useState<any>(
    () => defaultValues?.Images ?? []
  );
  const [imgToDelete, setImgToDelete] = useState<string[]>([]);
  const handleDeleteImg = (imgId: any) => {
    setImgToDelete((prev) => [...prev, imgId]);
    const newImgList = defautImg.filter((img: any) => img?.idImage !== imgId);
    setDefaultImg(newImgList);
  };

  // ========================================================================= SUBMIT =========================================
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const updateImg = images?.map((image) => ({
      Link: image?.url,
      IdCloudinary: image?.public_id,
    }));

    const findNameType = typeProductList?.find((type) => {
      if (type?.idType === typeProductSelect) {
        return type?.nameType;
      }
    });

    const params = {
      ...data,
      IdType: typeProductSelect,
      NameType:
        typeProductSelect !== -1 ? findNameType?.nameType : data?.NameType,
      Images: updateImg,
    };

    try {
      if (editProduct) {
        const params = {
          IdType: typeProductSelect,
          NameType:
            typeProductSelect !== -1 ? findNameType?.nameType : data?.NameType,
          idProduct: editProduct?.idProduct,
          name: data?.Name,
          description: data?.Description,
          price: data?.Price,
          amount: data?.Amount,
          priceDiscount: data?.PriceDiscount,
          insertImages: updateImg,
          deletedImage: imgToDelete,
        };

        await dispatch(updateProduct(params));
      } else {
        // create
        await dispatch(createNewProduct(params));
      }
      reset();
      enqueueSnackbar("Thành công", {
        variant: "success",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
      navigate("/admin/products");
    } catch (e) {
      // ============================= error
      console.log(e);
      enqueueSnackbar("Thất bại", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = method;

  // ========================================================================= REMOVE ==================================
  const handleRemoveProduct = async (id: number) => {
    try {
      const response = await httpRequest.delete(`/api/Product/${id}`, {});
      if (response.status === 200) {
        enqueueSnackbar("Thành công", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        navigate("/admin/products");
      }
      return response;
    } catch (e: any) {
      enqueueSnackbar("Thất bại", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
      if (e.response.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <>
      <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
        {isSubmitting && <LoadingScreen />}
        {/* ==============================select type */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Box sx={{ width: "100%" }}>
            <Stack direction="row" spacing={2}>
              <TextField
                select
                label="Product Type"
                value={typeProductSelect}
                onChange={handleSelectType}
                SelectProps={{
                  MenuProps: {
                    sx: { "& .MuiPaper-root": { maxHeight: 260 } },
                  },
                }}
                sx={{
                  flex: 1,
                  marginBottom: "16px",
                }}
              >
                {optiontypeProduct.map((option: any) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: "body2",
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              {typeProductSelect === -1 && (
                <div className={cx("input-field")} style={{ width: "50%" }}>
                  <RHFTextField name="NameType" label="Loại sản phẩm mới" />
                </div>
              )}
            </Stack>
            {/* ==========================================text field =========================================== */}

            <div className={cx("input-field")}>
              <RHFTextField name="Name" label="Tên sản phẩm" />
            </div>
            <div className={cx("input-field")}>
              <RHFTextField name="Amount" label="Số lượng" />
            </div>

            <Stack direction="row" spacing={2}>
              <div className={cx("input-field")} style={{ width: "50%" }}>
                <RHFTextField name="Price" label="Giá" />
              </div>

              {/* <div className={cx("input-field")} style={{ width: "50%" }}>
                <RHFTextField name="PriceDiscount" label="PriceDiscount" />
              </div> */}
            </Stack>

            <div className={cx("input-field")}>
              <RHFTextField
                multiline
                rows={4}
                name="Description"
                label="Mô tả"
              />
            </div>
          </Box>

          {/* ===============================BUTTON============================ */}
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              spacing={2}
              columns={{ sx: 2, md: 3 }}
              sx={{ marginTop: "5px" }}
            >
              {defaultValues.Images &&
                defautImg.map((image: any, index: number) => (
                  <Grid
                    item
                    sm={1}
                    key={index}
                    className={cx("img-item")}
                    onClick={() => handleDeleteImg(image?.idImage)}
                  >
                    <div className={cx("img-item")}>
                      <span className={cx("close-img-btn")}>
                        <i className="bx bx-x"></i>
                      </span>
                      <ImageComponent src={image.link} alt={"img" + index} />
                    </div>
                  </Grid>
                ))}

              {/* upload cloudinary */}
              {images &&
                images.map((img, index) => (
                  <Grid
                    item
                    sm={1}
                    key={index}
                    className={cx("img-item")}
                    // onClick={() => handleDeleteImg(img.url)}
                  >
                    <ImageComponent src={img.url} alt={"img" + index} />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Stack>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          {editProduct && (
            <button
              style={{
                padding: "5px 10px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "5px",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => handleRemoveProduct(editProduct?.idProduct)}
            >
              Xóa
            </button>
          )}

          <button
            style={{
              padding: "5px 10px",
              backgroundColor: "green",
              color: "white",
              borderRadius: "5px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            type="submit"
          >
            {editProduct ? "UPDATE" : "TẠO MỚI"}
          </button>
        </div>
      </FormProvider>

      <Button outline onClick={handleopenWidget}>
        Upload Ảnh
      </Button>
    </>
  );
}

export default UploadProduct;
