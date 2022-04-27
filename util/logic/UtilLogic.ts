import axios, { AxiosError, Cancel } from "axios";

class UtilLogic {
  // 현재 미사용 20220407
  errorHandle = (error: Error | AxiosError | Cancel): boolean => {
    if (axios.isCancel(error)) {
      alert(error.message);
      location.href = "/";
      return false;
    } else if (axios.isAxiosError(error)) {
      return true;
    } else {
      console.log(error);
      alert("관리자에게 문의하세요.");
      return false;
    }

    // if (axios.isCancel(error)) {
    //     return new AxiosDTO(-999, error.message ?? "캔슬에러", null);
    // } else if (axios.isAxiosError(error)) {
    //     return new AxiosDTO(-999, error.message, null);
    // } {
    //     return func();
    //     // return new AxiosDTO(-400, `테스트중`, "데이터");
    // }

    // 액시오스 에러타입
    //https://github.com/axios/axios/issues/3612

    // axios.Cancel 타입일 경우
    // if (axios.isCancel(error)) {
    //     return new AxiosDTO(-999, error.message, null);
    // } else {
    //     return func();
    //     // return new AxiosDTO(-400, `테스트중`, "데이터");
    // }

    // if (error.response != null) {
    //     if (error.response.status == 403) {
    //         if (error.response.headers.jwttoken != null) {
    //             this.setJwtTokenInCookie(error.response.headers.jwttoken);
    //             return func();
    //         } else {
    //             return new AxiosDTO(
    //                 'Unauthorized',
    //                 '권한이 없거나 토큰이 만료되었습니다.\n로그인 페이지로 이동합니다.',
    //             );
    //         }
    //     } else if (error.response.status == 401) {
    //         return new AxiosDTO(
    //             'Unauthorized',
    //             '권한이 없거나 토큰이 만료되었습니다.\n로그인 페이지로 이동합니다.',
    //         );
    //     } else if (error.response.status == 400) {
    //         return new AxiosDTO(
    //             '400',
    //             `에러코드 : ${error.response.status}\n${error.response.data.message}\n관리자에게 문의하세요.`,
    //         );
    //     } else if (error.response.status == 500) {
    //         return new AxiosDTO(
    //             '500',
    //             `에러코드 : ${error.response.status}\n${error.response.data.message}\n관리자에게 문의하세요.`,
    //         );
    //     }
    //     return new AxiosDTO(
    //         'fail',
    //         `에러코드 : ${error.response.status}\n${error.response.data.message}\n관리자에게 문의하세요.`,
    //     );
    // } else {
    //     return new AxiosDTO('fail', `예외가 발생하였습니다. 관리자에게 문의하세요.`);
    // }
  };
}

export default new UtilLogic();
