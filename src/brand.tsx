import {useState, type FormEvent} from 'react'
import {type Props,type Campaign,type Kind,types,approved,canApprove,open,day,signedHandle,changeCampaign,safeUrl,navigate} from './store'
import {Action,Title,Panel,Field,Tabs,Figures,details,value,CampaignTile,Artwork} from './ui'
function CampaignBuilder({edit,message}:Props){
  const [step,setStep]=useState(0)
  const [kind,setKind]=useState<Kind>('공구')
  const [draft,setDraft]=useState<Record<string,string>>({})
  function advance(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    const data=new FormData(e.currentTarget)
    const d={...draft,...Object.fromEntries([...data].map(([k,v])=>[k,String(v).trim()]))}
    setDraft(d)
    if(step===1 && (!safeUrl(d.url) || (d.image && !safeUrl(d.image))))return message('http 또는 https 상품·이미지 주소를 입력해 주세요.')
    if(step<2){setStep(step+1);return}
    if(!(d.close<=d.announce && d.announce<=d.start && d.start<=d.end && d.start<=d.due))return message('모집 마감, 발표, 시작, 종료 및 제출 기한의 순서를 확인해 주세요.')
    const c:Campaign={id:crypto.randomUUID(),kind,title:d.title,product:d.product,description:d.description,category:d.category,image:d.image,url:d.url,
      capacity:Number(d.capacity),guide:d.guide,offer:d.offer||d.product,reward:d.reward,close:d.close,announce:d.announce,start:d.start,end:d.end,due:d.due,phase:'심사 중',apps:[]}
    edit(m=>m.campaigns.unshift(c));message('운영자에게 캠페인 심사를 요청했습니다.');navigate('brand/campaigns')
  }
  return <Panel title={['캠페인 유형 선택','상품 정보','모집 조건과 일정'][step]} extra={<small>{step+1} / 3</small>}>
    <form onSubmit={advance} className="form" key={step}>
      {step===0 && <div className="choices">{types.map(k=><button type="button" key={k} aria-pressed={kind===k} onClick={()=>setKind(k)}><strong>{k}</strong><span>{{'공구':'자사몰 판매와 월 정산','시딩':'제품 구매 후 체험 콘텐츠','UGC':'광고용 콘텐츠 제작과 검수'}[k]}</span></button>)}</div>}
      {step===1 && <><Field label="캠페인 제목"><input required maxLength={80} name="title" defaultValue={draft.title}/></Field>
        <Field label="상품명"><input required name="product" defaultValue={draft.product}/></Field><Field label="상품 설명"><textarea required name="description" defaultValue={draft.description}/></Field>
        <Field label="브랜드몰 상품 URL"><input required type="url" name="url" defaultValue={draft.url}/></Field><Field label="상품 이미지 URL (선택)"><input type="url" name="image" defaultValue={draft.image}/></Field>
        <Field label="카테고리"><select name="category" defaultValue={draft.category}>{['푸드','라이프','뷰티','패션'].map(x=><option key={x}>{x}</option>)}</select></Field></>}
      {step===2 && <><Field label={kind==='공구'?'판매 수수료':'구매비 또는 리워드'}><input name="reward" required defaultValue={draft.reward||(kind==='공구'?'00%':'00,000원')}/></Field>
        {kind==='공구'&&<Field label="브랜드 상품 구성 제안"><input required name="offer" defaultValue={draft.offer}/></Field>}
        <Field label="모집 인원"><input type="number" name="capacity" min="1" max="9999" required defaultValue={draft.capacity||5}/></Field>
        <div className="fields-grid">{[['close','모집 마감',4],['announce','발표일',5],['start','진행 시작',7],['end','진행 종료',15],['due','제출 기한',18]].map(([k,label,offset])=><Field key={k} label={String(label)}><input type="date" name={String(k)} required defaultValue={draft[k]||day(Number(offset))}/></Field>)}</div>
        <Field label="콘텐츠 형식 · 광고 표기 · 유지 기간"><textarea required name="guide" defaultValue={draft.guide}/></Field></>}
      <div className="actions">{step>0&&<button type="button" className="outline" onClick={e=>{const f=new FormData(e.currentTarget.form!);setDraft({...draft,...Object.fromEntries([...f].map(([k,v])=>[k,String(v)]))});setStep(step-1)}}>이전</button>}<button className="primary">{step===2?'심사 요청':'다음'}</button></div>
    </form></Panel>
}
export function Brand(p:Props & {page:string;id?:string}){
  const {m,edit,message,page,id}=p
  const [filter,setFilter]=useState('전체')
  const [month,setMonth]=useState(day().slice(0,7))
  const [selected,select]=useState(id||m.campaigns[0]?.id)
  const c=m.campaigns.find(c=>c.id===selected) || m.campaigns[0]
  const rows=m.campaigns.flatMap(c=>c.apps.map(a=>({c,a})))
  const pending=rows.filter(r=>r.a.status==='신청')
  const ugc=rows.filter(r=>r.c.kind==='UGC'&&r.a.stage==='검수 중')
  function account(e:FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget);if(!safeUrl(value(f,'inquiry')))return message('브랜드 문의 URL을 확인해 주세요.');edit(s=>{s.brand={name:value(f,'name'),business:value(f,'business'),contact:value(f,'contact'),email:value(f,'email'),inquiry:value(f,'inquiry')}});message('사업자 정보를 저장했습니다.')}
  const names:Record<string,string>={dashboard:'브랜드 대시보드',account:'사업자 정보',mall:'몰 연결',campaigns:'캠페인 관리',new:'캠페인 만들기',applicants:'신청자 관리',invoice:'월 청구서'}
  const closing=m.closing?.[month]
  const header=<Title name={names[page]} context={m.brand.name+' / 브랜드'}>{['dashboard','campaigns'].includes(page)&&<Action to="brand/new" primary>캠페인 만들기</Action>}</Title>
  if(page==='new')return <>{header}<CampaignBuilder {...p}/></>
  if(page==='account')return <>{header}<Panel title="가입 · 사업자 정보"><form className="form" onSubmit={account}>
    {([['name','상호'],['business','사업자등록번호'],['contact','담당자'],['email','세금계산서 이메일'],['inquiry','브랜드 문의 URL']] as const).map(([k,l])=><Field key={k} label={l}><input name={k} type={k==='email'?'email':k==='inquiry'?'url':'text'} required defaultValue={m.brand[k]}/></Field>)}
    <button className="primary">사업자 정보 저장</button></form></Panel></>
  if(page==='mall')return <>{header}<p>데모 연결 상태를 저장합니다. 실제 몰 인증은 서버 연동 후 이용할 수 있습니다.</p><div className="cards">{['카페24','스마트스토어'].map(channel=><Panel key={channel} title={channel}>
    <p>{channel==='카페24'?'브랜드몰 앱 설치':'네이버 커머스 ID 로그인'}</p><p className="status">{m.malls[channel]==='expired'?'연결 만료 · 재연결 필요':m.malls[channel]?'데모 연결됨':'미연결'}</p>
    <button className="outline" onClick={()=>edit(s=>{s.malls[channel]=s.malls[channel]!==true})}>{m.malls[channel]==='expired'?'재연결하기':m.malls[channel]?'데모 연결 해제':'데모 연결하기'}</button>{m.malls[channel]===true&&<button className="outline" onClick={()=>edit(s=>{s.malls[channel]='expired'})}>만료 상태 미리보기</button>}</Panel>)}</div></>
  if(page==='campaigns')return <>{header}<Tabs items={['전체',...types]} current={filter} onChange={setFilter}/><div className="cards">{m.campaigns.filter(c=>filter==='전체'||c.kind===filter).map(c=><CampaignTile key={c.id} c={c} brand={m.brand.name} to={'brand/applicants/'+c.id}/>)}</div></>
  if(page==='invoice')return <>{header}<Field label="청구월"><input type="month" value={month} onChange={e=>setMonth(e.target.value)}/></Field><Panel title={month+' 브랜드 청구서'} extra={<span className="tag">{closing?.state || '마감 전'}</span>}>
    <p>{closing ? '운영자가 입력한 월 마감 상태입니다.' : '운영자가 월 마감을 완료하면 청구액과 결제 상태가 표시됩니다.'}</p>{details([['멤버십','00,000원'],['AIO 수수료','공구 정률 / 시딩·UGC 건당 정액'],['인플루언서 지급분','00,000원'],['청구 예정액','00,000원'],['세금계산서',closing?.invoice || '미발행'],['결제 상태',closing?.state==='브랜드 결제 완료'||closing?.state==='지급 완료'?'결제 완료':closing?'청구 확정':'청구 전']])}</Panel></>
  if(page==='applicants')return <>{header}<Field label="캠페인 선택"><select value={c.id} onChange={e=>select(e.target.value)}>{m.campaigns.map(c=><option key={c.id} value={c.id}>{c.title}</option>)}</select></Field><Panel title={c.title} extra={<span className="tag">{c.phase}</span>}>
    <p>{c.kind} · 승인 {approved(c)} / 모집 {c.capacity}명</p>
    {c.apps.length===0&&<p className="empty">신청자가 없습니다.</p>}
    {c.apps.map(a=><article className="listitem" key={a.id}><div><b>{signedHandle(m,a.id)}</b><p>{a.id==='yuna'?m.creator.categories.join(' · '):'푸드'} · 팔로워 및 과거 성과 미수집</p>
      {a.counter&&<p>상품 구성 역제안 · {a.counter}</p>}</div><div className="actions">{a.status==='신청'?<>
      <button className="outline" onClick={()=>changeCampaign(edit,c.id,c=>{const v=c.apps.find(x=>x.id===a.id);if(v?.status==='신청')v.status='거절'})}>거절</button>
      <button className="primary" disabled={!canApprove(c)} onClick={()=>changeCampaign(edit,c.id,c=>{const v=c.apps.find(x=>x.id===a.id);if(v?.status==='신청'&&canApprove(c))v.status='승인'})}>승인</button></>:<span className="tag">{a.status}</span>}
      {a.status==='승인'&&a.counter&&!a.code&&<><button className="outline" onClick={()=>changeCampaign(edit,c.id,c=>{delete c.apps.find(x=>x.id===a.id)!.counter})}>역제안 거절</button><button className="primary" onClick={()=>changeCampaign(edit,c.id,c=>{c.apps.find(x=>x.id===a.id)!.code=crypto.randomUUID().slice(0,8).toUpperCase()})}>역제안 수락</button></>}</div></article>)}</Panel></>
  return <>{header}<div className="hero tone-공구"><div><small>캠페인 운영</small><h2>승인 대기 {pending.length}건</h2><p>모집 중 캠페인 {m.campaigns.filter(open).length}개 · UGC 검수 대기 {ugc.length}건</p>
    <Action to={'brand/applicants/'+(pending[0]?.c.id||c.id)}>신청자 확인</Action></div><Artwork kind="공구"/></div>
    <Panel title="인플루언서별 성과"><div className="table-wrap"><table><thead><tr>{['인스타그램','클릭','도달','CTR','주문 수량','매출'].map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{[...new Set(rows.map(r=>r.a.id))].map(id=>{const items=rows.filter(r=>r.a.id===id);return <tr key={id}><td>{signedHandle(m,id)}</td><td>{items.reduce((n,r)=>n+r.a.clicks,0)}</td><td>미연동</td><td>—</td><td>{items.reduce((n,r)=>n+r.a.ordered-r.a.returned,0)}</td><td>00,000원</td></tr>})}</tbody></table></div></Panel>
    <Panel title="콘텐츠 · UGC 검수">{!rows.some(r=>r.a.content||r.a.original)&&<p>제출된 콘텐츠가 없습니다.</p>}{rows.filter(r=>r.a.content||r.a.original).map(({c,a})=><div className="listitem" key={c.id+a.id}><div><b>{c.title}</b><p>{signedHandle(m,a.id)} · {a.stage}</p>{safeUrl(a.content||'')&&<a href={a.content} target="_blank" rel="noreferrer">제출 콘텐츠 열기</a>}{a.original&&<a href={'#/files/'+a.original}>원본 파일 열기</a>}</div>
    {c.kind==='UGC'&&a.stage==='검수 중'&&<form onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);const reject=(e.nativeEvent as SubmitEvent).submitter?.getAttribute('value')==='reject';const reason=value(f,'reason');if(reject&&!reason)return message('반려 사유를 입력해 주세요.');changeCampaign(edit,c.id,c=>{const v=c.apps.find(x=>x.id===a.id)!;v.stage=reject?'반려':'지급 대기';v.reason=reject?reason:undefined})}}><input name="reason" aria-label="반려 사유" placeholder="반려 사유"/><button className="outline" value="reject">반려</button><button className="primary">검수 승인</button></form>}</div>)}</Panel></>
}





