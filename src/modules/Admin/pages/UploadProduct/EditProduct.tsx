import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "~/redux/slices/product";
import { dispatch, useSelector } from "~/redux/store";
import UploadProduct from "./index";

function EditProduct() {
  const params = useParams();

  const { id } = params;

  const { productList } = useSelector((state) => state.product);

  const editProduct = productList.find(
    (product) => product.idProduct === Number(id)
  );

  return <>{editProduct && <UploadProduct editProduct={editProduct} />}</>;
}

export default EditProduct;
