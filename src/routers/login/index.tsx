import React from 'react';
import Button from '../../components/button';
import './index.less';

interface Props {
    readonly Name: string;
    readonly changeShowContent: () => void;
    readonly history?: any;
}
class App extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    // 登录获取所有的数据,校验通过后才发送请求
    public login = () => {
        this.props.history.push('/home');
    };

    public render() {
        return (
            <div className="container">
                <div className={'login login_fade_in'}>
                    <div className="login_title">欢迎来到明源云空间-通用脚手架</div>
                    <Button text="进入Todo示例" isNormal={true} onClick={this.login} />
                </div>
            </div>
        );
    }
}
export default App;
