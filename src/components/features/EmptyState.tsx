import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
interface Props { title: string; message: string; action?: boolean; }
export default function EmptyState({ title, message, action = false }: Props) {
 return <div className="panel flex flex-col items-center px-6 py-12 text-center"><span className="mb-5 rounded-2xl bg-secondary p-4 text-primary"><BookOpen size={28} strokeWidth={1.5} /></span><h2 className="section-title">{title}</h2><p className="mb-5 mt-3 max-w-md text-muted-foreground">{message}</p>{action && <Link to="/settings" className="btn-secondary">Import a dictionary</Link>}</div>;
}
