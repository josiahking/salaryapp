'use client'
import { useEffect, useState } from 'react';
import {Salary} from '@/app/lib/definitions';


export default function Page(){
  const [items, setItems] = useState<Salary[]>([]);
  const [editing, setEditing] = useState<Salary | null>(null);

  async function load() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/admin/salaries', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('SalaryAPI.admin_token')}`}
    });
    const data = await res.json();
    console.log('Fetched salaries:', data);
    setItems(data);
  }

  useEffect(()=>{ load(); },[]);

  async function saveEdit() {
    if (!editing) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/salaries/${editing.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('SalaryAPI.admin_token')}`
      },
      body: JSON.stringify({
        local_salary: Number(editing.local_salary),
        salary_eur: Number(editing.salary_eur),
        commission_eur: Number(editing.commission_eur),
      })
    });
    if (res.ok) {
      setEditing(null);
      load();
    } else {
      alert('Failed to save');
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Salaries</h1>
      <div className="overflow-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Currency (Local)</th>
              <th className="p-2 text-right">Salary (Local)</th>
              <th className="p-2 text-right">Salary (EUR)</th>
              <th className="p-2 text-right">Commission (EUR)</th>
              <th className="p-2 text-right">Displayed Salary (EUR)</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 && items.map(it => (
              <tr key={it.id} className="border-t">
                <td className="p-2">{it.user.name}</td>
                <td className="p-2">{it.user.email}</td>
                <td className="p-2">{it.local_currency}</td>
                <td className="p-2 text-right">{Number(it.local_salary).toFixed(2)}</td>
                <td className="p-2 text-right">{Number(it.salary_eur).toFixed(2)}</td>
                <td className="p-2 text-right">{Number(it.commission_eur).toFixed(2)}</td>
                <td className="p-2 text-right">{(Number(it.salary_eur ?? 0) + Number(it.commission_eur)).toFixed(2)}</td>
                <td className="p-2 text-center">
                  <button className="px-2 py-1 border rounded" onClick={()=>setEditing(it)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h2 className="text-lg font-medium mb-3">Edit {editing.user.name}</h2>
            <label className="block text-sm">Salary ({editing.local_currency})</label>
            <input type="number" value={editing.local_salary ?? ''} onChange={e=>setEditing({...editing, local_salary: Number(e.target.value)})} className="w-full p-2 mb-2 border rounded" />
            <label className="block text-sm">Salary (EUR)</label>
            <input type="number" value={editing.salary_eur ?? ''} onChange={e=>setEditing({...editing, salary_eur: Number(e.target.value)})} className="w-full p-2 mb-2 border rounded" />
            <label className="block text-sm">Commission (EUR)</label>
            <input type="number" value={editing.commission_eur} onChange={e=>setEditing({...editing, commission_eur: Number(e.target.value)})} className="w-full p-2 mb-4 border rounded" />
            <div className="flex gap-2 justify-end">
              <button className="px-3 py-2 border rounded" onClick={()=>setEditing(null)}>Cancel</button>
              <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
