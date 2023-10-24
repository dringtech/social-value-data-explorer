import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const place = writable<string | null>();

if (browser) {
  const currentPlace = localStorage.getItem('place');

  if (currentPlace) place.set(currentPlace);

  place.subscribe((v) => {
    if (v) localStorage.setItem('place', v);
  })

  addEventListener('storage', (event) => {
    const { key, newValue } = event;
    if (key === 'place') place.set(newValue);
  })
}

export default place;