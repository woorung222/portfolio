import {useEffect,useRef,useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Brand} from './brand'
import {Creator} from './creator'
import {Attachment,PublicProfile} from './profile'
import {read,storageKey,mine,type Model,type Props,safeUrl,changeCampaign,day} from './store'
import {Logo,brandNav,creatorNav,Panel,Title,Action} from './ui'
import './style.css'

function Review(p:Props){
  const [month,setMonth]=useState(day().slice(0,7))
  const waiting=p.m.campaigns.filter(c=>c.phase==='심사 중')
  const submissions=p.m.campaigns.flatMap(c=>c.apps.filter(a=>c.kind==='시딩'&&a.stage==='검수 중').map(a=>({c,a})))
  return <><Title name="운영자 미리보기" context="로컬 데모 / 심사 상태 확인"/><p>운영 서비스에서는 Django Admin에서 처리하는 단계입니다.</p>
    <Panel title="캠페인 심사">{waiting.length===0&&<p>심사 요청이 없습니다.</p>}{waiting.map(c=><div className="listitem" key={c.id}><div><small>{c.kind} · {c.phase}</small><h3>{c.title}</h3></div><button className="primary" onClick={()=>changeCampaign(p.edit,c.id,c=>{c.phase='모집 중'})}>모집 승인</button></div>)}</Panel>
    <Panel title="시딩 콘텐츠 검수">{!submissions.length&&<p>검수할 콘텐츠가 없습니다.</p>}{submissions.map(({c,a})=><div className="listitem" key={c.id+a.id}><div><b>{c.title}</b><p>주문번호 {a.orderNo}</p>{a.receipt&&<Action to={'files/'+a.receipt}>구매 인증 캡처</Action>}{a.content&&<a href={a.content} target="_blank" rel="noreferrer">콘텐츠 열기</a>}</div><form onSubmit={e=>{e.preventDefault();const reject=(e.nativeEvent as SubmitEvent).submitter?.getAttribute('value')==='reject';const reason=String(new FormData(e.currentTarget).get('reason')||'').trim();if(reject&&!reason)return p.message('반려 사유를 입력해 주세요.');changeCampaign(p.edit,c.id,c=>{const v=c.apps.find(x=>x.id===a.id)!;v.stage=reject?'반려':'지급 대기';v.reason=reject?reason:undefined})}}><input name="reason" aria-label="반려 사유" placeholder="반려 사유"/><button className="outline" value="reject">반려</button><button className="primary">검수 승인</button></form></div>)}</Panel>
    <Panel title="월 마감 · 외부 결제 및 지급 상태"><p>선택한 월의 데모 상태를 브랜드 청구서와 인플루언서 지급 내역에 반영합니다.</p>
      <label className="field">정산월<input type="month" required value={month} onChange={e=>setMonth(e.target.value)}/></label>
      <form className="form" key={month} onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);p.edit(m=>{m.closing??={};m.closing[month]={state:String(f.get('state')),invoice:String(f.get('invoice')||'')}});p.message('월별 데모 상태를 저장했습니다.')}}>
      <label className="field">정산 상태<select name="state" defaultValue={p.m.closing?.[month]?.state||'예정'}>{['예정','확정','브랜드 결제 완료','지급 완료','보류'].map(s=><option key={s}>{s}</option>)}</select></label>
      <label className="field">세금계산서 번호 (선택)<input name="invoice" defaultValue={p.m.closing?.[month]?.invoice}/></label><button className="outline" disabled={!month}>상태 저장</button></form></Panel><Panel title="지급 정보 등록 안내"><form className="form" onSubmit={e=>{e.preventDefault();const url=String(new FormData(e.currentTarget).get('url')||'').trim();if(url&&!safeUrl(url))return p.message('유효한 URL을 입력해 주세요.');p.edit(m=>{m.payoutUrl=url});p.message('등록 링크를 저장했습니다.')}}><label className="field">외부 지급 솔루션 등록 URL<input name="url" type="url" defaultValue={p.m.payoutUrl}/></label><button className="outline">등록 링크 저장</button></form></Panel></>
}
function Redirect({m,edit,id,code}:{m:Model;edit:Props['edit'];id:string;code:string}){
  const once=useRef(false)
  const c=m.campaigns.find(c=>c.id===id&&c.kind==='공구'&&c.phase!=='중단')
  const a=c?.apps.find(a=>a.status==='승인'&&a.code===code)
  const target=safeUrl(c?.url||'')
  useEffect(()=>{
    if(once.current||!c||!a||!target||day()<c.start||day()>c.end)return
    once.current=true
    const to=new URL(target);to.searchParams.set('utm_source','allinone');to.searchParams.set('utm_medium','influencer');to.searchParams.set('utm_campaign',c.id);to.searchParams.set('utm_content',a.id);to.searchParams.set('coupon',code)
    changeCampaign(edit,c.id,c=>{const v=c.apps.find(x=>x.id===a.id);if(v)v.clicks++})
    location.replace(to.href)
  },[c,a,target,code,edit])
  const label=!a||!c?'유효하지 않은 공구 링크입니다.':!target?'등록된 브랜드몰 상품 주소가 없습니다.':day()<c.start||day()>c.end?'현재 판매 기간이 아닙니다.':'브랜드몰 상품 페이지로 이동합니다.'
  return <main className="shop"><Logo/><Panel title={label}><p>{c?.product}</p></Panel></main>
}
const tabIcons = {
  home: 'M3 10l9-7 9 7v11h-6v-7H9v7H3z',
  discover: 'M10 3a7 7 0 1 0 .1 0 M15 15l6 6',
  activity: 'M5 4h14v17H5z M8 9h8 M8 14h6',
  groups: 'M3 8h18l-1 13H4z M8 8V6a4 4 0 0 1 8 0v2',
  more: 'M4 12h2 M11 12h2 M18 12h2'
}
function App(){
  const [m,setModel]=useState(read),[hash,setHash]=useState(location.hash),[notice,setNotice]=useState('')
  const route=hash.replace(/^#\/?/,'').split('/')
  const [entry,token,id]=route
  const role=entry || (window.matchMedia('(max-width: 700px)').matches?'creator':'brand')
  const creator=role==='creator',admin=role==='review'
  const page=token||(creator?'home':'dashboard')
  const side=creator?creatorNav:brandNav
  useEffect(()=>{
    const hashChange=()=>{setHash(location.hash);setNotice('');window.scrollTo(0,0)}
    const sync=(e:StorageEvent)=>{if(e.key===storageKey)setModel(read())}
    window.addEventListener('hashchange',hashChange);window.addEventListener('storage',sync)
    return()=>{window.removeEventListener('hashchange',hashChange);window.removeEventListener('storage',sync)}
  },[])
  function edit(change:(m:Model)=>void){const next=read();change(next);localStorage.setItem(storageKey,JSON.stringify(next));setModel(next)}
  useEffect(()=>{if(role==='@'+m.profile.slug)edit(s=>{s.views++})},[role,m.profile.slug])
  const p={m,edit,message:setNotice}
  if(role.startsWith('@'))return <PublicProfile m={m} slug={role.slice(1)}/>
  if(role==='go')return <Redirect m={m} edit={edit} id={token} code={id}/>
  if(role==='files')return <Attachment id={token}/>
  const name=creator?m.profile.name:m.brand.name
  return <><header className="masthead"><div className="top"><Logo/><div className="view-switch"><label htmlFor="view">데모 화면</label><select id="view" value={admin?'review':creator?'creator':'brand'} onChange={e=>location.hash='/'+({brand:'brand/dashboard',creator:'creator/home',review:'review'}[e.target.value])}>
    <option value="brand">브랜드</option><option value="creator">인플루언서</option><option value="review">운영자 미리보기</option></select></div></div></header>
    <div className={'workspace '+(creator?'creator-workspace':'brand-workspace')}>{!creator&&<aside className="rail"><small>{admin?'운영자':creator?'인플루언서':'브랜드'}</small><h2>{admin?'심사 대기함':name}</h2><nav aria-label="화면 메뉴">{admin?<a aria-current="page" href="#/review">심사 대기함</a>:side.map(([k,label])=><a key={k} aria-current={page===k||page==='new'&&k==='campaigns'?'page':undefined} href={'#/'+(creator?'creator':'brand')+'/'+k}>{label}</a>)}</nav>
    </aside>}
    <main className="stage" key={hash}>{admin?<Review {...p}/>:creator?<Creator {...p} page={page} id={id}/>:<Brand {...p} page={page} id={id}/>}</main>{creator&&<nav className="app-nav" aria-label="인플루언서 하단 메뉴">
      {([['home','홈'],['discover','둘러보기'],['activity','내 캠페인'],['groups','내 공구'],['more','더보기']] as const).map(([key,label])=>{
        const current=({detail:'discover',submit:'activity',payout:'more',profile:'more',account:'more'} as Record<string,string>)[page]||page
        return <a href={'#/creator/'+key} key={key} aria-current={current===key?'page':undefined}><svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={tabIcons[key]}/></svg>{label}</a>
      })}</nav>}</div>
    {notice&&<div className="toast" role="status">{notice}<button aria-label="알림 닫기" onClick={()=>setNotice('')}>×</button></div>}</>
}
createRoot(document.getElementById('root')!).render(<App/>)






