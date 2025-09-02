import React from 'react';

export const BarChartSkeleton = () => {
	return (
		<div className="w-full h-full flex items-end gap-2 px-4 py-2">
			{Array.from({ length: 8 }).map((_, i) => (
				<div
					key={i}
					className="flex-1 flex flex-col items-center"
					style={{
						height: '90%',
						minHeight: '200px',
					}}
				>
					<div
						className="w-full rounded-t-sm bg-gray-100 animate-pulse"
						style={{
							height: `${(i % 3 + 1) * 20 + 20}%`, // 40%, 60%, or 80% based on index
							background: 'linear-gradient(to top, #E5E7EB, #F3F4F6)',
							minHeight: '40px',
						}}
					/>
				</div>
			))}
		</div>
	);
};

export default BarChartSkeleton;
