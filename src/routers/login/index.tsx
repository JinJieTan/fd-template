import React from 'react';
import Input from '../../components/input';
import Button from '../../components/button';
import './index.less';

//内存储存数据
interface data {
    tenant_code: string; //企业代码
    username: string; //用户名
    password: string; //密码
    verify_code?: number; //数字验证码
    [x: string]: any; //索引签名，允许添加额外属性
}

//返回的数据类型
interface resData {
    error_code: number;
    msg: string;
}

interface Props {
    readonly Name: string;
    readonly changeShowContent: () => void;
    readonly history?: any;
}

interface State {
    isRememberUsername: boolean;
    need_verification_code: boolean;
    error_tips: string;
    verification_code_src: string;
    common_tips: string;
}

class App extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        const res = localStorage.getItem('isRememberUsername');
        this.state = {
            isRememberUsername: res === null ? true : res === '1' ? true : false,
            need_verification_code: false,
            error_tips: '',
            verification_code_src: '',
            common_tips: '',
        };
        this.tenant_code_ref = React.createRef();
        this.username_ref = React.createRef();
        this.password_ref = React.createRef();
        this.verify_code_ref = React.createRef();
    }

    tenant_code_ref: any;
    username_ref: any;
    password_ref: any;
    verify_code_ref: any;

    data: data = {
        tenant_code: '',
        username: '',
        password: '',
        verification_code: 0,
    };

    //看是否需要记住密码，然后从localstorage中读取出username等 ref.current.setContent
    async componentDidMount() {
        const { isRememberUsername } = this.state;
        const tenant_code = localStorage.getItem('tenant_code');
        const username = localStorage.getItem('username');
        if (isRememberUsername && tenant_code && tenant_code.length && username && username.length) {
            this.data['tenant_code'] = tenant_code;
            this.data['username'] = username;
            this.tenant_code_ref.current.setContent(tenant_code);
            this.username_ref.current.setContent(username);
            this.password_ref.current.moveToEnd();
            const data = {
                tenant_code,
                username,
            };
            // const res = await need_verification_code(data, 'GET');
            // if (res && res.error_code === 0 && res.data && res.data.is_show_verify_code) {
            //   this.check_Need_verification_code();
            // }
            // } else {
            //   this.tenant_code_ref.current.moveToEnd();
        }
    }

    componentWillUnmount() {
        if (!this.state.isRememberUsername) {
            localStorage.removeItem('tenant_code');
            localStorage.removeItem('username');
        }
    }

    //统一通过此方法获取所有输入框的内容,并且储存在this属性data上
    changeValue = (key: string, value: string | number) => {
        this.data[key] = value;
    };

    //登录获取所有的数据,校验通过后才发送请求
    login = () => {
        this.props.history.push('/home');
    };

    //登录成功的处理
    handleRemeberInfo = (result: resData) => {
        const { tenant_code, username } = this.data;
        if (this.state.isRememberUsername) {
            localStorage.setItem('tenant_code', String(tenant_code));
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('tenant_code');
            localStorage.removeItem('username');
        }
    };

    //清空所有input的value
    clearAllValue = () => {
        // this.tenant_code_ref.current.setContent('');
        // this.username_ref.current.setContent('');
        this.password_ref.current.setContent('');
        this.verify_code_ref.current.setContent('');
        this.tenant_code_ref.current.closeErrorTip();
        this.username_ref.current.closeErrorTip();
        this.password_ref.current.closeErrorTip();
        this.verify_code_ref.current.closeErrorTip();
    };

    //检验所有输入框的内容,事务方式返回结果，如果有一个不符合，就返回失败，看情况是否检测verification_code
    checkValue = (): boolean => {
        const { need_verification_code } = this.state;
        let res = false;
        const res1 = this.tenant_code_ref.current.inspect();
        const res2 = this.username_ref.current.inspect();
        const res3 = this.password_ref.current.inspect();
        const res4 = need_verification_code && this.verify_code_ref.current.inspect();
        res = res1 && res2 && res3;
        if (need_verification_code) {
            res = res4;
        }
        return res;
    };

    //改变是否需要记住密码选项，使用localstorage存储
    changeRemberUsername = () => {
        if (this.state.isRememberUsername) {
            localStorage.removeItem('tenant_code');
            localStorage.removeItem('username');
        }
        localStorage.setItem('isRememberUsername', !this.state.isRememberUsername ? '1' : '0');
        this.setState({ isRememberUsername: !this.state.isRememberUsername });
    };

    render() {
        const {
            isRememberUsername,
            need_verification_code,
            error_tips,
            verification_code_src,
            common_tips,
        } = this.state;
        const { Name, changeShowContent } = this.props;
        return (
            <div className="container">
                <div className={Name === 'fade_in' ? 'login login_fade_in' : 'login login_fade_out'}>
                    <div className="login_title">账号登录</div>
                    <Input
                        label="企业代码"
                        tips="请输入企业代码"
                        changeValue={this.changeValue}
                        category={'tenant_code'}
                        ref={this.tenant_code_ref}
                        maxLength={30}
                    />
                    <Input
                        label="用户名"
                        tips="请输入用户名"
                        changeValue={this.changeValue}
                        category={'username'}
                        ref={this.username_ref}
                        maxLength={30}
                    />
                    <Input
                        label="密码"
                        tips="请输入密码"
                        type="password"
                        changeValue={this.changeValue}
                        category={'password'}
                        ref={this.password_ref}
                        maxLength={20}
                        needChangeType={true}
                        login={this.login}
                    />
                    <Input
                        label="图形验证码"
                        tips={'请输入图形验证码'}
                        changeValue={this.changeValue}
                        category={'verify_code'}
                        ref={this.verify_code_ref}
                        style={{ display: need_verification_code ? 'block' : 'none' }}
                        need_verification_code={need_verification_code}
                        maxLength={4}
                        verification_code_src={verification_code_src}
                        login={this.login}
                    />
                    <div>{common_tips}</div>
                    <div
                        className="options"
                        onMouseDown={e => {
                            e.preventDefault();
                        }}
                    >
                        <div
                            className="options-left-container"
                            onClick={() => {
                                this.changeRemberUsername();
                            }}
                        >
                            {isRememberUsername ? (
                                <span className="remeber_password iconfont">&#xe67b;</span>
                            ) : (
                                <span className="not_remeber_password iconfont">&#xe67c;</span>
                            )}
                            <span>记住账号</span>
                        </div>
                        <div className="options-right-container" onClick={changeShowContent}>
                            <span className="forget_options">忘记密码</span>
                        </div>
                    </div>
                    <Button text="登录" isNormal={true} onClick={this.login} />
                </div>
            </div>
        );
    }
}
export default App;
