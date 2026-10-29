import { useState } from 'react';
import { site } from '../config/site';
import { waLink } from '../lib/whatsapp';
import { useTitle } from '../hooks/hooks';
export default function Wholesale() {
  useTitle('Wholesale');
  const [qty,setQty]=useState('25'); const [name,setName]=useState(''); const [business,setBusiness]=useState('');
  const msg=`Hi Qalb Studio, I am interested in wholesale. Name: ${name}. Business: ${business}. Estimated quantity: ${qty}. Please share availability, MOQ, pricing and delivery terms.`;
  return <section className="section page-top"><div className="container narrow"><header className="page-head"><p className="eyebrow">Wholesale enquiries</p><h1>Let’s build something together.</h1><p className="muted">Tell us a little about your store or group order. Pricing, minimum quantities and delivery terms are confirmed individually.</p></header>
  <form className="form" onSubmit={e=>{e.preventDefault();window.open(waLink(msg),'_blank','noopener,noreferrer')}}>
  <label><span>Your name *</span><input required value={name} onChange={e=>setName(e.target.value)}/></label>
  <label><span>Store / organisation</span><input value={business} onChange={e=>setBusiness(e.target.value)}/></label>
  <label><span>Estimated quantity</span><select value={qty} onChange={e=>setQty(e.target.value)}><option value="10">10–24 pieces</option><option value="25">25–49 pieces</option><option value="50">50–99 pieces</option><option value="100+">100+ pieces</option></select></label>
  <button className="btn btn-light" type="submit">Send wholesale enquiry</button></form></div></section>;
}
