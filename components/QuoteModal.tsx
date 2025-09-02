
import React, { useState } from 'react';
import { useQuote } from '../contexts/QuoteContext';
import { CloseIcon } from './icons/CloseIcon';
import { PlusIcon } from './icons/PlusIcon';
import { MinusIcon } from './icons/MinusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const { quoteItems, updateQuantity, removeFromQuote, clearQuote, itemCount } = useQuote();
  
  // Form State
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // New state for receipt view
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptText, setReceiptText] = useState('');
  const [isCopied, setIsCopied] = useState(false);


  if (!isOpen) return null;

  const resetFormAndClose = () => {
    setCompanyName('');
    setGstNumber('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setNotes('');
    setShowReceipt(false);
    setReceiptText('');
    setIsCopied(false);
    onClose();
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || itemCount === 0) {
        alert("Please fill all details and add items to your cart.");
        return;
    }

    const poNumber = `UT-${Math.floor(10000 + Math.random() * 90000)}`;
    const today = new Date().toLocaleDateString('en-CA');
    const pad = (str: string, len: number) => str.padEnd(len, ' ');

    const header = `
          ******************************************************
          *                  PURCHASE ORDER                    *
          ******************************************************
          
    United things - Your B2B Supply Partner
    ------------------------------------------------------
    PO Number: ${poNumber}
    Date:      ${today}

    BILL TO:
    ------------------------------------------------------
    ${pad('Company:', 15)}${companyName}
    ${pad('GST Number:', 15)}${gstNumber}
    ${pad('Contact:', 15)}${contactPerson}
    ${pad('Email:', 15)}${email}
    ${pad('Phone:', 15)}${phone}
    `;

    const itemsHeader = `
    =======================================================================
      ITEM DESCRIPTION                  QTY      UNIT PRICE      LINE TOTAL
    =======================================================================
    `;
    
    let itemsBody = '';
    quoteItems.forEach(item => {
        const name = item.product.name.length > 28 ? item.product.name.substring(0, 27) + '…' : item.product.name;
        const qty = item.quantity.toString();
        const price = `₹${item.product.price.toFixed(2)}`;
        const total = `₹${(item.product.price * item.quantity).toFixed(2)}`;

        const formatRow = (c1: string, c2: string, c3: string, c4: string) => 
            `${c1.padEnd(33)}${c2.padStart(5)}  ${c3.padStart(12)}  ${c4.padStart(12)}\n`;
        
        itemsBody += formatRow(name, qty, price, total);
    });

    const totalValue = quoteItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    const summary = `
    =======================================================================
                                                     SUBTOTAL:  ${`₹${totalValue.toFixed(2)}`.padStart(12)}
                                                        TAXES:  ${'Included'.padStart(12)}
                                                  GRAND TOTAL:  ${`₹${totalValue.toFixed(2)}`.padStart(12)}
    =======================================================================
    `;

    const footer = `
    Notes:
    ${notes || 'No additional notes provided.'}

    ------------------------------------------------------
    Thank you for your order!
    United things
    C Zone, Plot No. 7 & 7A, Thane - Belapur Rd, Navi Mumbai
    `;

    const fullReceipt = header + itemsHeader + itemsBody + summary + footer;
    
    setReceiptText(fullReceipt);
    setShowReceipt(true);
  };
  
  const totalValue = quoteItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(receiptText).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const EmptyCart = () => (
    <div className="flex-grow flex flex-col justify-center items-center p-6 text-center">
        <div className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        </div>
      <h3 className="text-xl font-semibold mt-4 text-brand-text">Your cart is empty</h3>
      <p className="text-gray-500 mt-1">Looks like you haven't added any items yet.</p>
      <button onClick={onClose} className="mt-6 bg-brand-blue text-white font-bold py-2 px-6 rounded-md hover:bg-brand-blue-dark transition-colors active:scale-95">
        Continue Shopping
      </button>
    </div>
  );
  
  const ReceiptView = () => (
    <div className="p-8 flex flex-col items-center text-center flex-grow overflow-y-auto">
        <h3 className="text-2xl font-bold text-brand-blue mb-4">Your Order is Ready</h3>
        <p className="text-gray-600 mb-6 max-w-lg">Please copy the Purchase Order below and send it to us via email at <span className="font-semibold">unitedthings19@gmail.com</span>.</p>
        <textarea
            readOnly
            value={receiptText}
            className="w-full h-96 p-4 border rounded-md bg-gray-50 font-mono text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
        />
        <div className="flex space-x-4 mt-6">
            <button 
                onClick={handleCopyToClipboard}
                className={`font-bold py-2 px-6 rounded-md transition-colors w-40 active:scale-95 ${isCopied ? 'bg-green-500 text-white' : 'bg-brand-blue text-white hover:bg-brand-blue-dark'}`}
            >
                {isCopied ? 'Copied!' : 'Copy Receipt'}
            </button>
            <button 
                onClick={() => {
                    clearQuote();
                    resetFormAndClose();
                }}
                className="bg-gray-600 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-700 transition-colors active:scale-95"
            >
                Done
            </button>
        </div>
    </div>
  );

  const isFormValid = companyName && gstNumber && contactPerson && email && phone;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={resetFormAndClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
          <h2 className="text-2xl font-bold text-brand-blue">
            {showReceipt ? 'Purchase Order Generated' : 'Your Cart'}
          </h2>
          <button onClick={resetFormAndClose} className="text-gray-500 hover:text-gray-800"><CloseIcon /></button>
        </div>
        
        {showReceipt ? <ReceiptView /> : (
            itemCount === 0 ? <EmptyCart /> : (
              <div className="flex-grow p-6 overflow-y-auto">
                <form onSubmit={handlePlaceOrder}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                    {quoteItems.map(item => (
                        <div key={item.product.id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0"/>
                        <div className="flex-grow">
                            <h4 className="font-bold">{item.product.name}</h4>
                            <p className="text-sm text-gray-500">Price: ₹{item.product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 active:scale-90"><MinusIcon /></button>
                            <span className="w-10 text-center font-semibold">{item.quantity}</span>
                            <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 active:scale-90"><PlusIcon /></button>
                        </div>
                        <div className="font-bold w-20 text-right">
                            ₹{(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        <button type="button" onClick={() => removeFromQuote(item.product.id)} className="text-red-500 hover:text-red-700 active:scale-90"><TrashIcon /></button>
                        </div>
                    ))}
                    </div>

                    <div className="lg:col-span-1">
                      <div className="sticky top-0">
                          <div className="bg-gray-50 rounded-lg p-6 space-y-4 border">
                              <h3 className="text-xl font-semibold border-b pb-3">Order Summary</h3>
                              
                              <div className="flex justify-between text-lg">
                                  <span className="font-semibold text-gray-600">Total Amount:</span>
                                  <span className="font-bold text-brand-blue">₹{totalValue.toFixed(2)}</span>
                              </div>
                              
                              <div className="border-t pt-4">
                                  <h3 className="text-lg font-semibold mb-4">Your Details</h3>
                                  <div className="space-y-4">
                                      <input type="text" placeholder="Company Name" required value={companyName} onChange={e => setCompanyName(e.target.value)} className="p-2 border rounded-md w-full focus:ring-2 focus:ring-brand-blue/50 focus:outline-none text-gray-800 bg-white" />
                                      <input type="text" placeholder="Company GST Number (Mandatory)" required value={gstNumber} onChange={e => setGstNumber(e.target.value)} className="p-2 border rounded-md w-full focus:ring-2 focus:ring-brand-blue/50 focus:outline-none text-gray-800 bg-white" />
                                      <input type="text" placeholder="Contact Person" required value={contactPerson} onChange={e => setContactPerson(e.target.value)} className="p-2 border rounded-md w-full focus:ring-2 focus:ring-brand-blue/50 focus:outline-none text-gray-800 bg-white" />
                                      <input type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} className="p-2 border rounded-md w-full focus:ring-2 focus:ring-brand-blue/50 focus:outline-none text-gray-800 bg-white" />
                                      <input type="tel" placeholder="Phone Number" required value={phone} onChange={e => setPhone(e.target.value)} className="p-2 border rounded-md w-full focus:ring-2 focus:ring-brand-blue/50 focus:outline-none text-gray-800 bg-white"/>
                                      <textarea placeholder="Additional notes or delivery address..." value={notes} onChange={e => setNotes(e.target.value)} className="p-2 border rounded-md w-full h-24 focus:ring-2 focus:ring-brand-blue/50 focus:outline-none text-gray-800 bg-white"></textarea>
                                  </div>
                              </div>

                              <button 
                                type="submit" 
                                disabled={!isFormValid}
                                className="w-full bg-brand-blue text-white font-bold py-3 px-4 rounded-md mt-2 hover:bg-brand-blue-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-95"
                              >
                                Place Order
                              </button>
                          </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default QuoteModal;