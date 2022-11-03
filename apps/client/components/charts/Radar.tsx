import { scaleLinear as d3ScaleLinear } from "d3-scale";
import { selectAll as d3SelectAll, select as d3Select } from "d3-selection";
import { range as d3Range } from "d3-array";
import {
  pie as d3Pie,
  arc as d3Arc,
  lineRadial as d3LineRadial,
  curveBasisClosed,
  curveLinearClosed,
} from "d3-shape";
import React from "react";
import { useD3 } from "./d3";

interface RadarChartData {
  readonly label: string;
  readonly points: number[];
}

interface RadarChartProps {
  readonly axis: string[];
  readonly labels: string[];
  readonly data: RadarChartData[];
  readonly className?: string;
  readonly width?: number;
  readonly height?: number;
  readonly marginLeft?: number;
  readonly marginRight?: number;
  readonly marginTop?: number;
  readonly marginBottom?: number;
  readonly levels?: number;
  readonly opacityCircles?: number;
  readonly labelFactor?: number;
  readonly roundStrokes?: boolean;
  readonly opacityArea?: number;
  readonly strokeWidth?: number;
  readonly dotRadius?: number;
  readonly reverse?: boolean;
}

const RadarChart = ({
  axis: axisLabels,
  data: dataPoints,
  labels,
  className,
  width = 200,
  height = 200,
  marginLeft = 20,
  marginRight = 20,
  marginTop = 20,
  marginBottom = 20,
  levels = axisLabels.length - 1,
  opacityCircles = 0.1,
  labelFactor = 1.15,
  roundStrokes = true,
  opacityArea = 0.45,
  strokeWidth = 3,
  dotRadius = 4,
}: RadarChartProps) => {
  const ref = useD3((svg) => {
    const radius = Math.min(width / 2, height / 2);
    const angleSlice = (Math.PI * 2) / labels.length;
    const Format = (n: number): string => axisLabels[n];
    const rScale = d3ScaleLinear()
      .range([0, radius])
      .domain([0, levels]);

    const color = (i: number) => {
      const mean =
        Math.round(dataPoints[i].points.reduce((p, c) => p + c, 0) /
        dataPoints[i].points.length);
        switch (mean) {
          case 4:
            return "text-green-400";
          case 3:
            return "text-yellow-400";
          case 2:
            return "text-blue-400";
          case 1:
            return "text-red-400";
        }
        return '';
    };

    svg.attr(
      "viewBox",
      `0 0 ${width + marginLeft + marginRight} ${
        height + marginTop + marginBottom
      }`
    );

    svg.selectChildren().remove();

    const g = svg
      .append("g")
      .attr(
        "transform",
        "translate(" +
          (width / 2 + marginLeft) +
          "," +
          (height / 2 + marginTop) +
          ")"
      );

    const pie = d3Pie().sort(null);
    const arcPath = d3Arc();
    g.append("defs")
      .selectAll("path")
      .data(pie(labels.map(() => 1)))
      .enter()
      .append("path")
      //.attr("d", radius * 1.1)
      .attr("d", (d, i) => {
        const a = (labels[i].length / 2) * 6;
        const b = rScale(levels * 1.1) * Math.sin(angleSlice * 0 - Math.PI / 2);
        const c = Math.sqrt(a * a + b * b);
        const ofset = Math.asin(a / c);
        return arcPath({
          startAngle: d.startAngle - ofset,
          endAngle: d.endAngle,
          innerRadius: radius,
          outerRadius: radius * 1.15,
        });
      })
      .attr("id", (_d, i) => `label_${i}`)
      .style("fill", "none")
      .style("stroke", "none");

     const axisGrid = g.append("g").attr("class", "axisWrapper");

    axisGrid
      .selectAll(".levels")
      .data(d3Range(1, levels + 1).reverse())
      .enter()
      .append("circle")
      .attr(
        "class",
        "text-gray-50 dark:text-gray-800 bg-gray-50 dark:bg-gray-800 fill-current stroke-current"
      )
      .attr("r", (d) => (radius / levels) * d)
      .style("fill", "#CDCDCD")
      .style("stroke-width", "10px")
      
      .style("fill-opacity", opacityCircles);

    // //Text indicating at what % each level is
    // axisGrid
    //   .selectAll(".axisLabel")
    //   .data(d3Range(1, levels + 1).reverse())
    //   .enter()
    //   .append("text")
    //   .attr("class", "axisLabel")
    //   .attr("x", 4)
    //   .attr("y", (d) => (-d * radius) / levels)
    //   .attr("dy", "0.4em")
    //   .style("font-size", "10px")
    //   .attr("fill", "#737373")
    //   .text((d) => Format((levels * d) / levels));

    const axis = axisGrid
      .selectAll(".axis")
      .data(labels)
      .enter()
      .append("g")
      .attr("class", "axis");
    
    axis
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr(
        "x2",
        (_d, i) => rScale(levels * 1.1) * Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        "y2",
        (_d, i) => rScale(levels * 1.1) * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .attr("class", "text-gray-800 stroke-current")
      .style("stroke-width", "10px");

    axis
      .append("text")
      .attr("class", "text-xs text-center text-gray-400 fill-current")
      .append("textPath")
      .attr("alignment-baseline", "middle")
      .attr("href", (_d, i) => `#label_${i}`)
      .text((d) => d);

     const radarLine = d3LineRadial()
      .curve(roundStrokes ? curveBasisClosed : curveLinearClosed)
      .radius((d) => rScale(d[1]))
      .angle((_d, i) => i * angleSlice);

    const blobWrapper = g
      .selectAll(".radarWrapper")
      .data(dataPoints)
      .enter()
      .append("g")
      .attr("class", "radarWrapper");

    blobWrapper
      .append("path")
      .attr("class", (_d, i) => `radarArea ${color(i)} fill-current`)
      .attr("d", (d) => radarLine(d.points.map((v, i) => [i, v])))
      .style("fill-opacity", opacityArea)
      .on("mouseover", function () {
        //Dim all blobs
        d3SelectAll(".radarArea")
          .transition()
          .duration(200)
          .style("fill-opacity", 0.1);
        //Bring back the hovered over blob
        d3Select(this).transition().duration(200).style("fill-opacity", 0.7);
      })
      .on("mouseout", function () {
        //Bring back all blobs
        d3SelectAll(".radarArea")
          .transition()
          .duration(200)
          .style("fill-opacity", opacityArea);
      });

    blobWrapper
      .append("path")
      .attr("class", (_d, i) => `radarStroke ${color(i)} stroke-current`)
      .attr("d", (d) => radarLine(d.points.map((v, i) => [i,v])))
      .style("stroke-width", strokeWidth + "px")
      .style("fill", "none");
  });

  return (
    <svg
      width="100%"
      height="100%"
      className={className}
      viewBox={`0 0 ${width + marginLeft + marginRight} ${
        height + marginTop + marginBottom
      }`}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  );
};

export default RadarChart;
