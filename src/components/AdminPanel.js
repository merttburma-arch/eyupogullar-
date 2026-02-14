import React, { useState, useEffect } from 'react';
import { Lock, Save, LogOut, AlertCircle, CheckCircle } from 'lucide-react';

const AdminPanel = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [prices, setPrices] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const API_BASE = 'http://localhost:5000/api';

    useEffect(() => {
        if (isLoggedIn) {
            fetchPrices();
        }
    }, [isLoggedIn]);

    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 3000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setToken(data.token);
                setIsLoggedIn(true);
                showMessage('Giriş başarılı!', 'success');
            } else {
                showMessage(data.error || 'Giriş başarısız', 'error');
            }
        } catch (error) {
            showMessage('Sunucu hatası', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setToken('');
        setUsername('');
        setPassword('');
        setPrices(null);
        showMessage('Çıkış yapıldı', 'info');
    };

    const fetchPrices = async () => {
        try {
            const response = await fetch(`${API_BASE}/prices`);
            const data = await response.json();
            setPrices(data);
        } catch (error) {
            showMessage('Fiyatlar alınamadı', 'error');
        }
    };

    const handlePriceUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE}/prices`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(prices),
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('Fiyatlar başarıyla güncellendi!', 'success');
                fetchPrices(); // Yenile
            } else {
                showMessage(data.error || 'Güncelleme başarısız', 'error');
            }
        } catch (error) {
            showMessage('Sunucu hatası', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleBasePriceChange = (key, value) => {
        setPrices(prev => ({
            ...prev,
            basePrices: {
                ...prev.basePrices,
                [key]: parseInt(value) || 0
            }
        }));
    };

    const handleDistrictChange = (index, field, value) => {
        setPrices(prev => ({
            ...prev,
            districts: prev.districts.map((district, i) => 
                i === index 
                    ? { ...district, [field]: field === 'cost' ? parseInt(value) || 0 : value }
                    : district
            )
        }));
    };

    const addDistrict = () => {
        setPrices(prev => ({
            ...prev,
            districts: [...prev.districts, { name: 'Yeni İlçe', cost: 0 }]
        }));
    };

    const removeDistrict = (index) => {
        setPrices(prev => ({
            ...prev,
            districts: prev.districts.filter((_, i) => i !== index)
        }));
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <div className="mx-auto h-12 w-12 bg-blue-700 rounded-full flex items-center justify-center">
                            <Lock className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Admin Panel
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Fiyat listesini yönetmek için giriş yapın
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <input
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Kullanıcı Adı"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Şifre"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                            </button>
                        </div>
                    </form>

                    {message && (
                        <div className={`mt-4 p-3 rounded-md flex items-center gap-2 ${
                            messageType === 'success' ? 'bg-green-50 text-green-800' :
                            messageType === 'error' ? 'bg-red-50 text-red-800' :
                            'bg-blue-50 text-blue-800'
                        }`}>
                            {messageType === 'success' ? <CheckCircle className="h-4 w-4" /> :
                             messageType === 'error' ? <AlertCircle className="h-4 w-4" /> :
                             <AlertCircle className="h-4 w-4" />}
                            {message}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white shadow rounded-lg mb-8 p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Fiyat Listesi Yönetimi</h1>
                            <p className="text-gray-600 mt-1">Son güncelleme: {prices?.lastUpdated ? new Date(prices.lastUpdated).toLocaleString('tr-TR') : 'Bilinmiyor'}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            <LogOut className="h-4 w-4" />
                            Çıkış
                        </button>
                    </div>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-md flex items-center gap-2 ${
                        messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
                        messageType === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
                        'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                        {messageType === 'success' ? <CheckCircle className="h-5 w-5" /> :
                         messageType === 'error' ? <AlertCircle className="h-5 w-5" /> :
                         <AlertCircle className="h-5 w-5" />}
                        {message}
                    </div>
                )}

                {prices && (
                    <form onSubmit={handlePriceUpdate} className="space-y-8">
                        {/* Base Fiyatlar */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Temel Fiyatlar (Fabrika Çıkış)</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ø 8 mm (₺/ton)</label>
                                    <input
                                        type="number"
                                        value={prices.basePrices.p8}
                                        onChange={(e) => handleBasePriceChange('p8', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ø 10 mm (₺/ton)</label>
                                    <input
                                        type="number"
                                        value={prices.basePrices.p10}
                                        onChange={(e) => handleBasePriceChange('p10', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ø 12-32 mm (₺/ton)</label>
                                    <input
                                        type="number"
                                        value={prices.basePrices.p12}
                                        onChange={(e) => handleBasePriceChange('p12', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* İlçe Nakliye Ücretleri */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">İlçe Nakliye Ücretleri</h2>
                                <button
                                    type="button"
                                    onClick={addDistrict}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm"
                                >
                                    Yeni İlçe Ekle
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İlçe Adı</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nakliye Ücreti (₺)</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {prices.districts.map((district, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="text"
                                                        value={district.name}
                                                        onChange={(e) => handleDistrictChange(index, 'name', e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="number"
                                                        value={district.cost}
                                                        onChange={(e) => handleDistrictChange(index, 'cost', e.target.value)}
                                                        className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDistrict(index)}
                                                        className="text-red-600 hover:text-red-900 text-sm"
                                                    >
                                                        Sil
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Kaydet Butonu */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />
                                {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
