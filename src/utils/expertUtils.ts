
export function getExpertImage(id: string): string {
  const images: Record<string, string> = {
    leonardo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg',
    curie: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c1920.jpg',
    socrates: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Socrates_Louvre.jpg',
    hypatia: '/lovable-uploads/7fa67e56-1a42-4648-be84-9213f73f953c.png',
    einstein: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
    confucius: '/lovable-uploads/439f1d74-152a-43a7-9aac-9aa5efa8e31d.png',
    lovelace: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg',
    machiavelli: '/lovable-uploads/d1f7c4e9-a220-4971-a95f-c627572fd57f.png'
  };
  return images[id] || '';
}

export function getExpertDomain(id: string): string {
  const domains: Record<string, string> = {
    leonardo: 'Renaissance Polymath',
    curie: 'Physics & Chemistry',
    socrates: 'Classical Philosophy',
    hypatia: 'Mathematics & Astronomy',
    einstein: 'Theoretical Physics',
    confucius: 'Ethics & Governance',
    lovelace: 'Computing & Mathematics',
    machiavelli: 'Political Philosophy'
  };
  return domains[id] || '';
}

export function getExpertColor(id: string): string {
  const colors: Record<string, string> = {
    leonardo: 'bg-orange-100 text-orange-700 border-orange-200',
    curie: 'bg-blue-100 text-blue-700 border-blue-200',
    socrates: 'bg-purple-100 text-purple-700 border-purple-200',
    hypatia: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    einstein: 'bg-violet-100 text-violet-700 border-violet-200',
    confucius: 'bg-amber-100 text-amber-700 border-amber-200',
    lovelace: 'bg-pink-100 text-pink-700 border-pink-200',
    machiavelli: 'bg-red-100 text-red-700 border-red-200'
  };
  return colors[id] || 'bg-gray-100 text-gray-700 border-gray-200';
}

export function getRelativeTime(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  return timestamp.toLocaleTimeString();
}
