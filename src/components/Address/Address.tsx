/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
//style
import style from "./Address.module.scss";
import classNames from "classnames/bind";
//MUI
import { Autocomplete, MenuItem, Stack, TextField } from "@mui/material";
//Axios API
import * as addressServices from "~/services/addressServices";

//component
import Button from "../Button";
import Modal from "../Modal";
import { useSelector } from "~/redux/store";

const cx = classNames.bind(style);

type addressProps = {
  addressValue: string;
  onChangeAddress: any;
};

function Address({ addressValue, onChangeAddress }: addressProps) {
  const { userInfor } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState<any>(false);

  // ==================================================================PROVINCE
  const [provinceList, setProvinceList] = useState<any[]>([]);
  const [provinceSelect, setProvinceSelect] = useState<any>({});

  const handleGetProvinceList = async () => {
    try {
      const response = await addressServices.getProvinces();
      if (response) {
        setProvinceList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectProvince = (e: any) => {
    const provinceValue = JSON.parse(e.target.value);
    setProvinceSelect({
      code: provinceValue?.code,
      name: provinceValue?.name,
    });
  };

  useEffect(() => {
    handleGetProvinceList();
  }, []);

  // ================================================================== DISTRIC
  const [districtList, setDistrictList] = useState<any[]>([]);
  const [districtSelect, setDistrictSelect] = useState<any>({});

  const handleGetDistrictList = async () => {
    try {
      const response = await addressServices.getDistricts(provinceSelect?.code);
      if (response) {
        setDistrictList(response.data?.districts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectDistrict = (e: any) => {
    const districtValue = JSON.parse(e.target.value);
    setDistrictSelect({
      code: districtValue?.code,
      name: districtValue?.name,
    });
  };

  useEffect(() => {
    setDistrictList([]);
    setDistrictSelect("");

    if (provinceSelect) {
      handleGetDistrictList();
    }
    // setWardList([]);
    // setWardSelect({});
  }, [provinceSelect]);

  // =============================================================== WARDS
  const [wardList, setWardList] = useState<any[]>([]);
  const [wardSelect, setWardSelect] = useState<any>({});

  const handleGetWardList = async () => {
    try {
      const response = await addressServices.getWards(districtSelect?.code);
      setWardList(response?.data.wards);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWardSelect = (e: any) => {
    const wardValue = JSON.parse(e.target.value);
    setWardSelect({
      code: wardValue?.code,
      name: wardValue?.name,
    });
  };

  useEffect(() => {
    setWardSelect("");
    setWardList([]);
    if (districtSelect) {
      handleGetWardList();
    }
  }, [districtSelect]);

  // ============================================================== STREET
  const [streetValue, setStreetValue] = useState<string>("");
  const handleChangeStreetValue = (e: any) => {
    setStreetValue(e.target.value);
  };

  const handleCreateAddress = () => {
    if (provinceSelect && districtSelect && wardSelect) {
      onChangeAddress(
        `${streetValue}- ${wardSelect.name} - ${districtSelect.name} - ${provinceSelect.name}`
      );
    }
  };

  return (
    userInfor && (
      <>
        <div className={cx("address", "item")}>
          <div className={cx("title")}>1. Địa chỉ</div>
          <div className={cx("address-default")}>
            <div className={cx("address-content")}>
              <div style={{ display: "flex" }}>
                <div className={cx("address-default_name")}>
                  {userInfor?.Fullname}
                </div>
                <div className={cx("address-default_phone")}>
                  {userInfor?.PhoneNumber}
                </div>
              </div>
              <div className={cx("address-default_address")}>
                {addressValue}
              </div>
            </div>
            {/* <button className={cx("btn-change")}>Change</button> */}
          </div>

          <Button
            outline
            className={cx("btn-another-address")}
            onClick={() => setShowModal(true)}
          >
            Chọn địa chỉ khác
          </Button>
        </div>

        {showModal && (
          <Modal setShowModal={setShowModal}>
            <>
              <div className={cx("address-form")}>
                <div className={cx("title")}>Chọn địa chỉ khác</div>
                {/* <Stack direction="row" spacing={1}>
             <TextField label="Name" sx={{ flex: 1 }}></TextField>
             <TextField label="Phone" sx={{ flex: 1 }}></TextField>
           </Stack> */}
                <Stack spacing={1}>
                  {/* PROVINCE */}
                  <TextField
                    select
                    label="Tỉnh/Thành phố"
                    sx={{ flex: 1 }}
                    onClick={handleGetProvinceList}
                    onChange={handleSelectProvince}
                    value={provinceSelect?.name}
                  >
                    {provinceList &&
                      provinceList.map((province, index) => (
                        <MenuItem key={index} value={JSON.stringify(province)}>
                          {province?.name}
                        </MenuItem>
                      ))}
                  </TextField>

                  {/* DISTRICT */}
                  <TextField
                    select
                    label="Quận/Huyện"
                    sx={{ flex: 1 }}
                    onClick={handleGetDistrictList}
                    onChange={handleSelectDistrict}
                  >
                    {districtList &&
                      districtList.map((district, index) => (
                        <MenuItem key={index} value={JSON.stringify(district)}>
                          {district?.name}
                        </MenuItem>
                      ))}
                  </TextField>
                  {/* WARD */}
                  <TextField
                    select
                    label="Phường/xã"
                    sx={{ flex: 1 }}
                    onClick={handleGetWardList}
                    onChange={handleWardSelect}
                  >
                    {wardList &&
                      wardList.map((ward, index) => (
                        <MenuItem key={index} value={JSON.stringify(ward)}>
                          {ward?.name}
                        </MenuItem>
                      ))}
                  </TextField>
                  <TextField
                    label="Số nhà - tên đường"
                    sx={{ flex: 1 }}
                    onChange={handleChangeStreetValue}
                  ></TextField>
                </Stack>
                <Button primary onClick={handleCreateAddress}>
                  Chọn
                </Button>
              </div>
            </>
          </Modal>
        )}
      </>
    )
  );
}

export default Address;
