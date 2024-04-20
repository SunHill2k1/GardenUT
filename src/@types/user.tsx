export type user = {
  idUser: number;
  name: string;
  address: string;
  phoneNumber: string;
  isVip: boolean;
  role: string;
  email: string;
  fullName: string;
  carts: any[];
};

export type userState = {
  userList: user[];
  userSelected: user | null;
  totalRecord: number;
  isLoading: boolean;
};
