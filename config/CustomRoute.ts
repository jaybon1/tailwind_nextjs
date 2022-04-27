const API_BASE_URL = "localhost:8080";

const ROUTES = Object.freeze({
  // CLIENT:{
  //     ROOT: '/',
  //     LOGIN: '/login',
  //     BRIDGE: '/bridge',
  // },
  API: {
    MAIN: `${API_BASE_URL}`,
    SIGN: {
      IN: `${API_BASE_URL}/login`,
    },
    REFRESH: `${API_BASE_URL}`,
    USERINFO: `${API_BASE_URL}/member-service/v1/commonInfo`,
    CURRENTCAMPAIGN: `${API_BASE_URL}/donation-service/v1/currentCampaign`,
  },
  TEST: {
    ORDERCHECKED: "/api/order/checked",
  },
});

export default ROUTES;
