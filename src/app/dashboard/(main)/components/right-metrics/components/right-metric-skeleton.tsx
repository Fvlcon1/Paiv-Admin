import { hexOpacity } from "@/utils/hexOpacity"
import SlideIn from "@styles/components/slidein"

const RightMetricsSkeleton = () => {
    const MetricSkeleton = () => {
        return (
            <div className="flex items-center gap-2 p-2 rounded-xl border-[1px] border-border-secondary animate-pulse">
                {/* Icon placeholder */}
                <div className="rounded-lg w-[50px] h-[50px] bg-bg-tetiary shadow-lg"></div>
                
                {/* Content placeholder */}
                <div className="flex flex-col gap-1 flex-1">
                    {/* Title and filter placeholder */}
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-24 rounded-md bg-bg-tetiary"></div>
                        <div className="h-4 w-16 rounded-md bg-bg-tetiary"></div>
                    </div>
                    
                    {/* Value placeholder */}
                    <div className="h-6 w-16 rounded-md bg-bg-tetiary"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((_, index) => (
                <SlideIn
                    key={index}
                    delay={index * 0.1}
                    direction="bottom"
                >
                    <MetricSkeleton />
                </SlideIn>
            ))}
        </div>
    )
}

export default RightMetricsSkeleton