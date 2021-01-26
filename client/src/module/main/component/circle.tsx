import React from 'react';

interface State {
  showMenu: boolean;
}

class Circle extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  render() {
    const { showMenu } = this.state;
    return (
      <nav className="suspend-nav-wrap" style={{ display: showMenu ? 'block' : 'none' }}>
        <div className="suspend-nav">菜单</div>
        <ul className="nav-wrap">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </nav>
    );
  }
}

export default Circle;
