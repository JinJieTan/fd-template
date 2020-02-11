import React from 'react';
import './index.less';

//封装通用的input输入框组件模块

interface Props {
  readonly label: string;
  readonly tips: string;
  readonly type?: string;
  readonly changeValue: (key: string, value: string | number) => void;
  readonly category: string;
  readonly ref?: any;
  readonly style?: object;
  readonly needTips?: boolean;
  readonly needChangeType?: boolean;
  readonly need_verification_code?: boolean;
  readonly maxLength: number;
  readonly login?: () => void;
  readonly verification_code_src?: string;
  readonly update_verification_code_src?: () => Promise<void>;
  readonly textIndex?: number; //这里需要判断当前页面是否login首页再确定能不能tab切换输入框
  readonly get_sms_code?: () => void; //获取手机短信验证码
}

interface State {
  isFocus: boolean;
  content: string;
  isText: boolean;
  isShowTips: boolean;
  TipType: number;
  error_tips: string;
}

export default class Input extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isFocus: false,
      content: '',
      isText: this.props.type ? true : false,
      isShowTips: false,
      TipType: 1,
      error_tips: this.props.tips,
    };
    this.TipType = 1;
  }

  ref: any;
  TipType: number;

  onFocus = () => {
    this.setState({
      isFocus: true,
    });
  };

  onBlur = () => {
    this.setState({
      isFocus: false,
    });
  };

  //input变化处理
  onChange = (e: any) => {
    const pattern = new RegExp(
      "[`~!@#$^&*()=|{}':;'./,\\[\\]<>/?~！@#￥……&*（）——|{}\\- + _  %   【】‘；：”“'。，、？]",
    );
    const Chinese = new RegExp(/[\u4E00-\u9FA5\\s]/);
    //除了是密码和手机号码输入,其他都不能输入特殊字符
    if (!this.props.type && this.props.category !== 'phone' && pattern.test(e.target.value)) {
      e.target.value = '';
      this.setState({
        error_tips: '只能输入字母大小写和数字',
        isShowTips: true,
      });
      return false;
    }
    //手机号码的检测
    if (this.props.category === 'phone') {
      const reg = new RegExp(/^1[3456789]\d{9}$/);
      const pattern = new RegExp(
        "[`~!@#$^&*()=|{}':;'./,\\[\\]<>/?~！@#￥……&*（）——|{}\\- + _  %   【】‘；：”“'。，、？]",
      );
      const alphabet = new RegExp(/[a-zA-Z]+/);
      if (pattern.test(e.target.value) || alphabet.test(e.target.value)) {
        e.target.value = '';
        this.setState({
          error_tips: '请输入11位的手机号码',
          isShowTips: true,
        });
        return false;
      } else if (reg.test(e.target.value)) {
        this.setState({
          isShowTips: false,
        });
      } else {
        this.setErrorTip('手机号码格式不正确');
      }
      //把数据key-value形式存储在父组件
      this.setState({
        content: e.target.value,
      });
      this.props.changeValue(this.props.category, e.target.value);
      return;
    }
    //把数据key-value形式存储在父组件
    this.props.changeValue(this.props.category, e.target.value);

    //每次输入内容就关闭错误提示
    const { isShowTips } = this.state;
    if (isShowTips) {
      this.setState({
        isShowTips: false,
      });
    }

    this.setState({
      content: e.target.value,
    });

    const { needTips } = this.props;
    if (!needTips) {
      return;
    }
    //密码强度显示控制
    // this.TipType: number = 1;

    if (e.target.value.trim().length < 8) {
      this.TipType = 1;
      this.setErrorTip('密码长度不能小于8位');
    } else if (
      /^[0-9]+$/.test(e.target.value) ||
      /^[a-zA-Z]+$/.test(e.target.value) ||
      /^[.~!@#$%\^\+\*&\\\/\?\|:\.{}()';="]+$/.test(e.target.value)
    ) {
      this.TipType = 1;
      this.setErrorTip('密码长度必须包含英文、数字或特殊字符任意两种');
    } else if (/[a-z]/.test(e.target.value) && /[A-Z]/.test(e.target.value) && /[0-9]/.test(e.target.value)) {
      this.TipType = 3;
    } else if (
      /(?=[\x21-\x7e]+)[^A-Za-z0-9]/.test(e.target.value) &&
      e.target.value.length >= 8 &&
      /^(?![^0-9]+$)(?![^a-zA-Z]+$).+$/.test(e.target.value)
    ) {
      this.TipType = 3;
    } else {
      this.TipType = 2;
    }

    this.setState({
      TipType: this.TipType,
    });
  };

  //给当前输入框设置内容，通过ref.current.seContent提供父组件调用
  setContent = (content: string) => {
    this.setState({
      content,
    });
  };

  //改变当前输入框的类型
  changeInputType = () => {
    if (this.ref.current.type === 'password') {
      this.ref.current.type = 'text';
    } else {
      this.ref.current.type = 'password';
    }
    const { isText } = this.state;
    this.setState({
      isText: !isText,
    });
    this.moveToEnd();
  };

  //光标移动到最后
  moveToEnd = () => {
    this.ref.current.blur();
    this.ref.current.focus();
  };

  //检验当前的输入框数据是否为空，或者符合预期,展示对应的提示
  inspect = () => {
    if (this.state.content.length === 0 || (this.state.content && this.state.content.trim().length === 0)) {
      this.setState({
        isShowTips: true,
      });
      return false;
    }
    //如果是手机号码，不止要验证长度，还有格式
    if (this.props.category === 'phone' && !/^1[3456789]\d{9}$/.test(this.state.content)) {
      this.setErrorTip('手机号码格式不正确');
      return false;
    }
    if (this.props.category === 'new_password') {
      if (this.state.content.length < 8) {
        this.setErrorTip('密码长度不能小于8位');
        return false;
      } else if (
        /^[0-9]+$/.test(this.state.content) ||
        /^[a-zA-Z]+$/.test(this.state.content) ||
        /^[.~!@#$%\^\+\*&\\\/\?\|:\.{}()';="]+$/.test(this.state.content)
      ) {
        this.setErrorTip('密码长度必须包含英文、数字或特殊字符任意两种');
        return false;
      }
    }
    this.setState({
      isShowTips: false,
    });
    return true;
  };

  //设置input的value
  setValue = (content: string) => {
    this.setState({
      content,
    });
  };

  //设置error提示语
  setErrorTip = (error: string) => {
    this.setState({
      error_tips: error,
      isShowTips: true,
    });
  };

  //关闭error提示语
  closeErrorTip = () => {
    this.setState({
      isShowTips: false,
    });
  };

  onKeyUp = (e: any) => {
    if (
      (e.nativeEvent.keyCode === 13 && this.props.category === 'password') ||
      (e.nativeEvent.keyCode === 13 && this.props.category === 'verify_code')
    ) {
      this.props.login && this.props.login();
    }
  };

  render() {
    const {
      label,
      type,
      style,
      needTips,
      needChangeType,
      maxLength,
      verification_code_src,
      textIndex,
      get_sms_code,
      category,
    } = this.props;

    const { isFocus, content, isText, isShowTips, TipType, error_tips } = this.state;

    return (
      <div className="input_container" style={style}>
        <div className={!isFocus && content.length === 0 ? 'blur_font' : 'focus_font'}>{label}</div>
        {type !== 'password' || !needChangeType ? null : isText ? (
          <span className="iconfont changeInputType" onClick={this.changeInputType}>
            &#xe679;
          </span>
        ) : (
          <span className="iconfont  changeInputType" onClick={this.changeInputType}>
            &#xe67a;
          </span>
        )}
        <div
          className="get_sms_container"
          onClick={get_sms_code}
          style={category === 'sms_code' ? { display: 'block' } : { display: 'none' }}
        >
          <span>点击获取</span>
        </div>
        <input
          className="login_input"
          type={type || 'text'}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          ref={this.ref}
          value={content}
          maxLength={maxLength}
          onKeyUp={this.onKeyUp}
          tabIndex={textIndex ? textIndex : 0}
        />
        <div
          style={verification_code_src ? { display: 'block' } : { display: 'none' }}
          className="verification_code_container"
          onClick={this.props.update_verification_code_src}
        >
          <img src={verification_code_src} alt="验证码" />
        </div>
        <div className="input_hr-container">
          <hr className="normal_hr" />
          <hr className={isFocus ? 'focus_hr-focus' : 'focus_hr'} />
        </div>
        <div className="login_tips_container">
          <span className="login_tips" style={{ opacity: isShowTips ? 1 : 0 }}>
            {error_tips}
          </span>
        </div>
        {needTips ? (
          <div className="password_safe">
            <div className="password_safe_tips">密码强度</div>
            <div className="password_safe_bar_container">
              {[1, 2, 3].map((item, index) => {
                return (
                  <div
                    key={index}
                    className={item <= TipType ? `bar highlight_bar${TipType}` : `bar normal_bar${index + 1}`}
                  ></div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
