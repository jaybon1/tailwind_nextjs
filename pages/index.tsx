import type {NextPage} from 'next'
import {useEffect, useState} from "react";
import {useTempStore} from "@/store/StoreContext";
import {observer} from "mobx-react";
import testStyle from "@/styles/Test.module.scss";

const Home: NextPage = () => {

    const [id, setId] = useState(1);

    const tempStore = useTempStore();

    const getTempDTO = async () => {
        const axiosDTO = await tempStore.getTempDTO(id);
        if (axiosDTO.code == 0){
            console.log("정상");
        } else if (axiosDTO.code == 1) {
            alert("콘솔을 확인하세요.");
        }
    }

    useEffect(() => {
        getTempDTO();
    }, [id]);

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <div className={testStyle.aaa}>모듈테스트</div>
            {
                tempStore.tempDTO == null
                    ? <button>[<span>로딩 중</span>]</button>
                    : <button onClick={() => {
                        tempStore.setTempDTO(null);
                        setId(id + 1);
                    }}>[다음]</button>
            }
            {
                tempStore.tempDTO == null
                    ? <div className="w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent"/>
                    : <div>{JSON.stringify(tempStore.tempDTO)}</div>
            }

        </div>
    )
}

export default observer(Home);
