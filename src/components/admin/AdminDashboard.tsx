"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Shield, Database, X } from 'lucide-react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminDashboard({ initialAuth = false }: { initialAuth?: boolean }) {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [maintenanceMsg, setMaintenanceMsg] = useState('');
    const [activeTab, setActiveTab] = useState('system');

    // Listener for Maintenance Mode
    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'settings', 'general'), (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setMaintenanceMode(data.maintenanceMode || false);
                setMaintenanceMsg(data.maintenanceMessage || '');
            }
        });
        return () => unsub();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                {/* Maintenance Section */}
                <div className="p-6 bg-card border border-border rounded-lg space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Shield size={20} /> Maintenance Mode
                    </h2>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                            <p className="font-medium">Global Maintenance Mode</p>
                            <p className="text-sm text-muted-foreground">Blocks all non-admin users.</p>
                        </div>
                        <button
                            onClick={async () => {
                                const newState = !maintenanceMode;
                                await updateDoc(doc(db, 'settings', 'general'), { maintenanceMode: newState });
                            }}
                            className={`px-6 py-2 rounded-md font-bold ${maintenanceMode ? 'bg-red-500 text-white' : 'bg-green-600 text-white'}`}
                        >
                            {maintenanceMode ? 'Turn OFF' : 'Turn ON'}
                        </button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Maintenance Message</label>
                        <input 
                            type="text"
                            value={maintenanceMsg}
                            onChange={(e) => setMaintenanceMsg(e.target.value)}
                            className="w-full p-2 bg-muted border border-border rounded-md"
                        />
                        <button 
                            onClick={async () => {
                                await updateDoc(doc(db, 'settings', 'general'), { maintenanceMessage: maintenanceMsg });
                                alert("Message saved!");
                            }}
                            className="mt-2 text-sm bg-primary text-white px-4 py-1 rounded"
                        >
                            Save Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}