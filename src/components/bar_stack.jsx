"use strict";

import {
  default as React,
  Component,
} from 'react';

import d3 from 'd3';
import { series } from '../utils/series';
import BarRectangle from './bar_rectangle';

export default class BarStack extends Component {
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
    barClassName: 'react-d3-basic__bar_stack'
  }

  _mkBarStack() {
    const {
      height,
      margins,
      barClassName,
      xScaleSet,
      yScaleSet,
      barWidth,
      rounded
    } = this.props;

    const that = this;
    var dataset = series(this.props);
    const _setStack = this._setStack();

    var domain = yScaleSet.domain();
    var zeroBase;
    var barBandWidth;

    if (domain[0] * domain[1] < 0) {
      zeroBase = yScaleSet(0);
    } else if (((domain[0] * domain[1]) >= 0) && (domain[0] >= 0)) {
      zeroBase = yScaleSet.range()[0];
    } else if (((domain[0] * domain[1]) >= 0) && (domain[0] < 0)) {
      zeroBase = yScaleSet.range()[1];
    }

    // user defined barwidth
    if(barWidth) {
      barBandWidth = barWidth;
    }
    else {
      barBandWidth = xScaleSet.bandwidth();
    }

    return (
      <g>
        {
          _setStack(dataset).map((barGroup, i) => {
            return (
              <g
                key={i}
                className="barGroup"
                fill={barGroup.color}
                style={barGroup.style}>
                {
                  barGroup.data.map((bar, j) => {
                    return (
                      <BarRectangle
                        barClassName={barClassName}
                        width={barBandWidth}
                        x={xScaleSet(bar.x) || xScaleSet(bar.x) === 0? xScaleSet(bar.x): -10000}
                        y={yScaleSet(bar.y0 + bar.y)}
                        height={Math.abs(yScaleSet(bar.y) - yScaleSet(0))}
                        onMouseOut={this.props.onMouseOut}
                        onMouseOver={this.props.onMouseOver}
                        onClick={this.props.onClick}
                        key={j}
                        data={bar}
                        cornerRadius={rounded?this.barRadius:{}}
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

  _setStack() {
    const {
      chartSeries
    } = this.props;

    var buildOut = function(len) {
      // baseline for positive and negative bars respectively.
      var currentXOffsets = [];
      var currentXIndex = 0;
      return function(d, y0, y) {

        if (currentXIndex++ % len === 0) {
          currentXOffsets = [0, 0];
        }

        if (y >= 0) {
          d.y0 = currentXOffsets[1];
          d.y = y;
          currentXOffsets[1] += y;
        } else {
          d.y0 = currentXOffsets[0] + y;
          d.y = -y;
          currentXOffsets[0] += y;
        }
      }
    }
    return d3.layout.stack()
      .values((d) => {
        return d.data;
      })
      .out(buildOut(chartSeries.length));

  }

  render() {
    var bar = this._mkBarStack();

    return (
      <g>
        {bar}
      </g>
    )
  }
}
