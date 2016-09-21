"use strict";

import {
  default as React,
  Component,
} from 'react';

import D3Scale from 'd3-scale';
import {series} from '../utils/series';
import BarRectangle from './bar_rectangle';

export default class BarGroup extends Component {
  constructor (props) {
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
    barClassName: 'react-d3-basic__bar_group'
  }

  _mkBarGroup(dom) {
    const {
      height,
      margins,
      barClassName,
      xScaleSet,
      yScaleSet,
      rounded
    } = this.props;

    const that = this
    var dataset = series(this.props);
    var x1 = D3Scale.scaleBand();

    // mapping x1, inner x axis
    x1.domain(dataset.map((d) => { return d.field}))
      .range([0, xScaleSet.bandwidth()])
      .padding(.1)
      .round(true)

    var domain = yScaleSet.domain();
    var zeroBase;

    if (domain[0] * domain[1] < 0) {
      zeroBase = yScaleSet(0);
    } else if (((domain[0] * domain[1]) >= 0) && (domain[0] >= 0)){
      zeroBase = yScaleSet.range()[0];
    } else if (((domain[0] * domain[1]) >= 0) && (domain[0] < 0)){
      zeroBase = yScaleSet.range()[1];
    }


    return (
      dataset.map((barGroup, i) => {
        return (
          <g className="bargroup" key={i}>
            {
              barGroup.data.map((bar, j) => {
                return (
                  <BarRectangle
                    key={j}
                    barClassName={barClassName}
                    width={x1.bandwidth()}
                    x={xScaleSet(bar.x) || xScaleSet(bar.x) === 0? (xScaleSet(bar.x) + x1.bandwidth() * i) : -10000}
                    y={bar.y < 0 ? zeroBase: yScaleSet(bar.y)}
                    height={bar.y < domain[0] ? 0: Math.abs(zeroBase - yScaleSet(bar.y))}
                    fill={barGroup.color}
                    style={barGroup.style}
                    onMouseOut={this.props.onMouseOut}
                    onMouseOver={this.props.onMouseOver}
                    onClick={this.props.onClick}
                    cornerRadius={rounded?this.barRadius:{}}
                    data={bar}
                  />
                )
              })
            }
          </g>
        )
      })
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
