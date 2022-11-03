import { format as d3Format } from "d3-format";
import { pie as d3Pie, arc as d3Arc } from "d3-shape";
import React from "react";
import { useD3 } from "./d3";

interface PieChartData {
  readonly label: string;
  readonly value: number;
}

interface RadarChartProps {
  readonly data: PieChartData[];
  readonly className?: string;
  readonly width?: number;
  readonly height?: number;
  readonly labelFactor?: number;
  readonly roundStrokes?: boolean;
  readonly opacityArea?: number;
  readonly strokeWidth?: number;
  readonly dotRadius?: number;
  readonly reverse?: boolean;
}

const RadarChart = ({
  data: dataPoints,
  className,
  width = 640,
  height = 400,
  labelFactor = 1.15,
  roundStrokes = true,
  opacityArea = 0.45,
  strokeWidth = 3,
  dotRadius = 4,
}: RadarChartProps) => {
  const ref = useD3((svg) => {
    const radius = Math.min(width, height) / 2;
    const stroke = "white"; // stroke separating widths
    const strokeWidth = 4; // width of stroke separating wedges
    const strokeLinejoin = "round";

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    svg.selectChildren().remove();

    const g = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const slices = g
      .append("g")
      .attr("class", "slices")
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linejoin", strokeLinejoin);
    const labels = g.append("g").attr("class", "labels");
    const lines = g.append("g").attr("class", "lines");

    const formatValue = d3Format(",");
    const title = (d: PieChartData) => `${d.label}\n${formatValue(d.value)}`;

    const pie = d3Pie<PieChartData>()
      .sort(null)
      .value((d) => d.value);
    const arc = d3Arc<any>()
      .cornerRadius(6)
      .padAngle(0.1)
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);
    const outerArc = d3Arc<any>()
      .outerRadius(radius * 0.9)
      .innerRadius(radius * 0.9);

    slices
      .selectAll("path")
      .data(pie(dataPoints))
      .enter()
      .append("path")
      .attr("d", arc);

    labels
      .selectAll("text")
      .data(pie(dataPoints))
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${outerArc.centroid(d)})`)
      .attr("text-anchor", (d) =>
        d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI
          ? "start"
          : "end"
      )
      .selectAll("tspan")
      .data((d) => {
        const lines = `${title(d.data)}`.split(/\n/);
        return d.endAngle - d.startAngle > 0.25 ? lines : lines.slice(0, 1);
      })
      .join("tspan")
      .attr("x", 0)
      .attr("y", (_, i) => `${i * 1.1}em`)
      .attr("font-weight", (_, i) => (i ? null : "bold"))
      .text((d) => d);

    // function midAngle(d){
    //   return d.startAngle + (d.endAngle - d.startAngle)/2;
    // }
  });

  return (
    <svg
      width="100%"
      height="100%"
      className={className}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  );
};

export default RadarChart;
