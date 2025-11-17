import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { purchaseOrdersApi } from '@/features/purchaseOrders/api/purchaseOrdersApi';
import type { PurchaseOrder } from '@/features/purchaseOrders/types/purchaseOrder.types';
import { useAuthStore } from '@/features/auth/store/authStore';

const STATUS = {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
  COMPLETE: 4,
};

export default function PurchaseOrdersPage() {
  const [pending, setPending] = useState<PurchaseOrder[]>([]);
  const [approved, setApproved] = useState<PurchaseOrder[]>([]);
  const [rejected, setRejected] = useState<PurchaseOrder[]>([]);
  const [complete, setComplete] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const user = useAuthStore((s) => s.user);
  const canManage = user?.role === 'Admin' || user?.role === 'Manager';

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [p, a, r, c] = await Promise.all([
        purchaseOrdersApi.getPurchaseOrders(STATUS.PENDING),
        purchaseOrdersApi.getPurchaseOrders(STATUS.APPROVED),
        purchaseOrdersApi.getPurchaseOrders(STATUS.REJECTED),
        purchaseOrdersApi.getPurchaseOrders(STATUS.COMPLETE),
      ]);
      setPending(p);
      setApproved(a);
      setRejected(r);
      setComplete(c);
    } catch (err) {
      toast.error('Błąd pobierania zamówień');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      const res = await purchaseOrdersApi.approvePurchaseOrder(id);
      if (res.success) {
        toast.success(res.message || 'Zatwierdzono');
        await fetchAll();
      } else {
        toast.error(res.message || 'Nie udało się zatwierdzić');
      }
    } catch (err) {
      toast.error('Błąd zatwierdzania');
      console.error(err);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const res = await purchaseOrdersApi.rejectPurchaseOrder(id);
      if (res.success) {
        toast.success(res.message || 'Odrzucono');
        await fetchAll();
      } else {
        toast.error(res.message || 'Nie udało się odrzucić');
      }
    } catch (err) {
      toast.error('Błąd odrzucania');
      console.error(err);
    }
  };

  const renderRow = (po: PurchaseOrder, showActions = false) => (
    <div key={po.purchaseOrderId} className="flex items-center justify-between gap-6 py-3 border-b border-secondary/20">
      <div className="flex-1">
        <div className="text-sm text-foreground/70">{po.orderNumber} • {new Date(po.orderDate).toLocaleDateString()}</div>
        <div className="text-md font-medium text-foreground">{po.vendorName}</div>
        <div className="text-sm text-foreground/60">Produkty: {po.totalProducts} • Wartość: ${po.subtotal.toFixed(2)}</div>
      </div>

      <div className="w-44 text-right">
        <div className="text-sm text-foreground/70">{po.statusName}</div>
        {showActions && canManage && (
          <div className="mt-2 flex justify-end gap-2">
            <button onClick={() => handleApprove(po.purchaseOrderId)} className="px-3 py-1 bg-primary text-background rounded">Zatwierdź</button>
            <button onClick={() => handleReject(po.purchaseOrderId)} className="px-3 py-1 bg-accent text-background rounded">Odrzuć</button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Zamówienia zakupu</h1>
          <p className="text-foreground/70">Zarządzaj zamówieniami (Pending → Approved/Rejected)</p>
        </div>
        <div>
          <button onClick={fetchAll} className="px-4 py-2 bg-secondary rounded text-foreground">Odśwież</button>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-2">🟡 Oczekujące ({pending.length})</h2>
        <div className="bg-secondary rounded-lg p-4">
          {loading ? <div className="py-8 text-center text-foreground/60">Ładowanie...</div> :
            pending.length === 0 ? <div className="py-6 text-foreground/60">Brak</div> :
            pending.map((po) => renderRow(po, true))
          }
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-2">🟢 Zatwierdzone ({approved.length})</h2>
        <div className="bg-secondary rounded-lg p-4">
          {approved.length === 0 ? <div className="py-6 text-foreground/60">Brak</div> : approved.map(po => renderRow(po))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-2">🔴 Odrzucone ({rejected.length})</h2>
        <div className="bg-secondary rounded-lg p-4">
          {rejected.length === 0 ? <div className="py-6 text-foreground/60">Brak</div> : rejected.map(po => renderRow(po))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">✅ Zrealizowane ({complete.length})</h2>
        <div className="bg-secondary rounded-lg p-4">
          {complete.length === 0 ? <div className="py-6 text-foreground/60">Brak</div> : complete.map(po => renderRow(po))}
        </div>
      </section>
    </div>
  );
}
