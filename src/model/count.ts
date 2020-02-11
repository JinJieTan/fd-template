interface state {
    data: number;
    init: string;
}

interface countPayload {
    type: string;
    data?: number; //不是必要参数
}
//这是一个count示例模块，仅作为参考
export default {
    namespace: 'count',
    state: {
        count: 1,
        init: '2',
    },
    reducers: {
        //为了做示例而已,所以写了两个，方便观看演示
        add(state: state, payload: countPayload) {
            return {
                ...state,
                count: payload.data,
            };
        },
        del(state: state, payload: countPayload) {
            return {
                ...state,
                count: payload.data,
            };
        },
    },
};
