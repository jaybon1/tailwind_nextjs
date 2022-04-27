import {action, makeObservable, observable} from "mobx";

export default class AuthStore {
  accessToken: string | null;
  nickName: string | null;

  constructor() {
    this.nickName = null;
    this.accessToken = null;

    makeObservable(this, {
      accessToken: observable,
      nickName: observable,
      setAccessToken: action,
      setNickName: action,
    });
  }

  setAccessToken = (token: string) => {
    this.accessToken = token;
  };
  setNickName = (nickName: string) => {
    this.nickName = nickName;
  };
}
