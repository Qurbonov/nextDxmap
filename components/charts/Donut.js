
import React, { Component } from 'react';
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
class Donut extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {},
            savdolar: [44, 55, 41, 17, 15],
            labels: ['A', 'B', 'C', 'D', 'E']
        }
    }

    render() {

        return (
            <div className="donut">
                <Chart options={this.state.options} series={this.state.savdolar} type="donut" width="380" />
            </div>
        );
    }
}

export default Donut;