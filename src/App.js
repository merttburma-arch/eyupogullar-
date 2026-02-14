// src/App.js
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import {
    Menu,
    X,
    Hammer,
    Building2,
    Truck,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Linkedin,
    ArrowRight,
    CheckCircle,
    AlertCircle,
} from "lucide-react";

// Images
import kaptan from "./img/kaptan.png";
import tosyali from "./img/tosyalı.png";
import yesil from "./img/yesıl.png";
import kardemir from "./img/kardemir.webp";
import icdas from "./img/icdas.png";
import icc from "./img/içc.png";
import diler from "./img/diler.png";
import colakoglu from "./img/colakıglu.png";

import demir from "./img/demirrr.png";
import kentselDönüşüm from "./img/kentselDönüşüm.jpg";

// Admin
import AdminPanel from "./components/AdminPanel";

// API base (Localde localhost, prod’da env ile değiştir)
const API_BASE = "https://backend-production-a12c.up.railway.app";

/* =========================
   NAVBAR (HASH ROUTER UYUMLU)
   ========================= */
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // HashRouter varken href="#home" kullanmak router'ı bozar.
    // O yüzden scroll ile gidiyoruz.
    const menuItems = [
        { name: "Ana Sayfa", id: "home" },
        { name: "Fiyat Listesi", id: "prices" },
        { name: "Hakkımızda", id: "about" },
        { name: "Hizmetler", id: "services" },
        { name: "Projeler", id: "projects" },
        { name: "İletişim", id: "contact" },
    ];

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className="fixed w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
            <span className="ml-1 text-2xl font-bold text-gray-900 tracking-tight">
              EYÜB<span className="text-blue-700">OĞULLARI</span>
            </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() => scrollTo(item.id)}
                                className="text-gray-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                {item.name}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={() => scrollTo("contact")}
                            className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition shadow-lg shadow-blue-700/20"
                        >
                            Teklif Al
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {menuItems.map((item) => (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() => {
                                    scrollTo(item.id);
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                            >
                                {item.name}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={() => {
                                scrollTo("contact");
                                setIsOpen(false);
                            }}
                            className="block w-full text-left px-3 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800"
                        >
                            Teklif Al
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

/* =========================
   PRICE LIST
   ========================= */
const PriceList = () => {
    const today = new Date().toLocaleDateString("tr-TR");
    const [selectedDistrict, setSelectedDistrict] = useState("Esenyurt");
    const [prices, setPrices] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/prices`);
                const data = await response.json();
                setPrices(data);
            } catch (error) {
                console.error("Fiyatlar alınamadı:", error);
                // fallback
                setPrices({
                    basePrices: { p8: 24500, p10: 24200, p12: 23900 },
                    districts: [
                        { name: "Esenyurt", cost: 0 },
                        { name: "Beylikdüzü", cost: 50 },
                        { name: "Avcılar", cost: 100 },
                        { name: "Büyükçekmece", cost: 150 },
                        { name: "Bağcılar", cost: 150 },
                        { name: "Bahçelievler", cost: 150 },
                        { name: "Küçükçekmece", cost: 150 },
                        { name: "Bakırköy", cost: 200 },
                        { name: "Bayrampaşa", cost: 200 },
                        { name: "Esenler", cost: 200 },
                        { name: "Güngören", cost: 200 },
                        { name: "Zeytinburnu", cost: 250 },
                        { name: "Başakşehir", cost: 250 },
                        { name: "Eyüpsultan", cost: 250 },
                        { name: "Gaziosmanpaşa", cost: 250 },
                        { name: "Kağıthane", cost: 250 },
                        { name: "Sultangazi", cost: 300 },
                        { name: "Fatih", cost: 300 },
                        { name: "Beyoğlu", cost: 300 },
                        { name: "Şişli", cost: 300 },
                        { name: "Üsküdar", cost: 350 },
                        { name: "Ümraniye", cost: 350 },
                        { name: "Kadıköy", cost: 350 },
                        { name: "Ataşehir", cost: 300 },
                        { name: "Kartal", cost: 300 },
                        { name: "Maltepe", cost: 300 },
                        { name: "Beşiktaş", cost: 350 },
                        { name: "Çekmeköy", cost: 350 },
                        { name: "Pendik", cost: 350 },
                        { name: "Sancaktepe", cost: 400 },
                        { name: "Sultanbeyli", cost: 400 },
                        { name: "Beykoz", cost: 400 },
                        { name: "Sarıyer", cost: 400 },
                        { name: "Tuzla", cost: 400 },
                        { name: "Arnavutköy", cost: 400 },
                        { name: "Çatalca", cost: 600 },
                        { name: "Silivri", cost: 700 },
                        { name: "Şile", cost: 800 },
                    ],
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    if (loading || !prices) {
        return (
            <section
                id="prices"
                className="py-16 bg-white relative z-20 -mt-10 mb-10"
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-2xl border border-blue-200 p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Fiyat listesi yükleniyor...</p>
                    </div>
                </div>
            </section>
        );
    }

    const currentDistrict =
        prices.districts.find((d) => d.name === selectedDistrict) ||
        prices.districts[0];

    const getFinalPrice = (base) => {
        return (base + currentDistrict.cost).toLocaleString("tr-TR");
    };

    return (
        <section id="prices" className="py-16 bg-white relative z-20 -mt-10 mb-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-2xl border border-blue-200 overflow-hidden">
                    <div className="bg-blue-800 p-6 md:p-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h3 className="text-white font-bold text-2xl">Demir Fiyat Listesi</h3>
                            <p className="text-blue-200 mt-1">{today} Tarihli Güncel Liste</p>
                        </div>

                        <div className="w-full md:w-auto">
                            <label className="text-blue-200 text-xs font-bold uppercase tracking-wider block mb-2 text-left">
                                Teslimat Yapılacak İlçe:
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    className="w-full md:w-64 appearance-none bg-white text-gray-900 font-bold py-3 px-4 pr-8 rounded-lg shadow-lg border-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                                >
                                    {prices.districts.map((d) => (
                                        <option key={d.name} value={d.name}>
                                            {d.name}
                                        </option>
                                    ))}
                                </select>
                                <MapPin className="absolute right-3 top-3.5 text-blue-800 h-5 w-5 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 py-3 text-center border-b border-blue-100">
            <span className="text-blue-800 font-bold text-lg">
              📍 {selectedDistrict} Şantiye Teslim Fiyatlarıdır
            </span>
                    </div>

                    <div className="p-0">
                        <table className="w-full">
                            <thead>
                            <tr className="bg-white border-b border-gray-100">
                                <th className="text-left py-4 px-6 text-gray-500 font-semibold text-sm uppercase">
                                    Ürün
                                </th>
                                <th className="text-right py-4 px-6 text-gray-500 font-semibold text-sm uppercase">
                                    Birim Fiyat
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            <tr className="group hover:bg-blue-50 transition">
                                <td className="py-5 px-6">
                                    <div className="font-bold text-gray-800 text-lg group-hover:text-blue-700">
                                        Ø 8 mm İnşaat Demiri
                                    </div>
                                    <div className="text-sm text-gray-400">Kalite: B420C</div>
                                </td>
                                <td className="py-5 px-6 text-right">
                                    <div className="font-black text-2xl text-blue-900">
                                        {getFinalPrice(prices.basePrices.p8)} ₺
                                    </div>
                                    <div className="text-xs text-gray-400">Ton Fiyatı</div>
                                </td>
                            </tr>

                            <tr className="group hover:bg-blue-50 transition">
                                <td className="py-5 px-6">
                                    <div className="font-bold text-gray-800 text-lg group-hover:text-blue-700">
                                        Ø 10 mm İnşaat Demiri
                                    </div>
                                    <div className="text-sm text-gray-400">Kalite: B420C</div>
                                </td>
                                <td className="py-5 px-6 text-right">
                                    <div className="font-black text-2xl text-blue-900">
                                        {getFinalPrice(prices.basePrices.p10)} ₺
                                    </div>
                                    <div className="text-xs text-gray-400">Ton Fiyatı</div>
                                </td>
                            </tr>

                            <tr className="group hover:bg-blue-50 transition">
                                <td className="py-5 px-6">
                                    <div className="font-bold text-gray-800 text-lg group-hover:text-blue-700">
                                        Ø 12 - Ø 32 mm Arası
                                    </div>
                                    <div className="text-sm text-gray-400">Kalite: B420C</div>
                                </td>
                                <td className="py-5 px-6 text-right">
                                    <div className="font-black text-2xl text-blue-900">
                                        {getFinalPrice(prices.basePrices.p12)} ₺
                                    </div>
                                    <div className="text-xs text-gray-400">Ton Fiyatı</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-gray-50 p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                            <span>
                Fiyatlara <strong>KDV </strong> Nakliye dahildir.
              </span>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <a
                                href={`https://wa.me/905330482257?text=Merhaba,%20${selectedDistrict}%20için%20sipariş%20vermek%20istiyorum.`}
                                className="flex-1 bg-green-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-green-600 transition flex items-center justify-center gap-2 shadow-sm text-sm"
                            >
                                WhatsApp Sipariş
                            </a>
                            <a
                                href="tel:+905330482257"
                                className="flex-1 bg-blue-700 text-white px-4 py-3 rounded-lg font-bold hover:bg-blue-800 transition flex items-center justify-center gap-2 shadow-sm text-sm"
                            >
                                Hemen Ara
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* =========================
   PARTNERS
   ========================= */
const Partners = () => {
    const partners = [
        { name: "İÇDAŞ", logo: icdas },
        { name: "KAPTAN GRUP", logo: kaptan },
        { name: "İDÇ", logo: icc },
        { name: "KARDEMİR", logo: kardemir },
        { name: "ÇOLAKOĞLU", logo: colakoglu },
        { name: "TOSYALI", logo: tosyali },
        { name: "DİLER", logo: diler },
        { name: "YEŞİL", logo: yesil },
    ];

    const duplicatedPartners = [...partners, ...partners];

    return (
        <section className="py-10 bg-white border-b border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <h3 className="text-center text-gray-400 font-semibold uppercase tracking-wider text-sm">
                    Çözüm Ortaklarımız ve Tedarikçilerimiz
                </h3>
            </div>

            <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

                <div className="flex w-max animate-scroll items-center">
                    {duplicatedPartners.map((partner, index) => (
                        <div key={index} className="flex items-center justify-center mx-10 min-w-[120px]">
                            <div className="flex items-center justify-center">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-20 w-auto object-contain drop-shadow-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* =========================
   ABOUT
   ========================= */
const About = () => (
    <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full z-0"></div>
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-700 rounded-lg z-0"></div>
                    <img
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80"
                        alt="Eyüboğulları Ofis"
                        className="relative z-10 rounded-lg shadow-xl w-full h-[500px] object-cover"
                    />
                </div>

                <div>
                    <h2 className="text-blue-700 font-bold tracking-wide uppercase text-sm mb-2">
                        Hakkımızda
                    </h2>
                    <h3 className="text-4xl font-bold text-gray-900 mb-6">
                        6 Yıllık Tecrübe ile <br />
                        Güven İnşa Ediyoruz
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Eyüboğulları İnşaat olarak, kurulduğumuz günden bu yana dürüstlük, kalite ve zamanında teslimat
                        ilkelerinden ödün vermeden çalışıyoruz. Hem üst yapı projelerinde hem de demir-çelik tedarik
                        zincirinde sektörün öncü firmalarından biri olmanın gururunu yaşıyoruz.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-blue-600 h-6 w-6" />
                            <span className="text-gray-800 font-medium">Zamanında ve Eksiksiz Teslimat</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-blue-600 h-6 w-6" />
                            <span className="text-gray-800 font-medium">
                Yüksek Kalite Standartları ve Sertifikalı Malzeme
              </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-blue-600 h-6 w-6" />
                            <span className="text-gray-800 font-medium">Müşteri Odaklı Çözüm Yaklaşımı</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

/* =========================
   HERO
   ========================= */
const Hero = () => (
    <section id="home" className="relative h-screen flex items-center">
        <div
            className="absolute inset-0 z-0"
            style={{
                backgroundImage:
                    'url("https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1950&q=80")',
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-slate-900/85"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="inline-block bg-blue-700 px-3 py-1 mb-4 text-sm font-semibold tracking-wide rounded-sm uppercase">
                İnşaat & Demir Çelik
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                Yapılarınızın <br /> <span className="text-blue-400">Temelindeki</span> Güç
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl text-gray-300">
                Eyüboğulları Ailesi Olarak Projenizin Her Aşamasında Yanınızdayız. Temelden çatıya anahtar teslim
                inşaat projeleri ve en uygun fiyatlı demir tedariğinde, sektörün güvenilen çözüm ortağınız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    type="button"
                    onClick={() => {
                        const el = document.getElementById("prices");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-blue-700 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50"
                >
                    Demir Fiyatı Al <ArrowRight className="h-5 w-5" />
                </button>

                <button
                    type="button"
                    onClick={() => {
                        const el = document.getElementById("projects");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-slate-900 transition text-center"
                >
                    Tamamlanan Yapılar
                </button>
            </div>
        </div>
    </section>
);

/* =========================
   STATS
   ========================= */
const Stats = () => (
    <div className="bg-blue-900 py-12 border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                <div>
                    <div className="text-4xl font-bold mb-2">25+</div>
                    <div className="text-blue-200">Tamamlanan Bina</div>
                </div>
                <div>
                    <div className="text-4xl font-bold mb-2">50.000+</div>
                    <div className="text-blue-200">Ton Yıllık Demir Satışı</div>
                </div>
                <div>
                    <div className="text-4xl font-bold mb-2">6</div>
                    <div className="text-blue-200">Yıllık Tecrübe</div>
                </div>
                <div>
                    <div className="text-4xl font-bold mb-2">A+</div>
                    <div className="text-blue-200">Kalite Standartları</div>
                </div>
            </div>
        </div>
    </div>
);

/* =========================
   SERVICES
   ========================= */
const Services = () => {
    const services = [
        {
            icon: <Building2 className="h-12 w-12" />,
            title: "Müteahhitlik & İnşaat",
            desc: "Konut ve ticari projelerinizde topraktan anahtar teslime kadar, güvenli ve yönetmeliklere uygun yapılar inşa ediyoruz.",
        },
        {
            icon: <Truck className="h-12 w-12" />,
            title: "Demir & Çelik Satışı",
            desc: "İÇDAŞ, Kaptan ve İDÇ bayiliklerimizle, projeleriniz için her çapta inşaat demirini şantiyenize teslim ediyoruz.",
        },
        {
            icon: <Hammer className="h-12 w-12" />,
            title: "Kentsel Dönüşüm",
            desc: "Eski ve riskli yapılarınızı, değerini koruyarak modern, sağlam ve depreme dayanıklı yaşam alanlarına dönüştürüyoruz.",
        },
    ];

    return (
        <section id="services" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Faaliyet Alanlarımız</h2>
                    <div className="w-20 h-1 bg-blue-700 mx-auto"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Sadece bina yapmıyoruz; projelerinizin en önemli hammaddesi olan demiri de en uygun koşullarda
                        tedarik ediyoruz.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white p-10 rounded-lg shadow-lg border-b-4 border-transparent hover:border-blue-700 hover:-translate-y-2 transition duration-300 group"
                        >
                            <div className="mb-6 bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-300">
                                {React.cloneElement(service.icon, {
                                    className:
                                        "h-10 w-10 text-blue-700 group-hover:text-white transition-colors duration-300",
                                })}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* =========================
   PROJECTS
   ========================= */
const Projects = () => {
    const projects = [
        { title: "Demir Tedariği", category: "Demir", image: demir },
        {
            title: "Müstakil Konut",
            category: "Müstakil Konut",
            image:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        },
        { title: "Kentsel Dönüşüm", category: "Konut", image: kentselDönüşüm },
    ];

    return (
        <section id="projects" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Son Projelerimiz</h2>
                    <div className="w-20 h-1 bg-blue-700 mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                                <span className="text-blue-200 font-medium mb-1">{project.category}</span>
                                <h3 className="text-white text-xl font-bold">{project.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* =========================
   CONTACT
   ========================= */
const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: "", type: "" });

    const handleChange = (e) => {
        setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({ show: false, message: "", type: "" });

        try {
            const response = await fetch(`${API_BASE}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setAlert({ show: true, message: data.message || "Mesaj gönderildi!", type: "success" });
                setFormData({ name: "", surname: "", email: "", message: "" });
            } else {
                setAlert({ show: true, message: data.error || "Mesaj gönderilemedi.", type: "error" });
            }
        } catch (error) {
            setAlert({
                show: true,
                message: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 mb-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Bizimle İletişime Geçin</h2>
                        <p className="text-slate-400 mb-8">
                            Projeleriniz için ücretsiz keşif ve fiyat teklifi almak istiyorsanız formu doldurun veya
                            iletişim kanallarımızdan bize ulaşın.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Phone className="text-blue-500 h-6 w-6" />
                                <span className="text-lg">+90 (533) 048 22 57</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="text-blue-500 h-6 w-6" />
                                <span className="text-lg">eyubogullariinsaat@gmail.com</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin className="text-blue-500 h-6 w-6 flex-shrink-0" />
                                <span className="text-lg leading-snug">
                  Nish İstanbul Çobançeşme, Sanayi Cd. No: 44,
                  <br />
                  PK:34196 Bahçelievler/İstanbul
                </span>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-blue-700 transition duration-300">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-blue-700 transition duration-300">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-blue-700 transition duration-300">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Adınız"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="bg-slate-800 border border-slate-700 p-4 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-white"
                            />
                            <input
                                type="text"
                                name="surname"
                                placeholder="Soyadınız"
                                value={formData.surname}
                                onChange={handleChange}
                                required
                                className="bg-slate-800 border border-slate-700 p-4 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-white"
                            />
                        </div>

                        <input
                            type="email"
                            name="email"
                            placeholder="E-posta Adresiniz"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-slate-800 border border-slate-700 p-4 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-white"
                        />

                        <textarea
                            name="message"
                            rows="4"
                            placeholder="Mesajınız"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="bg-slate-800 border border-slate-700 p-4 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-white"
                        ></textarea>

                        {alert.show && (
                            <div
                                className={`p-3 rounded-md text-sm ${
                                    alert.type === "success"
                                        ? "bg-green-900/50 text-green-200 border border-green-700"
                                        : "bg-red-900/50 text-red-200 border border-red-700"
                                }`}
                            >
                                {alert.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-700 text-white px-8 py-4 rounded-md font-bold hover:bg-blue-800 transition w-full uppercase tracking-wider shadow-lg hover:shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Gönderiliyor..." : "Gönder"}
                        </button>
                    </form>
                </div>

                <div className="w-full h-96 bg-slate-800 rounded-lg overflow-hidden shadow-2xl border border-slate-700 grayscale hover:grayscale-0 transition-all duration-500">
                    <iframe
                        src="https://maps.google.com/maps?q=Çobançeşme,+Sanayi+Cd.+No:+44,+Bahçelievler/İstanbul&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Eyüboğulları Ofis Konumu"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

/* =========================
   FOOTER
   ========================= */
const Footer = () => (
    <footer className="bg-slate-950 text-slate-500 py-8 text-center text-sm border-t border-slate-900">
        <p>© 2024 Eyüboğulları İnşaat ve Yapı Malzemelleri A.Ş. Tüm hakları saklıdır.</p>
    </footer>
);

/* =========================
   HOME PAGE WRAPPER
   ========================= */
function HomePage() {
    return (
        <div className="font-sans antialiased text-gray-900 bg-white">
            <Navbar />
            <Hero />
            <PriceList />
            <Stats />
            <Partners />
            <About />
            <Services />
            <Projects />
            <Contact />
            <Footer />
        </div>
    );
}

/* =========================
   APP (ROUTER)
   ========================= */
function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
