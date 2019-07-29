import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Resizable extends PureComponent {
  static propTypes = {
    WrappedComponent: PropTypes.instanceOf(PureComponent),
    handlers: PropTypes.array,
    minSize: PropTypes.object,
    isVisible: PropTypes.bool
  };

  constructor (props) {
    super(props);
    this.state = {
      ...this.props.initialSize
    };
    this.resizableRef = React.createRef();
    this.handlerStyles = {
      e: {
        background: 'transparent',
        position: 'absolute',
        width: '10px',
        height: '100%',
        top: '0px',
        right: '0px',
        cursor: 'e-resize'
      },
      s: {
        background: 'transparent',
        position: 'absolute',
        width: '100%',
        height: '10px',
        bottom: '0px',
        left: '0px',
        cursor: 's-resize'
      },
      se: {
        background: 'transparent',
        position: 'absolute',
        width: '10px',
        height: '10px',
        bottom: '0px',
        right: '0px',
        cursor: 'se-resize'
      },
      w: {
        background: 'transparent',
        position: 'absolute',
        width: '10px',
        height: '100%',
        top: '0px',
        left: '0px',
        cursor: 'w-resize'
      }
    };
  }

  mouseDown = (handle, event) => {
    event.preventDefault();
    const clientPos = {
      x: event.clientX,
      y: event.clientY
    };
    const initialSize = {
      width: this.state.width,
      height: this.state.height
    };
    const parentSize = {
      width: document.getElementById(this.props.targetId).offsetWidth,
      height: document.getElementById(this.props.targetId).offsetHeight
    };
    this.bindedMouseMove = this.mouseMove.bind(this, handle, clientPos, initialSize, parentSize);
    document.body.classList.add('notransition');
    document.addEventListener('mousemove', this.bindedMouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  mouseUp = () => {
    document.removeEventListener('mousemove', this.bindedMouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
    document.body.classList.remove('notransition');
    this.props.debouncingFunction(this.state.width, this.state.height);
  }

  moveHandleE (event, initialPos, initialSize, parentSize) {
    let newWidth = initialSize.width + (event.clientX - initialPos.x);
    if (newWidth >= this.props.minSize.minWidth && (newWidth <= parentSize.width)) {
      if (Math.abs(newWidth - parentSize.width) <= 10) {
        this.setState({
          width: parentSize.width
        });
      } else {
        this.setState({
          width: newWidth
        });
      }
    }
  }

  moveHandleS (event, initialPos, initialSize, parentSize) {
    let newHeight = initialSize.height + (event.clientY - initialPos.y);
    if (newHeight >= this.props.minSize.minHeight) {
      this.setState({
        height: newHeight
      });
    }
  }

  moveHandleSE (event, initialPos, initialSize, parentSize) {
    this.moveHandleE(event, initialPos, initialSize, parentSize);
    this.moveHandleS(event, initialPos, initialSize, parentSize);
  }

  moveHandleW (event, initialPos, initialSize, parentSize) {
    let newWidth = initialSize.width - (event.clientX - initialPos.x);
    if (newWidth >= this.props.minSize.minWidth && newWidth <= parentSize.width) {
      if (Math.abs(newWidth - parentSize.width) <= 10) {
        this.setState({
          width: parentSize.width
        });
      } else {
        this.setState({
          width: newWidth
        });
      }
    }
  }

  mouseMove (handle, initialPos, initialSize, parentSize, event) {
    switch (handle) {
      case 'e': {
        this.moveHandleE(event, initialPos, initialSize, parentSize);
        break;
      }
      case 's': {
        this.moveHandleS(event, initialPos, initialSize, parentSize);
        break;
      }
      case 'se': {
        this.moveHandleSE(event, initialPos, initialSize, parentSize);
        break;
      }
      case 'w': {
        this.moveHandleW(event, initialPos, initialSize, parentSize);
        break;
      }
      default: {}
    }
  }

  handlerElements = () => {
    return this.props.handlers.map((handler) =>
      <div key={handler} style={this.handlerStyles[handler]}
        onMouseDown={this.mouseDown.bind(this, handler)} />
    );
  }

  render () {
    return (
      <div ref={this.resizableRef} className={this.props.className} style={{
        width: this.props.isVisible === true ? this.state.width : 0,
        height: this.state.height,
        ...this.props.styles
      }}>
        <div style={{
          width: this.state.width,
          height: this.state.height
        }}>
          {this.props.children}
          {this.handlerElements()}
        </div>
      </div>
    );
  }
}
