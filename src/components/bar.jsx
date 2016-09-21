"use strict";

import {
  default as React,
  Component,
} from 'react';

import BarRectangle from './bar_rectangle';

import { series } from '../utils/series';

export default class Bar extends Component {
  constructor(props) {
    super(props);
    this.barRadius = {
      topLeft: 3,
      topRight: 3,
      bottomLeft: 0,
      bottomRight: 0
    }
  }

  static defaultProps = {
    onMouseOver: (d) => {},
    onMouseOut: (d) => {},
    onClick: (d) => {},
    barClassName: 'react-d3-basic__bar'
  }

  _mkBar() {
    const {
      height,
      width,
      barClassName,
      xScaleSet,
      yScaleSet,
      rounded
    } = this.props;

    const that = this;
    var dataset = series(this.props)[0];
    var domain = yScaleSet.domain();
    var zeroBase;

    if (domain[0] * domain[1] < 0) {
      zeroBase = yScaleSet(0);
    } else if (((domain[0] * domain[1]) >= 0) && (domain[0] >= 0)) {
      zeroBase = yScaleSet.range()[0];
    } else if (((domain[0] * domain[1]) >= 0) && (domain[0] < 0)) {
      zeroBase = yScaleSet.range()[1];
    }

    return (
      <g>
        {
          dataset.data.map((bar, i) => {
            return <BarRectangle
              barClassName={barClassName}
              x={xScaleSet(bar.x) || xScaleSet(bar.x) === 0? xScaleSet(bar.x) : -10000}
              y={bar.y < 0 ? zeroBase: yScaleSet(bar.y)}
              width={xScaleSet.bandwidth()}
              height={bar.y < domain[0] ? 0: Math.abs(zeroBase - yScaleSet(bar.y))}
              fill={bar._style.color? bar._style.color: dataset.color}
              style={Object.assign({}, dataset.style, bar._style)}
              key={i}
              onMouseOut={this.props.onMouseOut}
              onMouseOver={this.props.onMouseOver}
              onClick={this.props.onClick}
              cornerRadius={rounded?this.barRadius:{}}
              data={bar}
            />;
          })
        }
      </g>
    );
  }

  render() {
    var bar = this._mkBar();

    return (
      <g>
        {bar}
      </g>
    );
  }
}
