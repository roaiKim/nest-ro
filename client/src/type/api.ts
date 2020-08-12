export interface HomeAPIResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface HomeHeroInfo {
  title: string;
  subtitle: string;
  description: string;
  img: string;
}

export interface CurrentUserAPIResponse {
  name: string;
  avatar: string;
}

export interface FetchListData<T> {
  list: T[];
}

export interface UserManagement {
  id: string;
  name: string;
  email: string;
  nickName: string;
  phone: string;
}

export interface SystemManagement {
  id: string;
  name: string;
  address: string;
  accessToken: string;
  array: string;
  status: boolean;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}
