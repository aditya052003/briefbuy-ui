/** Frontend-only preview adapter. Never use as payment authorization or evidence. */
import {catalog,validateContract,solve,basicExplanation,check,liveCatalog,fingerprint,addEvent,type Purchase} from './engine.ts';
const KEY='briefbuy-ui-preview-v1';
function read():Purchase[]{const raw=localStorage.getItem(KEY);if(!raw)return [];try{return JSON.parse(raw);}catch{throw new Error('Preview data is invalid. Clear this site’s local storage and reload.');}}
function save(p:Purchase){const rows=read();localStorage.setItem(KEY,JSON.stringify([p,...rows.filter(x=>x.id!==p.id)].slice(0,30)));return structuredClone(p);}
export async function previewRequest(url:string,body?:any):Promise<any>{
 if(url==='/api/workspace')return {catalog,purchases:read(),integrations:{ai:false,paypal:false,model:null}};
 if(url==='/api/purchase'){
  validateContract(body.contract);
  const contract=body.contract, basket=solve(contract,catalog);
  const p:Purchase={id:crypto.randomUUID(),brief:String(body.brief||''),contract,basket,previous:null,scenario:'normal',status:basket?'review':'infeasible',events:[],explanation:basicExplanation(contract,basket),engine:'Local preview planner · no AI',created:new Date().toISOString()};
  addEvent(p,'Preview spending contract created','Local sample data only. No backend or payment request.','info');
  addEvent(p,basket?'Preview basket checked':'No feasible preview basket',p.explanation,basket?'pass':'block');
  return save(p);
 }
 if(url==='/api/action'){
  const p=read().find(x=>x.id===body.id);if(!p)throw new Error('Preview purchase not found.');
  if(['checkout','capture'].includes(body.action))throw new Error('Payments are disabled in this frontend preview. Connect the real backend in Codex; do not simulate a successful payment.');
  if(body.action==='scenario'){
   if(!p.basket)throw new Error('Create a feasible basket first.');
   if(!['price','stock'].includes(body.scenario))throw new Error('Unknown preview scenario.');
   p.scenario=body.scenario;
   const issues=check(p.contract,p.basket,liveCatalog(p.scenario));
   p.approvedFingerprint=undefined;p.status=issues.length?'blocked':'review';
   addEvent(p,issues.length?'Checkout blocked in preview':'Preview scenario applied',issues.length?issues.join(' '):'Basket unaffected. Approval reset.',issues.length?'block':'info');
  }else if(body.action==='repair'){
   p.previous=p.basket;p.basket=solve(p.contract,liveCatalog(p.scenario));p.approvedFingerprint=undefined;p.status=p.basket?'review':'infeasible';p.explanation=basicExplanation(p.contract,p.basket);
   addEvent(p,p.basket?'Preview replacement checked':'No feasible preview replacement',p.basket?'Fresh approval required. No payment attempted.':p.explanation,p.basket?'pass':'block');
  }else if(body.action==='approve'){
   if(!['review','approved'].includes(p.status))throw new Error('Repair the preview basket before approving.');
   const issues=check(p.contract,p.basket,liveCatalog(p.scenario));if(issues.length)throw new Error(issues.join(' '));
   p.status='approved';p.approvedFingerprint=fingerprint(p.basket!);
   addEvent(p,'Preview approval recorded','Local UI interaction only; not authorization for a real or sandbox payment.','info');
  }else throw new Error('Unknown preview action.');
  return save(p);
 }
 throw new Error('Unknown preview route.');
}
