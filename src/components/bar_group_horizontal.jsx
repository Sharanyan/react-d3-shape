"use strict";

import {
  default as React,
  Component,
} from 'react';

import D3Scale from 'd3-scale';
import { series } from '../utils/series';
import BarRectangle from './bar_rectangle';

export default class BarGroupHorizontal extends Component {
  constructor(props) {
    super(props);
    this.barRadius = {
      topLeft: 0,
      topRight: 3,
      bottomLeft: 0,
      bottomRight: 3
    }
  }

  static defaultProps = {
    onMouseOver: (d) => {},
    onMouseOut: (d) => {},
    onClick: (d) => {},
    barClassName: 'react-d3-basic__bar_group_horizontal'
  }

  _mkBarGroup() {
    const {
      height,
      margins,
      barClassName,
      xScaleSet,
      yScaleSet,
      onMouseOut,
      onMouseOver,
      rounded
    } = this.props;

    const that = this
    var dataset = series(this.props, true);
    var y1 = D3Scale.scaleBand();

    // mapping x1, inner x axis
    y1.domain(dataset.map((d) => {
        return d.field }))
      .range([0, yScaleSet.bandwidth()])
      .padding(.1)
      .round(true)

    var domain = xScaleSet.domain();
    var zeroBase;

    if (domain[0] * domain[1] < 0) {
      zeroBase = xScaleSet(0);
    } else if (((domain[0] * domain[1]) >= 0) && (domain[0] >= 0)) {
      zeroBase = xScaleSet.range()[0];
    } else if (((domain[0] * domain[1]) >= 0) && (domain[0] < 0)) {
      zeroBase = xScaleSet.range()[1];
    }

    return (
      <g>
        {
          dataset.map((barGroup, i) => {
            return (
              <g className="bargroup" key={i}>
                {
                  barGroup.data.map((bar, j) => {
                    return(
                      <BarRectangle
                        barClassName={barClassName}
                        height={y1.bandwidth()}
                        y={yScaleSet(bar.y) || yScaleSet(bar.y) === 0? (yScaleSet(bar.y) + y1.bandwidth() * i) : -10000}
                        x={bar.x > 0 ? zeroBase: (zeroBase - Math.abs(zeroBase - xScaleSet(bar.x)))}
                        width={bar.x < domain[0] ? 0: Math.abs(zeroBase - xScaleSet(bar.x))}
                        fill={barGroup.color}
                        onMouseOut={this.props.onMouseOut}
                        onMouseOver={this.props.onMouseOver}
                        onClick={this.props.onClick}
                        style={barGroup.style}
                        key={j}
                        cornerRadius={rounded?this.barRadius:{}}
                        data={bar}
                        />
                    )
                  })
                }
              </g>
            )
          })
        }
      </g>
    )
  }

  render() {
    var bar = this._mkBarGroup();

    return (
      <g>
        {bar}
      </g>
    )
  }
}
