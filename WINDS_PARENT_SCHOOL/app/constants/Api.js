import axios from "axios";
import { Alert } from "react-native";
import NavigationUtil from "../navigation/NavigationUtil";
import I18n from "../i18n/i18n";
import AsyncStorage from "@react-native-community/async-storage";
import { SCREEN_ROUTER } from "@constant";

// singleton  network client
function createAxios() {
  // AsyncStorage.setItem("token", '2323226DADAD') //full
  var axiosInstant = axios.create();
  axiosInstant.defaults.baseURL = "http://00d7f3e80ff8.ngrok.io/app";
  axiosInstant.defaults.timeout = 20000;
  axiosInstant.defaults.headers = { "Content-Type": "application/json" };

  axiosInstant.interceptors.request.use(
    async config => {
      let token = await AsyncStorage.getItem("token");
      if (typeof token === "undefined" || token === null) {
        token = "";
      }
      config.headers = {
        role: 2,
        token: token
      };
      // console.log("Token: ", config.headers.token);
      return config;
    },
    error => Promise.reject(error)
  );

  axiosInstant.interceptors.response.use(
    response => {
      // console.log("Response:", response.data);
      if (response.data && response.data.code == 403) {
        setTimeout(() => {
          Alert.alert("Thông báo", I18n.t("relogin"));
        }, 100);

        AsyncStorage.setItem("token", "", () => {
          NavigationUtil.navigate(SCREEN_ROUTER.AUTH);
        });
      } else if (response.data && response.data.status != 1) {
        setTimeout(() => {
          Alert.alert("Thông báo", response.data.message);
        }, 100);
      }
      return response;
    },
    err => {
      setTimeout(() => {
        Alert.alert("Thông báo", "Lỗi kết nối");
      }, 100);
    }
  );
  return axiosInstant;
}

export const getAxios = createAxios();

/* Support function */
function handleResult(api) {
  return api.then(res => {
    if (res.data.status != 1) {
      // console.log("Status != 1\n");
      return Promise.reject(new Error("err"));
    }
    console.log("RequestSuccess\n");
    return Promise.resolve(res.data);
  });
}

// Application api request
export const requestLogin = payload => {
  return handleResult(getAxios.post("login", payload));
};
export const requestLogout = payload => {
  return handleResult(getAxios.get("logout"));
};

//get list class
export const getListClass = () => {
  return handleResult(
    getAxios.get(`student/getClass`)
  );
};

//get User infor
export const getUserInfo = () => {
  return handleResult(getAxios.get("student/getUserInfo"));
};

//get list fee
export const getListFee = payload => {
  return handleResult(getAxios.post("api/Service/GetListFee", payload));
};

// change pass
export const changePass = payload => {
  return handleResult(getAxios.post("student/changePass", payload));
};

//get list bank
export const getListBank = () => {
  return handleResult(getAxios.get("api/Service/GetListBank"));
};
export const getListAbsent = payload => {
  return handleResult(
    getAxios.post("api/Service/GetlistAbsentDetail", payload)
  );
};

//create review
export const createReview = payLoad => {
  return handleResult(getAxios.post("api/Service/CreateReview", payLoad));
};

//get notification
export const getListNotification = payLoad => {
  return handleResult(
    getAxios.post("api/Service/GetListNotification", payLoad)
  );
};

export const registerAcc = payload => {
  return handleResult(getAxios.post("api/Service/Register", payload));
};

export const delNotify = payload => {
  return handleResult(getAxios.post("api/Service/DeleteNoti", payload));
};
export const updateUser = payload => {
  return handleResult(getAxios.post(`student/changeUserInfo`, payload));
};
