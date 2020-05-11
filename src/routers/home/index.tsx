import React, { Fragment } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import './index.less';
interface Props {
    history: any;
    readonly count: number;
    dispatch: Function;
    list: string[];
}
class App extends React.PureComponent<Props> {
    public componentDidMount() {
        console.log(this.props);
    }
    public render() {
        const { count } = this.props;
        return (
            <div className="home_container">
                <Button
                    onClick={() => {
                        const data = count + 1;
                        this.props.dispatch({
                            type: 'count/add',
                            data,
                        });
                    }}
                    type="primary"
                >
                    增加数量
                </Button>
                <br />
                <br />
                <Button
                    onClick={() => {
                        const data = count - 1;
                        this.props.dispatch({
                            type: 'count/del',
                            data,
                        });
                    }}
                    type="primary"
                >
                    减少数量
                </Button>
                <br />
                <br />
                <h1 className="count">{count}</h1>
                <Button
                    onClick={() => {
                        // this.props.history.replace('/init');
                        window.location.href = 'http://www.baidu.com';
                    }}
                >
                    返回初始界面
                </Button>
            </div>
        );
    }
}

export default connect((state: any) => {
    return {
        count: state.count.count,
    };
})(App);
