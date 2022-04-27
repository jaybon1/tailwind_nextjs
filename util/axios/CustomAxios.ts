import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse,} from "axios";
import JsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import CustomJwtPayload from "@/util/jwt/CustomJwtPayload";
import CustomRoute from "@/config/CustomRoute";

class CustomAxios {
  loginAxios: AxiosInstance;
  apiAxios: AxiosInstance;
  refreshAxios: AxiosInstance;
  fileAxios: AxiosInstance;

  constructor() {
    this.loginAxios = axios.create();

    this.apiAxios = axios.create();

    this.refreshAxios = axios.create();

    this.fileAxios = axios.create();
  }

  // 로그인 용
  loginInstance = () => {
    //TODO : 환경변수로 빼기 basic auth
    const token = `point-client:point-secret`;
    const encodedToken = Buffer.from(token).toString("base64");

    this.loginAxios.defaults.headers.common[
      "Content-Type"
    ] = `multipart/form-data`;
    this.loginAxios.defaults.headers.common[
      "Authorization"
    ] = `Basic ${encodedToken}`;

    return this.loginAxios;
  };

  // API 데이터 통신용
  apiInstance = () => {
    // 요청시 토큰 검증은 인터셉터에서 함
    this.apiAxios.interceptors.request.use(this.requestInterceptor);

    return this.apiAxios;
  };

  // // 리프레시 토큰 요청용
  // refreshTokenInstance = () => {
  //
  //   //TODO : 환경변수로 빼기 basic auth
  //   const token = `point-client:point-secret`;
  //   const encodedToken = Buffer.from(token).toString("base64");
  //
  //   const formData = new FormData();
  //   formData.append("grant_type", "password");
  //   formData.append("scope", "member");
  //   formData.append("username", `lee@apple.com`);
  //   formData.append("password", `Asd123@@`);
  //
  //   this.refreshAxios.defaults.headers.common[
  //     "Content-Type"
  //   ] = `multipart/form-data`;
  //   this.refreshAxios.defaults.headers.common[
  //     "Authorization"
  //   ] = `Basic ${encodedToken}`;
  //   // this.refreshAxios.defaults.data = formData; // 안됨
  //
  //   return this.refreshAxios;
  // };

  // 파일 서버용
  fileInstance = () => {
    return this.fileAxios;
  };

  requestInterceptor = async (
    config: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> => {
    // console.log(`call ${config}`);
    console.log("인터셉터");

    const accessToken = JsCookie.get("access_token");
    const refreshToken = JsCookie.get("refresh_token");

    const now_timestamp = new Date().getTime();

    console.log(`accessToken : ${accessToken}`);
    console.log(`refreshToken : ${refreshToken}`);

    let decodedAccessToken = null;
    let decodedRefreshToken = null;

    try {
      if (refreshToken != null) {
        decodedRefreshToken = jwtDecode<CustomJwtPayload>(refreshToken);
      }
    } catch (e) {}

    try {
      if (accessToken != null) {
        decodedAccessToken = jwtDecode<CustomJwtPayload>(accessToken);
      }
    } catch (e) {}

    // 리프레시 토큰이 없거나 토큰 디코딩에 실패하였거나 만료일이 지났을 때
    if (
      refreshToken == null ||
      decodedRefreshToken == null ||
      now_timestamp > decodedRefreshToken.exp * 1000 - 5000 // 통신시간고려 5초 마이너스
    ) {
      // 로그아웃 처리

      JsCookie.remove("access_token");
      JsCookie.remove("refresh_token");

      // location.replace("/sign/in");
      console.log(
        "리프레시 토큰이 없거나 토큰 디코딩에 실패하였거나 만료일이 지났을 때"
      );

      throw new axios.Cancel("인증이 만료되어 로그아웃 됩니다.");

      // 액세스 토큰이 없거나 토큰 디코딩에 실패하였거나 만료일이 지났을 때
    } else if (
      decodedAccessToken == null ||
      now_timestamp > decodedAccessToken.exp * 1000 - 5000 // 통신시간고려 5초 마이너스
    ) {
      // 리프레시 토큰으로 액세스 토큰 재발급

      const formData = new FormData();
      formData.append("grant_type", "refresh_token");
      formData.append("refresh_token", refreshToken);

      const refResult = await this.loginInstance()
        .post(CustomRoute.API.SIGN.IN, formData)
        .then((result: AxiosResponse<any>) => {
          console.log("재발급결과 성공");

          if (result.status == 200) {
            // 액세스 토큰
            JsCookie.set("access_token", result.data.access_token, {
              expires: undefined, // 브라우저 종료시 삭제
            });

            return 1;
          } else {
            console.log("재발급결과 실패");

            return 2;
          }
        })
        .catch((error: Error | AxiosError) => {
          console.log("재발급결과 실패");

          return 2;
        });

      if (refResult == 1) {
        // 재발급 성공 후 토큰 입력하고 리턴
        // 테스트해봐야함 (쿠키 저장되는 시간 때문에 못가져올 수 있음)
        const newAccessToken = JsCookie.get("access_token");

        config.headers = {
          Authorization: `Bearer ${newAccessToken}`,
        };

        return config;

        //
      } else {
        // 재발급 실패
        JsCookie.remove("access_token");
        JsCookie.remove("refresh_token");

        // location.replace("/sign/in");
        console.log(
          "액세스 토큰이 없거나 디코딩에 실패하였거나 만료일이 지났을 때 + 재발급 실패"
        );

        throw new axios.Cancel("인증이 만료되어 로그아웃 되었습니다.");
      }
    } else {
      // 토큰 문제 없이 정상처리
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      return config;
    }
    // } catch (e: any) {
    //   console.log(typeof e);
    //
    //   console.log(`에러메시지${e.message}`);
    //
    //   // 로그아웃 처리
    //
    //   JsCookie.remove("access_token");
    //   JsCookie.remove("refresh_token");
    //
    //   // location.replace("/sign/in");
    //   console.log("토큰디코드에러");
    //
    //   throw new axios.Cancel("인증에 실패하여 로그아웃 되었습니다.");
    // }
  };
}

export default new CustomAxios();
