import react, { useEffect, useState } from "react";
//style
import classNames from "classnames/bind";

//type
import { user } from "~/@types/user";

// MUI
import {
  TableContainer,
  Table,
  TableBody,
  TablePagination,
} from "@mui/material";

// redux
import { useSelector, dispatch } from "~/redux/store";

//router
import { useNavigate } from "react-router-dom";

// components
import UserTableToolbar from "../../components/UserTable/UserTableToolbar";
import TableHeadCustom from "../../components/UserTable/TableHeadCustom";
import LoadingScreen from "~/components/LoadingScreen";
import UserTableRow from "../../components/UserTable/UserTableRow";
import {
  getDetailUser,
  getUserList,
  updateUserRole,
} from "~/redux/slices/user";
import ModalUser from "../../components/ModalUser/ModalUser";

const OPTIONS_ROLE = [
  { id: "*", name: "All" },
  { id: "Admin", name: "Admin" },
  { id: "Buyer", name: "Buyer" },
  { id: "Shipper", name: "Shipper" },
];

const USER_HEAD_TABLE = [
  // { id: "", label: "TT", align: "center", width: 80 },
  {
    id: "idUser",
    label: "ID",
    sortLabel: "IdUser",
    align: "center",
    width: 50,
  },
  {
    id: "name",
    label: "Tài khoản",
    sortLabel: "UserName",
    align: "center",
    minWidth: 100,
  },
  {
    id: "fullName",
    label: "Họ tên",
    sortLabel: "FullName",
    align: "center",
    minWidth: 170,
  },
  {
    id: "phoneNumber",
    label: "Sđt",
    sortLabel: "PhoneNumber",
    align: "left",
    width: 120,
  },
  {
    id: "email",
    label: "Email",
    sortLabel: "Email",
    align: "center",
    minWidth: 100,
  },
  {
    id: "role",
    label: "role",
    sortLabel: "Role",
    align: "center",
    width: 80,
  },
  // {
  //   id: "removeButton",
  //   label: "execute",
  //   sortLabel: "Amount",
  //   align: "center",
  //   minWidth: 100,
  // },
];

function Users() {
  const { userList, isLoading, totalRecord } = useSelector(
    (state) => state.user
  );

  //======================================================== PAGINATION ==============================================================

  type pagination = {
    pageSize: number;
    pageIndex: number;
  };
  const [pagination, setPagination] = useState<pagination>({
    pageIndex: 0,
    pageSize: 5,
  });

  const handleChangePage = (_: any, newPage: number) => {
    setPagination({ ...pagination, pageIndex: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination({
      pageSize: Number(event.target.value),
      pageIndex: 0,
    });
  };

  useEffect(() => {
    const params = {
      ...pagination,
      ...sort,
      role: filterRole,
      search: searchValue,
    };
    dispatch(getUserList(params));
  }, [pagination]);

  // ===================================================================== FILTER =============================================
  const [filterRole, setFilterRole] = useState<any>();

  const onFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination({ ...pagination, pageIndex: 0 });
    setSeachValue("");
    setFilterRole(event.target.value);
  };

  // ===================================================================== SORT ==============================================
  const [sort, setSort] = useState<any>({
    orderBy: "Role",
    isAes: false,
  });

  const handleSort = (sortLabel: number) => {
    if (sort.orderBy === sortLabel) {
      setSort({ ...sort, isAes: !sort.isAes });
    } else {
      setSort({ orderBy: sortLabel, isAes: false });
    }
    // setFilterRole();
    setSeachValue("");
    setPagination({ ...pagination, pageIndex: 0 });
  };

  useEffect(() => {
    const params = {
      ...pagination,
      search: searchValue,
      idType: filterRole,
      ...sort,
    };
    // dispatch(getProducts(params));
  }, [sort, filterRole]);

  // ===================================================================== SEARCH =============================================

  const [searchValue, setSeachValue] = useState<string>("");
  const handleSearch = (searchTitle: string) => {
    setSeachValue(searchTitle);
  };

  const handleKeyUp = (event: any) => {
    const inputValue = event.target.value;
    if (event.key === "Enter" || inputValue.length === 0) {
      const { pageIndex, pageSize } = pagination;
      setPagination({ pageSize, pageIndex: 0 });
      setSort({
        orderBy: "Role",
        order: false,
      });

      const params = {
        ...sort,
        ...pagination,
        idType: filterRole,
        search: searchValue,
      };
      // dispatch(getUserList(params));
    }
  };

  // ===================================================================== SELECTED ============================================
  const navigate = useNavigate();

  const [userSelected, setUserSelected] = useState<user | null>(null);
  const handleUserSelected = async (user: user) => {
    const response = await dispatch(getDetailUser({ idUser: user.idUser }));
    setUserSelected(response);
    setOpenModalUser(true);
  };

  const [openModalUser, setOpenModalUser] = useState<boolean>(false);

  const handleUpdateUserRole = async (role: string) => {
    console.log(role);
    let params = {
      idUser: userSelected?.idUser,
      newRole: role,
    };

    // if (userSelected?.role === "Buyer") {
    //   params = {
    //     idUser: userSelected?.idUser,
    //     newRole: "Admin",
    //   };
    //   await dispatch(updateUserRole(params));
    // } else if (userSelected?.role === "Admin") {
    //   params = {
    //     idUser: userSelected?.idUser,
    //     newRole: "Buyer",
    //   };
    // }

    const response = await dispatch(updateUserRole(params));
    if (response.success && userSelected) {
      const response = await dispatch(
        getDetailUser({ idUser: userSelected.idUser })
      );
      setUserSelected(response);
      const params = {
        ...pagination,
        search: searchValue,
        idType: filterRole,
        ...sort,
      };
      dispatch(getUserList(params));
    }
  };

  return (
    <>
      <h1 style={{ fontWeight: 500 }}>Quản lý người dùng</h1>
      <UserTableToolbar
        // filter
        optionTypeRole={OPTIONS_ROLE}
        filterTypeValue={filterRole}
        onFilterType={onFilterRole}
        // search
        onSearch={handleSearch}
        onPress={handleKeyUp}
        searchValue={searchValue}
      />

      <TableContainer
        sx={{
          minHeight: "350px",
          maxHeight: "calc(100vh - 308px)",
          overflowY: "overlay",
        }}
      >
        {isLoading && <LoadingScreen />}
        <Table stickyHeader aria-label="sticky table">
          <TableHeadCustom
            order={sort.orderBy ? "desc" : "asc"}
            orderBy={sort.label}
            headLabel={USER_HEAD_TABLE}
            onSort={handleSort}
          />
          <TableBody>
            {userList &&
              userList?.map((user) => (
                <UserTableRow
                  tableHead={USER_HEAD_TABLE}
                  key={user?.idUser}
                  row={user}
                  handleClick={() => handleUserSelected(user)}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        labelRowsPerPage="Số dòng hiển thị"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} trên tổng số ${count}`
        }
        component="div"
        count={totalRecord}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {openModalUser && userSelected && (
        <ModalUser
          onClose={() => setOpenModalUser(false)}
          userData={userSelected}
          onUpdateUser={handleUpdateUserRole}
        />
      )}
    </>
  );
}

export default Users;
