import { asset } from '../utils/asset';

export const couple = { bride: 'Aman', groom: 'Nishu' };
export const coupleTitle = `${couple.bride} & ${couple.groom}`;
export const dateLine = 'AT Bijainagar, ON 8th - 10th, FEBRUARY 2027.';

// Countdown target (Jaipur time, IST).
export const COUNTDOWN_TARGET = '2027-02-08T20:30:00+05:30';

export const events = [
  { date: '08 Feb, 2027', title: 'Mayra', time: 'At 6:00 pm',
    venue: 'Akshat Community Hall, Akshat Kanota Estate, Nayla Road Kanota, Jaipur.',
    image: asset('images/story/53.png') },
  { date: '09 Feb, 2027', title: 'Haldi & Mehendi', time: 'At 11:00 am',
    venue: 'Heavens Garden, Lotus Lawn, Agra Jaipur Road, Jaipur.',
    image: asset('images/story/8.png') },
  { date: '10 Feb, 2027', title: 'Engagement & Sangeet', time: 'At 6:00 pm',
    venue: 'Heavens Garden, Lotus Lawn, Agra Jaipur Road, Jaipur.',
    image: asset('images/story/4.png') },
  { date: '10 Feb, 2027', title: 'Baraat', time: 'At 6:00 pm',
    venue: 'Chandra Mahal Marriage Garden, Agra Jaipur Road, Jaipur.',
    image: asset('images/story/7.png') },
  { date: '10 Feb, 2027', title: 'Reception Dinner', time: 'At 7:30 pm',
    venue: 'Chandra Mahal Marriage Garden, Agra Jaipur Road, Jaipur.',
    image: asset('images/story/5.png') },
  { date: '10 Feb, 2027', title: 'Rituals', time: 'At 10.45 pm',
    venue: 'Chandra Mahal Marriage Garden, Agra Jaipur Road, Jaipur.',
    image: asset('images/story/6.png') },
];
