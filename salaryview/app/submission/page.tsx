"use client";
import { useState } from 'react';
import Logo from '@/app/ui/salaryfit-logo';

export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('0');
    const [status, setStatus] = useState('');
    const [currency, setCurrency] = useState('USD');

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('saving');
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/submit-salary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    salary: parseFloat(salary),
                    currency
                })
            });
            if (!res.ok) throw new Error(await res.text());
            setStatus('Submitted ✅');
            setTimeout(() => {
                setStatus('');
                setName('');
                setEmail('');
                setSalary('0');
                setCurrency('USD');
            }, 3000);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setStatus('Error: ' + err.message);
            } else {
                setStatus('Unknown error occurred');
            }

        }
    }

    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-600 p-4 md:h-22">
                <Logo />
            </div>
            <div className="flex flex-col justify-center items-center px-6 py-12">
                <h1 className="text-2xl font-semibold mb-4">Add / Update Salary</h1>
                <form onSubmit={submit} className="space-y-5 w-full max-w-md">
                    <div>
                        <label className="block text-sm">Full name</label>
                        <input required value={name} onChange={e => setName(e.target.value)}
                            className="mt-1 block w-full rounded-md border p-2" />
                    </div>
                    <div>
                        <label className="block text-sm">Email</label>
                        <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border p-2" />
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                        <div className="w-full md:w-50">
                            <label className="block text-sm">Currency</label>
                            <select required className="mt-1 block w-full rounded-md border p-2"
                                onChange={e => setCurrency(e.target.value)} >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="INR">INR</option>
                                <option value="NGN">NGN</option>
                            </select>
                        </div>
                        <div className="w-full md:w-50">
                            <label className="block text-sm">Salary</label>
                            <input required type="number" step="0.01" value={salary}
                                onChange={e => setSalary(e.target.value)}
                                className="mt-1 block w-full rounded-md border p-2" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
                        <div className="self-center text-sm">{status}</div>
                    </div>
                </form>
            </div>
            <div className="flex flex-col justify-center bg-gray-200 p-4 glass-effect premium-shadow rounded-2xl p- text-center mt-8">
                <h3 className="font-bold text-gray-900 mb-2">🔒 Your Privacy Matters</h3>
                <p className="text-gray-600 text-sm">
                    All salary information is encrypted and securely stored. Only authorized administrators can access and manage this data.
                </p>
            </div>
        </main>
    );
}