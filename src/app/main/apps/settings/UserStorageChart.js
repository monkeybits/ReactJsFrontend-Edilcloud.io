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
	return storage ? (
		<div className="flex flex-col items-center w-full max-w-md">
			Total : {storage?.max_plan} MB
			<Doughnut
				data={{
					labels: [`free: ${storage?.free} MB`, `used: ${storage?.used} MB`],
					datasets: [
						{
							data: [storage?.free, storage?.used],
							backgroundColor: ['#FF6384', '#36A2EB'],
							hoverBackgroundColor: ['#FF6384', '#36A2EB']
						}
					]
				}}
			/>
		</div>
	) : null;
}

export default UserStorageChart;
