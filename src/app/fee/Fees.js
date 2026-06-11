import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  CreditCard, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  ArrowRight,
  Shield,
  Zap
} from 'lucide-react';

export default function Fees() {
  const { user, role, isAuthenticated } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Demo fee data - in production, fetch from API
  const feeData = {
    total: 4800,
    paid: user?.fee_status === 'Paid' ? 4800 : user?.fee_status === 'Partial' ? 2400 : 0,
    pending: user?.fee_status === 'Paid' ? 0 : user?.fee_status === 'Partial' ? 2400 : 4800,
    status: user?.fee_status || 'Pending',
    breakdown: [
      { item: 'Tuition Fee (Annual)', amount: 3600, paid: user?.fee_status === 'Paid' ? 3600 : user?.fee_status === 'Partial' ? 1800 : 0 },
      { item: 'Examination Fee', amount: 600, paid: user?.fee_status === 'Paid' ? 600 : user?.fee_status === 'Partial' ? 300 : 0 },
      { item: 'Library & Lab Fee', amount: 400, paid: user?.fee_status === 'Paid' ? 400 : user?.fee_status === 'Partial' ? 200 : 0 },
      { item: 'Sports & Activities', amount: 200, paid: user?.fee_status === 'Paid' ? 200 : user?.fee_status === 'Partial' ? 100 : 0 },
    ]
  };

  const transactions = [
    { id: 'TXN-2026-001', date: 'Jan 15, 2026', amount: 1200, type: 'Tuition Fee', status: 'paid' },
    { id: 'TXN-2026-002', date: 'Feb 15, 2026', amount: 1200, type: 'Tuition Fee', status: 'paid' },
    { id: 'TXN-2026-003', date: 'Mar 15, 2026', amount: 1200, type: 'Tuition Fee', status: user?.fee_status === 'Paid' ? 'paid' : 'pending' },
    { id: 'TXN-2026-004', date: 'Apr 15, 2026', amount: 1200, type: 'Tuition Fee', status: user?.fee_status === 'Paid' ? 'paid' : 'pending' },
  ];

  const handlePayment = () => {
    setShowPaymentModal(false);
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 3000);
  };

  const getStatusColor = (status) => {
    if (status === 'Paid') return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (status === 'Partial') return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getStatusIcon = (status) => {
    if (status === 'Paid') return <CheckCircle className="w-5 h-5 text-emerald-600" />;
    if (status === 'Partial') return <Clock className="w-5 h-5 text-amber-600" />;
    return <AlertCircle className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Fee Management</h1>
        <p className="text-slate-500">View fee status, payment history, and make secure payments.</p>
      </div>

      {/* Payment Success Toast */}
      {paymentSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 animate-fade-in-up">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
          <div>
            <p className="font-semibold text-emerald-800">Payment Successful!</p>
            <p className="text-sm text-emerald-600">Your fee has been cleared. You can now download your admit cards.</p>
          </div>
        </div>
      )}

      {/* Student Info Banner */}
      {isAuthenticated && role === 'student' && (
        <div className="mb-6 glass-card rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-schoolBlue to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
            {user?.student_name?.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{user?.student_name}</p>
            <p className="text-sm text-slate-500">Reg No: {user?.reg_no} • {user?.class_name}</p>
          </div>
          <div className={`ml-auto px-4 py-2 rounded-xl border font-medium text-sm flex items-center gap-2 ${getStatusColor(feeData.status)}`}>
            {getStatusIcon(feeData.status)}
            {feeData.status}
          </div>
        </div>
      )}

      {/* Fee Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-2xl font-bold text-emerald-600">${feeData.paid.toLocaleString()}</span>
          </div>
          <p className="text-sm text-slate-600 font-medium">Total Paid</p>
          <div className="mt-3 w-full bg-emerald-100 rounded-full h-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${(feeData.paid / feeData.total) * 100}%` }} 
            />
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-orange-600">${feeData.pending.toLocaleString()}</span>
          </div>
          <p className="text-sm text-slate-600 font-medium">Pending Amount</p>
          <div className="mt-3 w-full bg-orange-100 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${(feeData.pending / feeData.total) * 100}%` }} 
            />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">${feeData.total.toLocaleString()}</span>
          </div>
          <p className="text-sm text-slate-600 font-medium">Annual Fee Total</p>
          <p className="text-xs text-slate-400 mt-2">Academic Year 2025-2026</p>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-schoolBlue" />
            Fee Breakdown
          </h3>
          <div className="space-y-3">
            {feeData.breakdown.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.paid === item.amount ? 'bg-emerald-500' : item.paid > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
                  <span className="text-sm font-medium text-slate-700">{item.item}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">${item.amount}</p>
                  <p className={`text-xs ${item.paid === item.amount ? 'text-emerald-600' : 'text-orange-600'}`}>
                    {item.paid === item.amount ? 'Paid' : `Paid: $${item.paid}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pay Fee CTA */}
        <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Secure Payment</h3>
              <p className="text-sm text-slate-300">Pay your pending fees securely</p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-slate-300 mb-2">Pending Amount</p>
            <p className="text-3xl font-bold">${feeData.pending.toLocaleString()}</p>
          </div>

          <button
            onClick={() => setShowPaymentModal(true)}
            disabled={feeData.pending === 0}
            className={`w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              feeData.pending === 0
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-white text-slate-900 hover:bg-slate-100 shadow-lg'
            }`}
          >
            {feeData.pending === 0 ? (
              <>All Dues Cleared</>
            ) : (
              <>
                Pay ${feeData.pending.toLocaleString()} Now
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {feeData.pending > 0 && (
            <p className="text-xs text-slate-400 mt-3 text-center">
              ⚠ Clear your fees to enable admit card download
            </p>
          )}
        </div>
      </div>

      {/* Payment History */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-200/50">
          <h2 className="text-lg font-bold text-slate-900">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Transaction ID</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Type</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((txn, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 font-mono">{txn.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{txn.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{txn.type}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">${txn.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      txn.status === 'paid' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-orange-50 text-orange-600'
                    }`}>
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setShowPaymentModal(false)} />
          
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="bg-gradient-to-br from-schoolBlue to-blue-600 p-6 text-white">
              <h2 className="text-xl font-bold">Complete Payment</h2>
              <p className="text-blue-100 text-sm">Pay your pending fees securely</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6 p-4 bg-slate-50 rounded-xl">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">Pending Amount</span>
                  <span className="text-lg font-bold text-slate-900">${feeData.pending.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Late Fee Penalty</span>
                  <span className="text-sm font-bold text-red-600">$50</span>
                </div>
                <div className="border-t border-slate-200 mt-3 pt-3 flex justify-between">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="font-bold text-xl text-schoolBlue">${(feeData.pending + 50).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handlePayment}
                  className="w-full py-3 bg-gradient-to-r from-schoolBlue to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Pay ${(feeData.pending + 50).toLocaleString()}
                </button>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}