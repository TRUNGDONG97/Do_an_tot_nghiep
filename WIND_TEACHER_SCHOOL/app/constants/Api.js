import axios from "axios";
import { Alert } from "react-native";
import NavigationUtil from "../navigation/NavigationUtil";
import I18n from "../i18n/i18n";
import AsyncStorage from "@react-native-community/async-storage";

function createAxios() {
  AsyncStorage.setItem("token", '49FF532E930B0F4A67C279EBEB1867C7') //full
  var axiosInstant = axios.create();
  axiosInstant.defaults.baseURL = "http://sky.winds.vn/";
  axiosInstant.defaults.timeout = 20000;
  axiosInstant.defaults.headers = { "Content-Type": "application/json" };

  axiosInstant.interceptors.request.use(
    async config => {
      let token = await AsyncStorage.getItem("token");

      if (typeof token === "undefined" || token === null) {
        token = "";
      }
      config.headers = {
        token: token,
        role: 1
      };
      // config.headers.token = await AsyncStorage.getItem('token', '')
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axiosInstant.interceptors.response.use(
    response => {
      // console.log("Response:", response.data);
      if (response.data && response.data.code == 403) {
        setTimeout(() => {
          Alert.alert("Thông báo", I18n.t("relogin"));
        }, 100);

        AsyncStorage.setItem("token", "", () => {
          NavigationUtil.navigate("Auth");
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
      return Promise.reject(err);
    }
  );
  return axiosInstant;
}

export const getAxios = createAxios();

/* Support function */
function handleResult(api) {
  return api.then(res => {
    if (res.data.status != 1) {
      return Promise.reject(new Error("Co loi xay ra"));
    }
    return Promise.resolve(res.data);
  });
}

// login
export const requestLogin = ({ phone, password, deviceID }) => {
  // let deviceID = await AsyncStorage.getItem("deviceID");
  return handleResult(
    getAxios.post("api/Service/Login", {
      phone: phone,
      password: password,
      deviceID: deviceID
    })
  );
};

//get list class
export const getListClass = deviceID => {
  return handleResult(
    getAxios.get(`api/Service/GetlistClass?deviceID=${deviceID}`)
  );
};

//get User infor
export const getUserInfo = () => {
  return handleResult(getAxios.get("api/Service/LoginDetail"));
};

// get salary
export const getSalary = payload => {
  return handleResult(getAxios.post("api/Service/GetSalary", payload));
};
//get notify screen

export const getNotify = payload => {
  return handleResult(
    getAxios.post("api/Service/GetListNotification", payload)
  );
};

// get detail class
export const getClassDetail = payload => {
  return handleResult(getAxios.post("api/Service/GetClassDetail", payload));
};

// absent by id
export const absentByTeacher = payload => {
  return handleResult(getAxios.post("api/Service/AbsentbyTeacherID", payload));
};

// send absent
export const sendAbsent = payload => {
  return handleResult(
    getAxios.post("api/Service/UpdateAbsentbyTeacherID", payload)
  );
};

// change pass
export const changePass = payload => {
  return handleResult(getAxios.post("api/Service/ChangePassWord", payload));
};

// get comment
export const getListComment = () => {
  return handleResult(getAxios.get("api/Service/GetListComment"));
};

// get comment
export const registerAcc = payload => {
  return handleResult(getAxios.post("api/Service/Register", payload));
};

export const delNotify = payload => {
  return handleResult(getAxios.post("api/Service/DeleteNoti", payload));
};
