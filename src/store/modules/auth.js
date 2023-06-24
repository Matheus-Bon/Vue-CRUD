import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

export const auth = {
  state: {
    auth_status: false,
    auth_token: null,
    auth_info: {
      name: null,
      email: null,
      roles: null,
    },
  },

  getters: {
    GET_AUTH_STATUS(state) {
      return state.auth_status;
    },

    GET_AUTH_TOKEN(state) {
      return state.auth_token;
    },

    GET_AUTH_INFO(state) {
      return state.auth_info;
    },
  },

  actions: {
    login: async (context, loginData) => {
      try {
        const response = await axios.post("/login", loginData);
        context.commit("SET_AUTH_TOKEN", response.data.access_token);
        context.commit("SET_AUTH_INFO", response.data.user);
      } catch (err) {
        console.log(err);
      }
    },

    logout: async (context) => {
      try {
        const response = await axios.post("/logout", null, {
            headers: {
                Authorization: 'Bearer ' + context.state.auth_token
            }
        });
        context.commit("SET_AUTH_LOGOUT");
      } catch (err) {
        console.log(err);
      }
    },
  },
  mutations: {
    SET_AUTH_TOKEN(state, token) {
      state.auth_token = token;
      state.auth_status = true;
    },

    SET_AUTH_INFO(state, info) {
      state.auth_info.name = info.name;
      state.auth_info.email = info.email;
      state.auth_info.roles = info.roles[0].name;
    },

    SET_AUTH_LOGOUT(state) {
      state.auth_token = null;
      state.auth_status = false;

      state.auth_info = {
        name: null,
        email: null,
        roles: null,
      };
    },
  },
};
