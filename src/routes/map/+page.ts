import { PageLoad } from './$types';
import { assets } from '$app/paths';

// Cannot be SSR as has client only components
export const ssr = false;

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch(`${assets}/geojson/lad.geojson`);
    const features = {
        lad: await res.json()
    };

    return {
        title: 'Example map',
        features,
    }
}