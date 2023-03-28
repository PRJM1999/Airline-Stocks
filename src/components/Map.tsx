import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useDispatch } from 'react-redux';
import { selectContinent } from '../app/home';

const Map = () => {
  const svgRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const width = 960;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`);

    const projection = d3.geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.5]);

    const pathGenerator: any = d3.geoPath().projection(projection);

    // Load the GeoJSON data
    d3.json('./assets/continents.geojson').then((data: any) => {
      // Draw the map
      svg.selectAll('path')
        .data(data.features)
        .join('path')
        .attr('class', 'continent')
        .attr('d', pathGenerator)
        .style('fill', 'lightgrey')
        .style('stroke', 'black')
        .style('stroke-width', 0.5)
        .style('opacity', 0.5)
        .on('click', function (event, d : any) {
          dispatch(selectContinent(d.properties.CONTINENT));
        })
        .on('mouseover', function () {
          d3.select(this).style('fill', 'darkgrey');
          d3.select(this).select('title').transition().delay(0).duration(0).style('opacity', 1);
        })
        .on('mouseout', function () {
          d3.select(this).style('fill', 'lightgrey');
          d3.select(this).select('title').transition().duration(0).style('opacity', 0); 
        })
        .append('title')
        .text(function(d: any) { return d.properties.CONTINENT; })
        .attr('fill', 'black')
        .style('opacity', 0); // Set initial opacity to zero so that it fades in when triggered
    });
  }, []);

  return (
    <div id="map">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Map;