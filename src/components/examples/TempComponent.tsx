import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ga from '@/lib/ga';

export default function TestComponent({ journey }: { journey: string }) {
    const router = useRouter();
    const step = 'page_view';
    const metadata = { referrer: document.referrer };

    const logAnalytics = useEffectEvent((journey) => {
        // Add page context for better journey analysis
        const enhancedMetadata = {
            ...metadata,
            current_page: router.pathname,
            journey_timestamp: new Date().toISOString()
        };

        // Track the journey step
        ga.trackJourneyStep(journey, step, enhancedMetadata);
    });


    useEffect(() => {
        logAnalytics(journey);
    }, [journey]);


    useEffect(() => {
        const trackStep = () => {
            // Add page context for better journey analysis
            const enhancedMetadata = {
                ...metadata,
                current_page: router.pathname,
                journey_timestamp: new Date().toISOString()
            };

            // Track the journey step
            ga.trackJourneyStep(journey, step, enhancedMetadata);
        };

        trackStep();
    }, [journey]);

    return null;
}
