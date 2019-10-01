import { axisBottom as d3AxisBottom } from 'd3-axis';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import 'd3-transition';

/**
 * Make a data structure to hold a progress bar with markers
 * @return {progressChart}
 */
export default function () {
  let data = {};
  let width = 960;
  let height = 100;
  let graphMargins = { top: 10, right: 5, bottom: 30, left: 15 }; // Absolute margins
  let graphWidth = function () { return width - graphMargins.left - graphMargins.right; };
  let graphHeight = function () { return height - graphMargins.top - graphMargins.bottom; };
  let marginW = 0.1;
  let marginH = 0.1;

  let ticksValues = [0, 0.25, 0.50, 0.75, 1];

  // For each small multiple…
  function progressCVS (svgitem) {

    // This wrapper contains the graph and the axis
    let wrap = svgitem
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('class', 'progress-cvs')
      .attr('transform', `translate(${graphMargins.left},0)`);

    // This is just the graph without axis
    let extentX = graphWidth() * (1 - marginW * 2);
    let extentY = graphHeight() * (1 - marginH * 2);
    let graphWrap = wrap
      .append('g')
      .attr('width', extentX)
      .attr('height', extentY);

    // Scales
    const scaleX = d3ScaleLinear()
      .domain([0, 1])
      .range([0, extentX]);

    // Draw xscale (tick 0.25)

    let markervalues = data.markers.map(function (d) {
      return d.value;
    });

    const tickFormat = function (val) {return Math.round(val * 100);};
    const tickSize = graphMargins.bottom/3;

    // Add both axes
    const axismarker = wrap.append('g').attr('class', 'axismarker');
    axismarker.attr('transform', `translate(0,${extentY})`).call(
      d3AxisBottom(scaleX)
        .tickValues(markervalues.sort())
        .tickFormat(tickFormat)
        .tickSize(tickSize)
    );

    const axisgraph = wrap.append('g').attr('class', 'axisgraph');
    axisgraph.attr('transform', `translate(0,${extentY})`).call(
      d3AxisBottom(scaleX)
        .tickValues(ticksValues)
        .tickFormat(tickFormat)
        .tickSize(tickSize)
    );
    // Fixup style
    axisgraph.select('.domain').remove();
    axismarker.select('.domain').remove();
    axisgraph.attr('font-size', tickSize); // 80% of the margin
    axismarker.attr('font-size', tickSize); // 80% of the margin

    // Draw grey background
    graphWrap.append('rect')
      .attr('class', 'background-bar')
      .attr('width', extentX)
      .attr('height', extentY)
      .attr('rx', extentY * marginH)
      .attr('ry', extentY * marginH)
      .attr('x', 0)
      .attr('y', 0);

    // Draw results
    let barHeight = function (index) { return extentY * (1 - marginH * (index + 1) * 4); };
    let barMiddlePosition = function (index) { return extentY / 2 - barHeight(index) / 2; };

    graphWrap.selectAll('rect.results')
      .data(data.results)
      .enter()
      .append('rect')
      .attr('class', function (d) { return 'results competency-type-bar-' + ((d.type)?d.type:1);})
      .attr('width', function (r) { return scaleX(r.value);})
      .attr('height', function (_d, index) {return barHeight(index);})
      .attr('rx', extentY * marginH)
      .attr('rx', extentY * marginH)
      .attr('x', 0)
      .attr('y', function (_d, index) { return barMiddlePosition(index);});
    // Draw markers
    let circleRadius = function (data) { return extentY * (1 - marginH * (data.active ? 2 : 4)) / 2; };

    let marker = graphWrap.selectAll('g.marker')
      .data(data.markers)
      .enter()
      .append('g')
      .attr('class', function (d) {return d.active ? 'marker active' : 'marker';})
      .attr('x', function (r) { return scaleX(r.value);})
      .attr('y', 0);

    marker.append('circle')
      .attr('r', circleRadius)
      .attr('cx', function (r) { return scaleX(r.value);})
      .attr('cy', extentY / 2);

    marker.append('text')
      .attr('x', function (r) { return scaleX(r.value);})
      .attr('y', extentY / 2)
      .text(function (d) {return d.label;})
      .attr('class', 'marker-text')
      .attr('font-size', extentY * (1 - marginH) / 3);
  }

  progressCVS.width = function (_) {
    if (!arguments.length) return width;
    width = +_;
    return this;
  };

  progressCVS.height = function (_) {
    if (!arguments.length) return height;
    height = +_;
    return this;
  };

  progressCVS.margins = function (_) {
    if (!arguments.length) return graphMargins;
    graphMargins = _;
    return this;
  };

  progressCVS.data = function (_) {
    if (!arguments.length) return data;
    data = _;
    return this;
  };

  return progressCVS;
}


