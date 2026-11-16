import { useState } from 'react';
import { Plus, Trash2, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DashboardLayout from '../../components/shared/DashboardLayout';
import PageHeader from '../../components/shared/PageHeader';
import DataTable, { Column } from '../../components/shared/DataTable';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/select';
import { staff as initialStaff } from '../../data/mockData';
import { formatDate } from '../../lib/utils';
import { toast } from 'sonner';

type Staff = typeof initialStaff[number];

const ROLE_LABELS: Record<string, string> = {
  owner: 'المالك',
  manager: 'مدير',
  editor: 'محرر',
  viewer: 'مشاهد',
};

const schema = z.object({
  name:  z.string().min(2),
  email: z.string().email('بريد إلكتروني غير صحيح'),
  role:  z.string().min(1, 'اختر صلاحية'),
});
type Form = z.infer<typeof schema>;

export default function StaffPage() {
  const [data, setData] = useState<Staff[]>(initialStaff as any);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (d: Form) => {
    await new Promise(r => setTimeout(r, 400));
    setData(prev => [...prev, { id: String(Date.now()), ...d, avatar: d.name[0], joinDate: new Date().toISOString(), status: 'active' } as any]);
    toast.success(`تم إرسال دعوة إلى ${d.email}`);
    reset();
    setOpen(false);
  };

  const remove = (id: string) => {
    setData(prev => prev.filter(s => s.id !== id));
    toast.success('تم حذف عضو الفريق');
  };

  const cols: Column<Staff>[] = [
    { key: 'name', header: 'العضو', cell: r => (
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8"><AvatarFallback>{(r as any).name?.[0] ?? '?'}</AvatarFallback></Avatar>
        <div>
          <p className="text-sm font-semibold text-[var(--fg)]">{(r as any).name}</p>
          <p className="text-xs text-[var(--fg-muted)]">{(r as any).email}</p>
        </div>
      </div>
    )},
    { key: 'role',     header: 'الصلاحية', cell: r => <Badge variant="blue">{ROLE_LABELS[(r as any).role] ?? (r as any).role}</Badge> },
    { key: 'joinedAt', header: 'تاريخ الانضمام', cell: r => <span className="text-sm text-[var(--fg-muted)]">{formatDate((r as any).joinedAt)}</span> },
    { key: 'status',   header: 'الحالة', cell: r => <Badge variant={(r as any).status === 'active' ? 'green' : 'gray'}>{(r as any).status === 'active' ? 'نشط' : 'معطل'}</Badge> },
    { key: 'actions',  header: '', cell: row => (
      (row as any).role !== 'owner' && (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => remove(row.id)}>
          <Trash2 size={14} />
        </Button>
      )
    )},
  ];

  return (
    <DashboardLayout>
      <PageHeader title="فريق العمل" description={`${data.length} أعضاء`}
        actions={<Button className="gap-2" onClick={() => setOpen(true)}><Plus size={16} />دعوة عضو</Button>} />

      <DataTable data={data} columns={cols} rowKey={r => r.id} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="sm">
          <DialogHeader><DialogTitle>دعوة عضو جديد</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogBody className="space-y-4">
              <div className="space-y-1.5">
                <Label>الاسم <span className="text-red-500">*</span></Label>
                <Input {...register('name')} placeholder="اسم العضو" error={errors.name?.message} />
              </div>
              <div className="space-y-1.5">
                <Label>البريد الإلكتروني <span className="text-red-500">*</span></Label>
                <Input {...register('email')} type="email" placeholder="colleague@email.com" error={errors.email?.message} />
              </div>
              <div className="space-y-1.5">
                <Label>الصلاحية <span className="text-red-500">*</span></Label>
                <Select value={watch('role')} onValueChange={v => setValue('role', v)}>
                  <SelectTrigger><SelectValue placeholder="اختر الصلاحية" /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(ROLE_LABELS).filter(([k]) => k !== 'owner').map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
              </div>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline" type="button">إلغاء</Button></DialogClose>
              <Button type="submit" loading={isSubmitting} className="gap-1"><Mail size={14} />إرسال الدعوة</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
