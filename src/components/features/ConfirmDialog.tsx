import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
interface Props { open: boolean; onClose: () => void; onConfirm: () => void; title: string; description: string; busy?: boolean; }
export default function ConfirmDialog({ open, onClose, onConfirm, title, description, busy = false }: Props) {
 return <Dialog open={open} onOpenChange={value => { if (!value && !busy) onClose(); }}><DialogContent className="rounded-2xl"><DialogHeader><DialogTitle className="font-display text-2xl">{title}</DialogTitle><DialogDescription className="pt-3 text-base leading-7">{description}</DialogDescription></DialogHeader><DialogFooter className="mt-5 gap-3"><button className="btn-secondary" disabled={busy} onClick={onClose}>Cancel</button><button className="btn-primary" disabled={busy} onClick={onConfirm}>{busy ? 'Saving…' : 'Confirm'}</button></DialogFooter></DialogContent></Dialog>;
}
