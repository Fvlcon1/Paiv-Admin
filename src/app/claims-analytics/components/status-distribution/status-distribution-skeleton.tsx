import SlideIn from '@styles/components/slidein';
import theme from '@styles/theme';

export const StatusDistributionSkeleton = () => {
    return (
        <SlideIn
            delay={0.3}
            direction="bottom"
            className="w-full h-full relative flex flex-col rounded-xl p-4 animate-pulse"
        >
            {/* Title */}
            <div className="w-1/3 h-5 bg-gray-200 rounded mb-4"></div>
            
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6">
                {/* Donut Chart */}
                <div className="relative w-[180px] h-[180px] md:w-[200px] md:h-[200px] rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="absolute w-1/2 h-1/2 rounded-full bg-white"></div>
                    
                    {/* Center Total */}
                    <div className="absolute flex flex-col items-center">
                        <div className="w-10 h-3 bg-gray-200 rounded mb-1"></div>
                        <div className="w-14 h-6 bg-gray-200 rounded"></div>
                    </div>
                </div>
                
                {/* Legend Items */}
                <div className="w-full md:w-auto grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 md:mt-0">
                    {[0, 1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                                <div className="w-20 h-3 bg-gray-200 rounded"></div>
                            </div>
                            <div className="w-6 h-4 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </SlideIn>
    );
};

export default StatusDistributionSkeleton;