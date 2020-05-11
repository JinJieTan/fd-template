import React from 'react';
import './index.less';
interface Props {
    /** 点击回调 */
    onClick: () => void;
    /** 按钮内容 */
    text: string;
    /** 按钮内容 */
    isNormal?: boolean;
}

export default class Button extends React.PureComponent<Props> {
    public render() {
        const { text, onClick, isNormal } = this.props;
        return (
            <div onClick={onClick} className={isNormal ? 'button_normal' : 'button_return'}>
                {text}
            </div>
        );
    }
}
