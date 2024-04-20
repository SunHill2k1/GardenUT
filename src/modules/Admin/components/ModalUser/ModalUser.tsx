/* eslint-disable react-hooks/exhaustive-deps */
import react, { useEffect, useState } from "react";
//type
import { user } from "~/@types/user";
//style
import style from "./ModalUser.module.scss";
import classNames from "classnames/bind";
// MUI
import { TextField, InputAdornment, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "~/components/Button";
import { dispatch, useSelector } from "~/redux/store";
import { getDetailUser } from "~/redux/slices/user";
import LoadingScreen from "~/components/LoadingScreen";

type props = {
  onClose: any;
  onUpdateUser?: any;
  userData: user;
};

const cx = classNames.bind(style);

type roleProp = {
  id: string;
  label: string;
};
const ROLE_LIST: roleProp[] = [
  {
    id: "Admin",
    label: "Admin",
  },
  {
    id: "Buyer",
    label: "Buyer",
  },
  {
    id: "Shipper",
    label: "Shipper",
  },
];

function ModalUser({ userData, onClose, onUpdateUser }: props) {
  const { userSelected, isLoading } = useSelector((state) => state.user);

  const [userDetail, setUserDetail] = useState<user | null>(null);

  useEffect(() => {
    setUserDetail(userSelected);
    return () => {
      setUserDetail(null);
    };
  }, [userSelected]);

  // ============================================================== ROLE ===================================================
  const [role, setRole] = useState<string>(() => userData.role);

  const handleChangeRole = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setRole(event.target.value as string);
  };

  const renderRoleIcon = () => {
    if (userDetail?.role === "Admin") {
      return <i className="bx bxs-key"></i>;
    } else if (userDetail?.role === "Shipper") {
      return <i className="bx bx-run"></i>;
    } else {
      return <i className="bx bxs-user"></i>;
    }
  };

  return (
    <>
      <div className={cx("wrapper")}>
        {userDetail && (
          <div className={cx("Modal")}>
            {isLoading && LoadingScreen}

            <div className={cx("header")}>
              <i className="bx bx-x" onClick={onClose}></i>
            </div>
            <div className={cx("body")}>
              <TextField
                disabled
                id="standard-disabled"
                label="Họ tên"
                defaultValue={userDetail.fullName}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ color: "var(--yellow-color)", fontSize: "24px" }}
                    >
                      {renderRoleIcon()}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                disabled
                id="standard-disabled"
                label="Tài khoản"
                defaultValue={userDetail.name}
                fullWidth
              />
              <TextField
                disabled
                id="standard-disabled"
                label="Email"
                defaultValue={userDetail.email}
                fullWidth
              />
              <TextField
                disabled
                id="standard-disabled"
                label="Sđt"
                defaultValue={userDetail.phoneNumber}
                fullWidth
              />
              <TextField
                disabled
                id="standard-disabled"
                label="Địa chỉ"
                defaultValue={userDetail.address}
                fullWidth
              />
              <Select
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                value={role}
                label="Role"
                onChange={handleChangeRole}
              >
                {ROLE_LIST.map((role) => (
                  <MenuItem value={role.id}>{role?.label}</MenuItem>
                ))}
              </Select>
            </div>
            <div className={cx("action")}>
              <Button
                // disabled={userDetail?.role === "Admin"}
                className={cx("update-btn", "btn")}
                onClick={() => onUpdateUser(role)}
              >
                Update
              </Button>
              {/* <Button className={cx("remove-btn", "btn")}>Remove</Button> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ModalUser;
