import {type ReactNode} from 'react'
import {type Campaign, type Kind, day, open, reward, safeUrl} from './store'
export const brandNav = [['dashboard','대시보드'],['campaigns','캠페인 만들기'],['applicants','신청자 관리'],['invoice','월 청구서'],['mall','몰 연결'],['account','사업자 정보']]
export const creatorNav = [['home','홈'],['discover','둘러보기'],['activity','내 캠페인'],['groups','내 공구'],['payout','정산'],['profile','프로필 편집'],['account','가입·연동']]
export function Logo(){return <div className="logo"><span aria-hidden="true">ㅁ</span>올인원 파트너스</div>}
export function Action({to,children,primary=false}:{to:string;children:ReactNode;primary?:boolean}){
  return <a className={primary?'primary':'outline'} href={'#/'+to}>{children}</a>
}
export function Title({name,context,children}:{name:string;context:string;children?:ReactNode}){
  return <header className="title"><div><span className="context">{context}</span><h1>{name}</h1></div>{children}</header>
}
export function Panel({title,children,extra}:{title:string;children:ReactNode;extra?:ReactNode}){
  return <section className="panel"><header><h2>{title}</h2>{extra}</header><div className="pane-body">{children}</div></section>
}
export function Field({label,children}:{label:string;children:ReactNode}){return <label className="field">{label}{children}</label>}
export function Tabs({items,current,onChange}:{items:readonly string[];current:string;onChange:(s:string)=>void}){
  return <div className="tabs">{items.map(k=><button key={k} aria-pressed={current===k} onClick={()=>onChange(k)}>{k}</button>)}</div>
}
export function Figures({items}:{items:[string,string|number][]}){
  return <div className="figures">{items.map(([k,v])=><div key={k}><small>{k}</small><strong>{v}</strong></div>)}</div>
}
export function Artwork({kind}:{kind:Kind}){
  return <span aria-hidden="true" className={'art art-'+({'공구':'group','시딩':'seed','UGC':'ugc'}[kind])}><i/><b/></span>
}
export function CampaignTile({c,brand,to}:{c:Campaign;brand:string;to:string}){
  const days=Math.max(0,Math.round((Date.parse(c.close)-Date.parse(day()))/86400000))
  return <a className="campaign-tile" href={'#/'+to}>
    <div className={'tile-image tone-'+c.kind}>{safeUrl(c.image)?<img src={c.image} alt=""/>:<Artwork kind={c.kind}/>}<span className="tag">{c.kind}</span></div>
    <div className="tile-text"><small>{brand} · {c.category}</small><h3>{c.title}</h3><p>{reward(c)}</p><div className="tile-data"><span>모집 {c.capacity}명 · 신청 {c.apps.filter(a=>a.status!=='취소').length}명</span><b>{open(c)?(days?'D−'+days:'오늘 마감'):c.phase==='심사 중'?c.phase:'모집 마감'}</b></div></div>
  </a>
}
export const value = (f:FormData,k:string)=>String(f.get(k)||'').trim()
export function details(items:[string,ReactNode][]){return <dl className="facts">{items.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>}
export async function copy(text:string, notify:(s:string)=>void){try{await navigator.clipboard.writeText(text);notify('복사했습니다.')}catch{notify('입력란의 내용을 선택해 복사해 주세요.')}}

