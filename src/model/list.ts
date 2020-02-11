interface state {
    list: Array<string>;
}

interface listPayload {
    type: string;
    data?: Array<string>; //在dva中，这不是必要参数
}
//这是一个list示例模块，仅作为参考
export default {
    namespace: 'list',
    state: {
        list: ['吃饭', '睡觉', '打豆豆'],
    },
    reducers: {
        //为了做示例而已,所以写了两个，方便观看演示
        add(state: state, payload: listPayload) {
            console.log(payload);
            return {
                ...state,
                list: payload.data,
            };
        },
        del(state: state, payload: listPayload) {
            return {
                ...state,
                list: payload.data,
            };
        },
    },
};
