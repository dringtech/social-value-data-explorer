import { PageLoad } from './$types';
import { assets } from '$app/paths';

export const ssr = false;

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch(`${assets}/geojson/lad.geojson`);
    const features = {
        lad: await res.json()
    };
    console.log(features);

    return {
        title: 'Place picker',
        features,
    }
}