import React from 'react';

export const LineChartSkeleton = () => {
	return (
		<div className="w-full h-full flex flex-col animate-pulse">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
				<div className="h-6 w-32 md:w-48 bg-gray-200 rounded"></div>
				<div className="h-4 w-20 md:w-24 bg-gray-200 rounded"></div>
			</div>

			{/* Chart Container */}
			<div className="relative flex-1 w-full rounded-lg border border-gray-200 p-2 sm:p-4">
				{/* Y-axis labels */}
				<div className="absolute left-0 top-0 bottom-0 w-8 md:w-10 flex flex-col justify-between pr-2">
					{[0, 1, 2].map((i) => (
						<div key={i} className="h-3 w-full bg-gray-200 rounded"></div>
					))}
				</div>

				{/* X-axis labels */}
				<div className="absolute bottom-0 left-8 md:left-10 right-0 h-6 md:h-8 flex items-end justify-between px-2 sm:px-4">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="h-3 w-4 md:w-6 bg-gray-200 rounded-t"></div>
					))}
				</div>

				{/* Grid lines */}
				<div className="absolute left-8 md:left-10 right-0 top-0 h-[calc(100%-1.5rem)] md:h-[calc(100%-2rem)]">
					{[0, 1, 2].map((i) => (
						<div
							key={i}
							className="absolute left-0 right-0 h-px bg-gray-100"
							style={{
								top: `${(i + 1) * 25}%`,
							}}
						/>
					))}
				</div>

				{/* Chart area */}
				<div className="absolute left-8 md:left-10 right-0 top-0 bottom-6 md:bottom-8 p-2 sm:p-4">
					{/* Line 1 */}
					<div className="relative h-1/2 w-full">
						<div className="absolute left-0 right-0 top-1/2 h-0.5 md:h-1 bg-gray-200 rounded-full"></div>
						{[0, 1, 2, 3, 4, 5].map((i) => (
							<div
								key={i}
								className="absolute h-2 w-2 md:h-3 md:w-3 -translate-y-1/2 rounded-full bg-gray-300"
								style={{
									left: `${(i / 5) * 100}%`,
									top: '50%',
								}}
							/>
						))}
					</div>

					{/* Line 2 */}
					<div className="relative h-1/2 w-full">
						<div className="absolute left-0 right-0 top-1/2 h-0.5 md:h-1 bg-gray-200 rounded-full"></div>
						{[0, 1, 2, 3, 4, 5].map((i) => (
							<div
								key={i}
								className="absolute h-2 w-2 md:h-3 md:w-3 -translate-y-1/2 rounded-full bg-gray-300"
								style={{
									left: `${(i / 5) * 100}%`,
									top: '50%',
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LineChartSkeleton;
