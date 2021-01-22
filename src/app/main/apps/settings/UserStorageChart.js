import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const data = {
	labels: ['Red', 'Green', 'Yellow'],
	datasets: [
		{
			data: [300, 50, 100],
			backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
			hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
		}
	]
};

function UserStorageChart() {
	const storage = useSelector(({ SettingApp }) => SettingApp.setting?.total_size);
	return (
		<div className="flex flex-col items-center w-full max-w-md">
			<Doughnut
				data={{
					labels: ['total', 'used', 'free'],
					datasets: [
						{
							data: [storage?.max_plan, storage?.used, storage?.free],
							backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
							hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
						}
					]
				}}
			/>
		</div>
	);
}

export default UserStorageChart;
