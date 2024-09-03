import type { PageLoad } from './$types';

export const trailingSlash = 'always';
export const prerender = true;
export const ssr = true;
export const csr = true;

export const load: PageLoad = () => {
    return {
        menu: [
            { title: 'York Data', href: '/york-data/' },
            // { title: 'Framework', href: '/framework/', },
        ]
    }
}