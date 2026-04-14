import type { Memory } from '../types/memory';

export const initialMemories: Memory[] = [
  {
    id: 'm1',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    caption: 'Weekend with the crew by the ocean.',
    aiDescription: 'Friends enjoying sunset with playful waves and warm orange light.',
    tags: ['beach', 'friends', 'sunset'],
    emotion: 'happy',
    createdAt: '2026-03-20T18:20:00.000Z'
  },
  {
    id: 'm2',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
    caption: 'Late-night city lights after the conference.',
    aiDescription: 'Neon skyline reflecting focus, ambition, and new ideas.',
    tags: ['city', 'night', 'travel'],
    emotion: 'excited',
    createdAt: '2026-03-18T21:15:00.000Z'
  },
  {
    id: 'm3',
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
    caption: 'Cabin morning and coffee in silence.',
    aiDescription: 'Forest mist and soft light create a mindful and calm atmosphere.',
    tags: ['forest', 'morning', 'solo'],
    emotion: 'calm',
    createdAt: '2026-02-11T08:05:00.000Z'
  },
  {
    id: 'm4',
    imageUrl: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=900&q=80',
    caption: 'Digging through old family albums.',
    aiDescription: 'Vintage memories evoke gratitude and nostalgic reflection.',
    tags: ['family', 'archive', 'home'],
    emotion: 'nostalgic',
    createdAt: '2026-01-05T15:40:00.000Z'
  }
];
