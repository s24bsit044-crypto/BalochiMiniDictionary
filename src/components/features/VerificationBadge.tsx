import { BadgeCheck, CircleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VerificationStatus } from '@/types/dictionary';
interface Props { status: VerificationStatus; }
export default function VerificationBadge({ status }: Props) {
 const verified = status === 'verified'; const Icon = verified ? BadgeCheck : CircleAlert;
 return <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium', verified ? 'bg-secondary text-primary' : 'bg-warning-soft text-warning')}><Icon size={13} />{verified ? 'Source-verified' : status === 'rejected' ? 'Rejected' : 'Needs review'}</span>;
}
