import React from 'react';
import './index.less';
interface Props {
  onClick: () => void;
  text: string;
  isNormal: boolean;
}

class App extends React.PureComponent<Props> {
  render() {
    const { text, onClick, isNormal } = this.props;
    return (
      <div onClick={onClick} className={isNormal ? 'button_normal' : 'button_return'}>
        {text}
      </div>
    );
  }
}

export default function Button(props: Props) {
  return <App {...props} />;
}
