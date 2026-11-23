import {useState,type FormEvent} from 'react'
import {type Props,type Campaign,type Application,types,mine,approved,open,period,day,user,applicant,stage,reward,changeCampaign,campaignPath,tracked,safeUrl,navigate} from './store'
import {Field,Action,Panel,Title,Tabs,Figures,details,copy,value,CampaignTile,Artwork} from './ui'
import {Profile,CreatorAccount,upload} from './profile'
function Submission(p:Props & {c:Campaign;a:Application}){
  const {c,a}=p
  const current=stage(c,a)
  const [busy,setBusy]=useState(false)
  const amend=(fn:(a:Application)=>void)=>changeCampaign(p.edit,c.id,c=>{const a=mine(c);if(a?.status==='승인')fn(a)})
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();const f=new FormData(e.currentTarget)
    setBusy(true)
    try{
      if(current==='구매 인증'){const file=f.get('file') as File;const key=await upload(file);amend(a=>{a.orderNo=value(f,'order');a.receipt=key;a.stage='콘텐츠 제출'})}
      else if(current==='제품 수령'){amend(a=>{a.stage='콘텐츠 제출'})}
      else{const url=value(f,'url');if(!safeUrl(url))return p.message('유효한 콘텐츠 URL을 입력해 주세요.')
        const file=f.get('file') as File|null;const key=file?.size?await upload(file):undefined
        amend(a=>{if(a.stage==='반려')a.retries=(a.retries||0)+1;a.content=url;a.original=key;a.stage='검수 중';delete a.reason})}
      p.message('제출 상태를 저장했습니다.')
    }catch{p.message('이 브라우저에 파일을 저장할 수 없습니다. 저장 공간을 확인해 주세요.')}finally{setBusy(false)}
  }
  return <Panel title={current} extra={<span className="tag">{c.kind}</span>}><p>{c.title} · 제출 기한 {c.due}</p>
    {a.reason&&<p>반려 사유 · {a.reason}</p>}{a.content&&<a href={a.content} rel="noreferrer" target="_blank">제출 콘텐츠 열기</a>}{a.original&&<a href={'#/files/'+a.original}>원본 파일 열기</a>}
    {['검수 중','지급 대기'].includes(current)?<p>{current==='검수 중'?'검수 결과를 기다리고 있습니다.':'검수가 승인되었습니다.'}</p>:<form className="form" onSubmit={submit} key={current}>
      {current==='구매 인증'&&<><Field label="주문번호"><input required name="order"/></Field><Field label="구매 인증 캡처"><input required type="file" accept="image/*" name="file"/></Field></>}
      {current==='제품 수령'&&<p>캠페인 제품을 받은 뒤 수령을 확인해 주세요.</p>}
      {['콘텐츠 제출','반려'].includes(current)&&<><Field label="게시한 콘텐츠 URL"><input required type="url" name="url" defaultValue={a.content}/></Field>{c.kind==='UGC'&&<Field label="UGC 원본 파일"><input required name="file" type="file" accept="image/*,video/*"/></Field>}</>}
      <button className="primary" disabled={busy||day()>c.due}>{busy?'저장 중':day()>c.due?'제출 기한 종료':current==='제품 수령'?'제품 수령 확인':'제출하기'}</button></form>}</Panel>
}
function Group(p:Props & {c:Campaign;a:Application}){
  const {c,a}=p
  const update=(fn:(a:Application)=>void)=>changeCampaign(p.edit,c.id,c=>{const a=mine(c);if(a?.status==='승인')fn(a)})
  return <Panel title={c.title} extra={<span className="tag">{stage(c,a)}</span>}>
    <p>{c.start} ~ {c.end} · {reward(c)}</p>{!a.code?<><p>브랜드 제안 · {c.offer}</p>
    {a.counter?<p>역제안 검토 중 · {a.counter}</p>:<><button className="primary" onClick={()=>update(a=>{a.code=crypto.randomUUID().slice(0,8).toUpperCase()})}>구성 확정 · 데모 링크 발급</button>
    <form className="inline-form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);update(a=>{a.counter=value(f,'counter')})}}><input name="counter" required aria-label="상품 구성 역제안" placeholder="희망 상품 구성"/><button className="outline">역제안 보내기</button></form></>}</>:<>
    {([['전용 링크',tracked(c,a)],['데모 쿠폰',a.code]] as const).map(([k,v])=><Field label={k} key={k}><span className="copyline"><input readOnly value={v} onFocus={e=>e.currentTarget.select()}/><button className="outline" onClick={()=>copy(v,p.message)}>복사</button></span></Field>)}
    <p>클릭 {a.clicks} · 순판매 수량 {a.ordered-a.returned}개 · 매출 00,000원</p></>}</Panel>
}
export function Creator(p:Props & {page:string;id?:string}){
  const {m,page,id,edit,message}=p
  const [filter,setFilter]=useState('전체'),[cat,setCat]=useState('전체'),[benefit,setBenefit]=useState('전체'),[month,setMonth]=useState(day().slice(0,7))
  const personal=m.campaigns.filter(c=>mine(c))
  const active=personal.filter(c=>mine(c)?.status==='승인')
  const todos=active.filter(c=>c.kind!=='공구'&&!['검수 중','지급 대기'].includes(stage(c,mine(c)!)))
  const available=m.campaigns.filter(c=>c.phase==='모집 중')
  const c=m.campaigns.find(c=>c.id===id),a=c&&mine(c)
  const tile=(c:Campaign)=><CampaignTile key={c.id} c={c} brand={m.brand.name} to={campaignPath(c)}/>
  const title=(name:string)=><Title name={name} context={m.profile.name+' / 인플루언서'}/>
  if(page==='more')return <>{title('더보기')}<Panel title={m.profile.name}><div className="more-links">
    <Action to="creator/payout">월별 정산 내역</Action><Action to="creator/profile">프로필 편집</Action><Action to={'@'+m.profile.slug}>공개 프로필 보기</Action><Action to="creator/account">가입·인스타 연동</Action>
    </div></Panel></>
  if(page==='account')return <CreatorAccount {...p} back={id}/>
  if(page==='profile')return <Profile {...p}/>
  if(page==='discover'){
    const filtered=available.filter(c=>(filter==='전체'||c.kind===filter)&&(cat==='전체'||cat===c.category)&&(benefit==='전체'||reward(c).startsWith(benefit)))
    return <>{title('캠페인 둘러보기')}<Tabs items={['전체',...types]} current={filter} onChange={setFilter}/><div className="inline-form">
      <Field label="카테고리"><select value={cat} onChange={e=>setCat(e.target.value)}>{['전체','푸드','라이프','뷰티','패션'].map(k=><option key={k}>{k}</option>)}</select></Field>
      <Field label="보상"><select value={benefit} onChange={e=>setBenefit(e.target.value)}>{['전체','구매비','판매 수수료','리워드'].map(k=><option key={k}>{k}</option>)}</select></Field></div>
      <div className="cards">{filtered.map(tile)}</div>{!filtered.length&&<Panel title="조건에 맞는 캠페인이 없습니다"><button className="outline" onClick={()=>edit(s=>{const k=[filter,cat,benefit].join('/');s.alerts=s.alerts.includes(k)?s.alerts.filter(x=>x!==k):[...s.alerts,k]})}>{m.alerts.includes([filter,cat,benefit].join('/'))?'알림 신청 취소':'모집 알림 신청'}</button></Panel>}</>
  }
  if(page==='detail'){
    if(!c||c.phase!=='모집 중'&&!a)return <Panel title="캠페인을 찾을 수 없습니다"><Action to="creator/discover">둘러보기</Action></Panel>
    return <>{title(c.title)}<div className={'hero tone-'+c.kind}><div><small>{m.brand.name} · {c.kind}</small><h2>{c.product}</h2><p>{c.description}</p></div>{safeUrl(c.image)?<img src={c.image} alt={c.product}/>:<Artwork kind={c.kind}/>}</div>
      <Panel title="모집 정보">{details([['모집 및 신청',c.capacity+'명 모집 · '+c.apps.filter(a=>a.status!=='취소').length+'명 신청'],['보상',reward(c)],['모집 마감 / 발표',c.close+' / '+c.announce],['진행 기간',c.start+' ~ '+c.end],['제출 기한',c.due],['참여 가이드',c.guide],...(c.kind==='UGC'?[['2차 활용 권리','별도 계약'] as [string,string]]:[])])}
      <div className="actions"><button className="primary" disabled={!open(c)||!!a&&a.status!=='취소'} onClick={()=>{
        if(c.kind==='공구' && personal.some(other=>other.id!==c.id && other.kind==='공구' && other.phase!=='중단' && ['신청','승인'].includes(mine(other)!.status) && other.product.trim()===c.product.trim() && other.start<=c.end && c.start<=other.end))return message('같은 상품의 공구 일정이 겹칩니다. 내 캠페인을 확인해 주세요.')
        if(!m.creator.account||!m.creator.consent)return navigate('creator/account/'+c.id)
        changeCampaign(edit,c.id,c=>{if(!open(c))return;const a=mine(c);if(a?.status==='취소')a.status='신청';else if(!a)c.apps.push(applicant(user))});message('캠페인 신청을 접수했습니다.')
      }}>{a&&a.status!=='취소'?(a.status==='신청'?'신청 완료':a.status):!open(c)?'모집 마감':m.creator.account?'신청하기':'인스타 연동 후 신청'}</button>
      {a?.status==='신청'&&<button className="outline" onClick={()=>changeCampaign(edit,c.id,c=>{const a=mine(c);if(a?.status==='신청')a.status='취소'})}>신청 취소</button>}</div></Panel></>
  }
  if(page==='submit')return <>{title('구매 인증 · 콘텐츠 제출')}{c&&a?.status==='승인'&&c.kind!=='공구'?<Submission {...p} c={c} a={a}/>:<Action to="creator/activity">내 캠페인 보기</Action>}</>
  if(page==='groups'){
    const groups=active.filter(c=>c.kind==='공구'&&(filter==='전체'||period(c)===filter))
    return <>{title('내 공구')}<Figures items={[[day().slice(0,7)+' 매출','00,000원'],['진행 중',active.filter(c=>c.kind==='공구'&&period(c)==='판매중').length]]}/><Tabs items={['전체','판매예정','판매중','판매완료']} current={filter} onChange={setFilter}/>
      {groups.map(c=><Group key={c.id} {...p} c={c} a={mine(c)!}/>)}{!groups.length&&<Panel title="해당하는 공구가 없습니다"><Action to="creator/discover">캠페인 둘러보기</Action></Panel>}</>
  }
  if(page==='activity'){
    const group=(c:Campaign)=>{const a=mine(c)!;return a.status==='신청'?'대기':a.status==='승인'&&a.stage!=='지급 대기'&&(c.kind!=='공구'||period(c)!=='판매완료')?'진행':'종료'}
    const list=personal.filter(c=>filter==='전체'||group(c)===filter)
    return <>{title('내 캠페인')}<Tabs items={['전체','대기','진행','종료']} current={filter} onChange={setFilter}/><Panel title="참여 내역">{list.map(c=>{const a=mine(c)!;const todo=a.status==='승인'?(c.kind==='공구'?'내 공구':stage(c,a)):'상세 보기'
      return <div className="listitem" key={c.id}><div><small>{c.kind} · {stage(c,a)}</small><h3>{c.title}</h3></div><Action to={a.status!=='승인'?campaignPath(c):c.kind==='공구'?'creator/groups':'creator/submit/'+c.id}>{todo}</Action></div>})}{!list.length&&<p>해당 상태의 참여 내역이 없습니다.</p>}</Panel></>
  }
  if(page==='payout')return <>{title('정산 내역')}<Field label="정산월"><input type="month" value={month} onChange={e=>setMonth(e.target.value)}/></Field><Panel title={month+' 지급 내역'} extra={<span className="tag">{m.closing?.[month]?.state || '예정'}</span>}>
    {details([['시딩 구매비','00,000원'],['공구 판매 수수료','00,000원'],['UGC 리워드','00,000원'],['원천징수액 (3.3%)','00,000원'],['지급 예정액','00,000원'],['현재 지급 단계',m.closing?.[month]?.state || '예정'],['지급 정보',safeUrl(m.payoutUrl||'')?<a href={m.payoutUrl} target="_blank" rel="noreferrer">외부 솔루션에서 지급 정보 등록</a>:'외부 지급 솔루션 연결 대기']])}</Panel></>
  return <>{title('홈')}<div className="hero tone-UGC"><div><small>이번 달 정산 예정액</small><h2>00,000원</h2><Action to="creator/payout">정산 내역 보기</Action></div><Artwork kind="UGC"/></div>
    <Panel title="할 일">{todos.length?todos.map(c=><div className="listitem" key={c.id}><b>{c.title}</b><Action to={'creator/submit/'+c.id}>{stage(c,mine(c)!)}</Action></div>):<p>제출하거나 다시 올릴 콘텐츠가 없습니다.</p>}</Panel>
    <Panel title="진행 중 캠페인">{active.length?<div className="cards">{active.map(tile)}</div>:<Action to="creator/discover">첫 캠페인 둘러보기</Action>}</Panel>
    <Panel title="마감 임박 추천"><div className="cards">{available.filter(open).sort((a,b)=>a.close.localeCompare(b.close)).slice(0,3).map(tile)}</div></Panel></>
}




