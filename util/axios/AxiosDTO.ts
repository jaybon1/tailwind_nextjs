// 액시오스 통신 결과를 store 에서 page로 전달하기 위한 DTO
export default interface AxiosDTO<T> {
    code: number;
    message: string;
    data: T;
}


// export default class AxiosDTO<T> {
//     code: number;
//     message: string;
//     data: T;
//
//     constructor(code: number, message: string, data: T) {
//         this.code = code;
//         this.message = message;
//         this.data = data;
//     }
// }