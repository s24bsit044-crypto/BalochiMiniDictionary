import { Utensils, House, Bird, Sprout, Clock, Shirt, Accessibility, Mountain, MoveUpRight, Sparkles, Briefcase, MessagesSquare, GraduationCap, Users, Hash, BookOpen, type LucideIcon } from 'lucide-react';
export interface Category { name: string; label: string; icon: LucideIcon; }
export const CATEGORIES: Category[] = [
 { name: 'Food, Spices & Dishes', label: 'Food & spices', icon: Utensils },
 { name: 'Household Objects & Tools', label: 'Home & tools', icon: House },
 { name: 'Animals, Birds & Insects', label: 'Animals & birds', icon: Bird },
 { name: 'Plants, Trees & Agriculture', label: 'Plants & nature', icon: Sprout },
 { name: 'Time, Months & Seasons', label: 'Time & seasons', icon: Clock },
 { name: 'Clothing & Jewelry', label: 'Clothing & jewelry', icon: Shirt },
 { name: 'Body Parts & Anatomy', label: 'Body & health', icon: Accessibility },
 { name: 'Geography & Weather', label: 'Places & weather', icon: Mountain },
 { name: 'Action Verbs', label: 'Action words', icon: MoveUpRight },
 { name: 'Adjectives & Qualities', label: 'Qualities', icon: Sparkles },
 { name: 'Occupations & Society', label: 'People & society', icon: Briefcase },
 { name: 'Conversational Expressions', label: 'Conversation', icon: MessagesSquare },
 { name: 'Education', label: 'Education', icon: GraduationCap },
 { name: 'Family', label: 'Family', icon: Users },
 { name: 'Numbers', label: 'Numbers', icon: Hash }
];
export function categoryInfo(name: string): Category { return CATEGORIES.find(c => c.name === name) ?? { name, label: name, icon: BookOpen }; }
