import test from 'node:test';
import assert from 'node:assert/strict';
import {previewRequest} from '../src/lib/preview-api.ts';
const memory=new Map<string,string>();
Object.defineProperty(globalThis,'localStorage',{value:{getItem:(k:string)=>memory.get(k)??null,setItem:(k:string,v:string)=>memory.set(k,v)}});
const contract={people:3,budget:45000,categories:['keyboard','mouse','headset'],wireless:false};
test('preview contract → $411 → approval → $486 blocked → $441 recovery with fresh approval',async()=>{
 let p=await previewRequest('/api/purchase',{brief:'Sample brief',contract});assert.equal(p.basket.total,41100);
 p=await previewRequest('/api/action',{id:p.id,action:'approve'});assert.equal(p.status,'approved');
 p=await previewRequest('/api/action',{id:p.id,action:'scenario',scenario:'price'});assert.equal(p.status,'blocked');assert.equal(p.approvedFingerprint,undefined);
 await assert.rejects(previewRequest('/api/action',{id:p.id,action:'approve'}));
 p=await previewRequest('/api/action',{id:p.id,action:'repair'});assert.equal(p.status,'review');assert.equal(p.basket.total,44100);assert.equal(p.approvedFingerprint,undefined);
 const loaded=await previewRequest('/api/workspace');assert.equal(loaded.purchases[0].id,p.id);assert.equal(loaded.integrations.ai,false);assert.equal(loaded.integrations.paypal,false);
 await assert.rejects(previewRequest('/api/action',{id:p.id,action:'checkout'}));await assert.rejects(previewRequest('/api/action',{id:p.id,action:'capture'}));
});
test('impossible budget cannot be approved',async()=>{const p=await previewRequest('/api/purchase',{brief:'Impossible',contract:{...contract,budget:5000}});assert.equal(p.status,'infeasible');assert.equal(p.basket,null);await assert.rejects(previewRequest('/api/action',{id:p.id,action:'approve'}));});
test('stock loss produces a replacement without the sold-out item',async()=>{let p=await previewRequest('/api/purchase',{brief:'Stock',contract});p=await previewRequest('/api/action',{id:p.id,action:'scenario',scenario:'stock'});assert.equal(p.status,'blocked');p=await previewRequest('/api/action',{id:p.id,action:'repair'});assert.ok(p.basket.items.every((x:any)=>x.id!=='h1'));});
