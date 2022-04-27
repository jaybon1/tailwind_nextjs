import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import jwtDecode from "jwt-decode";
import CustomJwtPayload from "@/util/jwt/CustomJwtPayload";

// 리프레시 토큰 관리를 위한 미들웨어 제작
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // 스태틱파일 구분을 위한 정규표현식
  const PUBLIC_FILE = /\.(.*)$/;

  const { origin, pathname } = req.nextUrl;

  // 스태틱파일이 아니거나 로그인 관련 주소가 아니면 조건실행
  if (!PUBLIC_FILE.test(pathname) && !pathname.includes("/sign")) {
    console.log(req.nextUrl);

    const refreshToken = req.cookies["refresh_token"];
    const nowTimestamp = new Date().getTime();

    // 만료일 초기화
    let exp = -1;

    // 디코딩하여 만료일 체크
    try {
      exp = jwtDecode<CustomJwtPayload>(refreshToken).exp * 1000;
    } catch (e) {
      // 토큰이 디코딩 되지 않으면 로그인 페이지로 이동
      return NextResponse.redirect(`${origin}/sign/in`);
    }

    // 만료되었으면 로그인 페이지로 이동
    if (exp < nowTimestamp) {
      return NextResponse.redirect(`${origin}/sign/in`);
    }
  }
}
