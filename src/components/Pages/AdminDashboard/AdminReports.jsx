import React, { useState } from "react";

const AdminReports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("month");
    const [reportType, setReportType] = useState("sales");

    const reportTypes = [
        { id: "sales", label: "Sales Report", icon: "💰" },
        { id: "events", label: "Event Performance", icon: "🎫" },
        { id: "users", label: "User Analytics", icon: "👥" },
        { id: "financial", label: "Financial Summary", icon: "📊" },
    ];

    const timePeriods = [
        { id: "week", label: "Last Week" },
        { id: "month", label: "Last Month" },
        { id: "quarter", label: "Last Quarter" },
        { id: "year", label: "Last Year" },
    ];

    return (
        <div className="space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
            {/* Header Section */}
            <div className="mb-8">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-black text-[#090040] mb-2">
                                📊 Reports & Analytics
                            </h1>
                            <p className="text-gray-600 text-lg">Generate and download comprehensive reports</p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="px-6 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#B13BFF]/30 transition-all duration-300"
                            >
                                {timePeriods.map(period => (
                                    <option key={period.id} value={period.id}>{period.label}</option>
                                ))}
                            </select>
                            <button className="px-6 py-3 bg-gradient-to-r from-[#471396] to-[#B13BFF] text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
                                📊 Generate Report
                            </button>
                        </div>
                    </div>
                </div>

                {/* Report Type Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {reportTypes.map((type) => (
                        <div
                            key={type.id}
                            onClick={() => setReportType(type.id)}
                            className={`cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${reportType === type.id
                                    ? "bg-gradient-to-r from-[#471396] to-[#B13BFF] text-white border-[#B13BFF] shadow-lg"
                                    : "bg-white text-gray-800 border-gray-200 hover:border-[#B13BFF]/30 hover:shadow-md"
                                } rounded-2xl p-6`}
                        >
                            <div className="text-center">
                                <div className="text-4xl mb-3">{type.icon}</div>
                                <h3 className={`font-bold text-lg ${reportType === type.id ? 'text-white' : 'text-gray-900'}`}>
                                    {type.label}
                                </h3>
                                <p className={`text-sm mt-2 ${reportType === type.id ? "text-white/80" : "text-gray-600"
                                    }`}>
                                    Generate detailed {type.label.toLowerCase()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Report Preview Area */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[#090040]">
                            {reportTypes.find(t => t.id === reportType)?.label} Preview
                        </h2>
                        <div className="flex gap-3">
                            <button className="px-6 py-2 bg-gradient-to-r from-[#471396] to-[#B13BFF] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                                📊 View Details
                            </button>
                            <button className="px-6 py-2 bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                                📥 Download
                            </button>
                        </div>
                    </div>

                    {/* Sample Report Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 border-l-4 border-l-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-600 font-semibold">Total Revenue</p>
                                    <p className="text-2xl font-black text-gray-900">$125,430</p>
                                </div>
                                <div className="text-3xl">💰</div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 border-l-4 border-l-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-600 font-semibold">Events Created</p>
                                    <p className="text-2xl font-black text-gray-900">45</p>
                                </div>
                                <div className="text-3xl">🎫</div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 border-l-4 border-l-[#B13BFF]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[#B13BFF] font-semibold">Tickets Sold</p>
                                    <p className="text-2xl font-black text-gray-900">2,847</p>
                                </div>
                                <div className="text-3xl">🎟️</div>
                            </div>
                        </div>
                    </div>

                    {/* Report Chart Placeholder */}
                    <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
                        <div className="mb-4">
                            <div className="text-6xl mb-4">📈</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Chart</h3>
                            <p className="text-gray-600">Detailed analytics and visualization will be displayed here</p>
                        </div>

                        {/* Sample Chart Bars */}
                        <div className="flex items-end justify-center gap-2 h-32 mt-8">
                            {[60, 80, 45, 90, 70, 85, 65].map((height, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-t from-[#471396] to-[#B13BFF] rounded-t-lg w-8 transition-all duration-500 hover:scale-105"
                                    style={{ height: `${height}%` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Reports */}
                <div className="mt-8 bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold text-[#090040] mb-6">
                        📋 Recent Reports
                    </h2>

                    <div className="space-y-4">
                        {[
                            { name: "Monthly Sales Report", date: "Dec 2024", size: "2.4 MB", type: "PDF" },
                            { name: "Event Performance Analysis", date: "Nov 2024", size: "1.8 MB", type: "Excel" },
                            { name: "User Engagement Report", date: "Nov 2024", size: "3.1 MB", type: "PDF" },
                            { name: "Financial Summary Q4", date: "Oct 2024", size: "1.2 MB", type: "PDF" },
                        ].map((report, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 border border-gray-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#471396] to-[#B13BFF] rounded-xl flex items-center justify-center text-white font-bold">
                                        📄
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{report.name}</h3>
                                        <p className="text-sm text-gray-600">{report.date} • {report.size} • {report.type}</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                                    📥 Download
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
