"use strict";

import {
  default as React,
  Component,
} from 'react';

import rounded from '../utils/rounded';

export default class BarRectangle extends Component {
  constructor(props) {
    super(props);
  }

  static PropTypes = {
    cornerRadius: React.PropTypes.shape({
      topLeft: React.PropTypes.number,
      bottomLeft: React.PropTypes.number,
      topRight: React.PropTypes.number,
      bottomRight: React.PropTypes.number
    })
  }

  static defaultProps = {
    cornerRadius: {
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0
    }
  }

  triggerOver(data, e) {
    this.props.onMouseOver(e, data)
  }

  triggerOut(data, e) {
    this.props.onMouseOut(e, data)
  }

  triggerClick(data, e) {
    this.props.onClick(e, data);
  }

  render() {
    const {
      barClassName,
      style,
      fill,
      height,
      width,
      x,
      y,
      data
    } = this.props;
    const that = this;
    return <g>
      <path
        className={`${barClassName} bar`}
        style={style}
        fill={fill}
        onMouseOut={that.triggerOut.bind(this, data)}
        onMouseOver={that.triggerOver.bind(this, data)}
        onClick={that.triggerClick.bind(this, data)}
        d={rounded(x, y, width, height, this.props.cornerRadius)}
      />
    </g>;
  }
}
