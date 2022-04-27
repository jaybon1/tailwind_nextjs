import {action, makeObservable, observable} from "mobx";
import TempDTO from "@/store/temp/TempDTO";
import lodash from "lodash";
import axios, {AxiosResponse} from "axios";
import AxiosDTO from "@/util/axios/AxiosDTO";
import {Builder} from "builder-pattern";
import {RootStore} from "@/store/StoreContext";

export default class TempStore{
    rootStore : RootStore;
    state : Boolean;
    tempDTO : TempDTO | null;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.state = false;
        this.tempDTO = null;

        makeObservable(this, {
            state:observable,
            tempDTO:observable,
            setState:action,
            setTempDTO:action

        });
    }

    setState = () =>{
        this.state = !this.state;
    }

    setTempDTO = (tempDTO : TempDTO | null) =>{
        this.tempDTO = lodash.cloneDeep(tempDTO);
    }

    getTempDTO =  (id : number) => {
          return axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`)
            .then((res: AxiosResponse<TempDTO>)=>{
                this.setTempDTO(res.data);
                return Builder<AxiosDTO<null>>().code(0).build();
            })
            .catch((err)=>{
                return Builder<AxiosDTO<null>>().code(1).build();
            });

    }

}