import {useEffect, useState} from 'react'
import {type Props,type Model,day,period,stage,mine,safeUrl,tracked} from './store'
import {Panel,Field,Title,Logo,value,copy} from './ui'
export async function files():Promise<IDBDatabase>{
  return new Promise((resolve,reject)=>{const req=indexedDB.open('aio-demo-files',1)
    req.onupgradeneeded=()=>req.result.createObjectStore('files');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})
}
export async function upload(file:File){
  const db=await files(),key=crypto.randomUUID()
  await new Promise<void>((res,rej)=>{const tx=db.transaction('files','readwrite');tx.objectStore('files').put(file,key);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error)})
  db.close();return key
}
export function Attachment({id}:{id:string}){
  const [href,setHref]=useState(''),[name,setName]=useState('')
  useEffect(()=>{let active=true,link='';files().then(db=>{const q=db.transaction('files').objectStore('files').get(id);q.onsuccess=()=>{db.close();if(active&&q.result){link=URL.createObjectURL(q.result);setHref(link);setName(q.result.name)}}});return()=>{active=false;if(link)URL.revokeObjectURL(link)}},[id])
  return <main className="shop"><Logo/><Panel title="제출 파일">{href?<a href={href} download={name}>{name} 다운로드</a>:<p>이 브라우저에서 파일을 찾는 중입니다.</p>}</Panel></main>
}
function Timeline({m,preview=false}:{m:Model;preview?:boolean}){
  const [feedback,setFeedback]=useState('')
  const p=m.profile
  const groups=m.campaigns.filter(c=>c.kind==='공구'&&c.phase!=='중단'&&mine(c)?.status==='승인'&&mine(c)?.code && (!p.reveal?.[c.id] || p.reveal[c.id]<=day()))
  return <div className="public-profile"><div className="profile-head"><small>@{p.slug}</small><h2>{p.name}</h2><p>{p.bio}</p></div>
    {safeUrl(p.image)&&<img className="profile-img" src={p.image} alt={p.name+' 소개 이미지'}/>}
    {safeUrl(p.link)&&<a className="outline" href={p.link} target="_blank" rel="noreferrer">프로필 링크</a>}
    {safeUrl(p.affiliate||'')&&<a className="outline" href={p.affiliate} target="_blank" rel="noreferrer">제휴 링크</a>}
    {['판매중','판매예정','판매완료'].map(t=>{const list=groups.filter(c=>period(c)===t).sort((a,b)=>t==='판매완료'?b.end.localeCompare(a.end):a.start.localeCompare(b.start));return list.length>0&&<section className="timeline" key={t}><h3>{t}</h3>{list.map(c=><article key={c.id}><small>{m.brand.name}</small><h3>{c.title}</h3><p>{c.product}</p><p>{c.start} ~ {c.end}</p>{t==='판매중'&&<div className="coupon"><span>전용 쿠폰 <b>{mine(c)!.code}</b></span>{!preview&&<button className="outline" onClick={()=>copy(mine(c)!.code!,setFeedback)}>쿠폰 복사</button>}</div>}{t==='판매중'&&!preview&&safeUrl(c.url)&&<a className="primary" href={tracked(c,mine(c)!)}>구매하기</a>}{safeUrl(m.brand.inquiry)&&<a className="outline" href={m.brand.inquiry}>브랜드 문의</a>}</article>)}</section>})}<p role="status">{feedback}</p></div>
}
export function PublicProfile({m,slug}:{m:Model;slug:string}){
  return <main className="shop public-page"><Logo/>{m.profile.slug===slug?<Timeline m={m}/>:<Panel title="프로필을 찾을 수 없습니다"><p>프로필 주소를 확인해 주세요.</p></Panel>}</main>
}
export function Profile(p:Props){
  const [draft,setDraft]=useState(p.m.profile)
  const href=location.origin+location.pathname+'#/@'+p.m.profile.slug
  return <><Title name="프로필 편집" context="인플루언서 / 공개 프로필"/><div className="split"><Panel title="프로필 블록"><form className="form" onSubmit={e=>{e.preventDefault();if([draft.link,draft.image,draft.affiliate].some(x=>x&&!safeUrl(x)))return p.message('http 또는 https 주소를 입력해 주세요.');p.edit(m=>{m.profile={...draft}});p.message('공개 프로필을 저장했습니다.')}}>
    {([['name','프로필 이름'],['slug','프로필 주소'],['bio','소개 텍스트'],['link','링크 URL'],['image','이미지 URL'],['affiliate','제휴 링크 URL']] as const).map(([k,l])=><Field label={l} key={k}><input required={k==='name'||k==='slug'} pattern={k==='slug'?'[a-zA-Z0-9_]+':undefined} type={['link','image','affiliate'].includes(k)?'url':'text'} value={draft[k]||''} onChange={e=>setDraft({...draft,[k]:e.target.value})}/></Field>)}
    {p.m.campaigns.filter(c=>c.kind==='공구'&&mine(c)?.code&&period(c)==='판매예정').map(c=><Field key={c.id} label={c.title+' · 예약 공개일'}><input type="date" max={c.start} value={draft.reveal?.[c.id]||''} onChange={e=>setDraft({...draft,reveal:{...draft.reveal,[c.id]:e.target.value}})}/></Field>)}
    <button className="primary">프로필 저장</button></form></Panel><Panel title="실시간 미리보기"><Timeline m={{...p.m,profile:draft}} preview/></Panel></div>
    <Panel title="프로필 통계"><p>이 브라우저의 방문 {p.m.views}회 · 공구 링크 클릭 {p.m.campaigns.reduce((n,c)=>n+(mine(c)?.clicks||0),0)}회</p></Panel><div className="actions"><a className="outline" href={href}>공개 프로필 열기</a><button className="outline" onClick={()=>copy(href,p.message)}>주소 복사</button></div></>
}
export function CreatorAccount(p:Props & {back?:string}){
  const c=p.m.creator
  return <><Title name="가입·인스타 연동" context="인플루언서 계정"/><Panel title="가입 정보"><form className="form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);const cats=f.getAll('categories').map(String);if(!cats.length)return p.message('카테고리를 선택해 주세요.');p.edit(m=>{m.creator={email:value(f,'email'),handle:value(f,'handle').replace(/^@/,''),categories:cats,account:value(f,'account'),consent:true}});p.message('데모 계정 정보를 저장했습니다.');if(p.back)location.hash='/creator/detail/'+p.back}}>
    <Field label="이메일"><input required name="email" type="email" defaultValue={c.email}/></Field><Field label="인스타그램 아이디"><input required name="handle" pattern="@?[a-zA-Z0-9._]+" defaultValue={c.handle}/></Field>
    <Field label="인스타그램 연결 미리보기"><select name="account" defaultValue={c.account}><option value="">미연동</option><option>비즈니스</option><option>크리에이터</option><option>개인</option></select></Field>
    <p>개인 계정은 가입할 수 있으며 클릭과 주문만 표시됩니다. 실제 인스타그램 인증은 연결 전입니다.</p>
    <fieldset><legend>관심 카테고리</legend>{['푸드','라이프','뷰티','패션'].map(k=><label key={k}><input type="checkbox" name="categories" value={k} defaultChecked={c.categories.includes(k)}/>{k}</label>)}</fieldset>
    <label><input type="checkbox" required defaultChecked={c.consent}/> 데모 가입 약관 및 개인정보 동의 화면 확인</label><button className="primary">데모 정보 저장</button></form></Panel></>
}




