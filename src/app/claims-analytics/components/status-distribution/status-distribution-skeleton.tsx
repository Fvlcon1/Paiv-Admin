import SlideIn from '@styles/components/slidein';
import theme from '@styles/theme';

const StatusDistributionSkeleton = () => {
    return (
        <SlideIn
            delay={0.3}
            direction="bottom"
            className="w-[300px] relative flex-col rounded-xl border-[1px] border-border-secondary bg-bg-primary-light px-4 items-center flex py-4 animate-pulse"
        >
            {/* Title Skeleton */}
            <div className="h-6 w-3/4 rounded-md bg-gray-200 mb-2"></div>

            {/* Donut Chart Skeleton */}
            <div className="relative w-[100px] h-[100px] rounded-full bg-gray-100 mt-2">
                {/* Center Text Skeleton */}
                <div className="flex flex-col items-center justify-center">
                    <div className="h-8 w-16 rounded-md bg-gray-200 mb-1"></div>
                    <div className="h-4 w-12 rounded-md bg-gray-200"></div>
                </div>
            </div>

            {/* Legend Skeleton */}
            <div className="flex items-center gap-4">
                {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="rounded-[3px] w-[12px] h-[12px] bg-gray-300"></div>
                        <div className="h-4 w-12 rounded-md bg-gray-200"></div>
                    </div>
                ))}
            </div>
        </SlideIn>
    );
};

export default StatusDistributionSkeleton;