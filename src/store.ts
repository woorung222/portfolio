export const types = ['시딩', '공구', 'UGC'] as const
export type Kind = typeof types[number]
export type Application = {
  id: string; status: '신청' | '승인' | '거절' | '취소'; code?: string; clicks: number; ordered: number; returned: number;
  stage?: '구매 인증' | '제품 수령' | '콘텐츠 제출' | '검수 중' | '반려' | '지급 대기';
  counter?: string; orderNo?: string; receipt?: string; original?: string; content?: string; reason?: string; retries?: number
}
export type Campaign = {
  id: string; title: string; product: string; category: string; kind: Kind; phase: '심사 중' | '모집 중' | '중단';
  capacity: number; close: string; announce: string; start: string; end: string; due: string;
  guide: string; offer: string; description: string; url: string; image: string; reward: string; apps: Application[]
}
export type Profile = {name: string; slug: string; bio: string; link: string; image: string; affiliate?: string; reveal?: Record<string,string>}
export type Model = {
  campaigns: Campaign[]; brand: {name: string; business: string; contact: string; email: string; inquiry: string};
  malls: Record<string, boolean | 'expired'>; creator: {email: string; handle: string; account: string; categories: string[]; consent: boolean};
  profile: Profile; alerts: string[]; views: number; payoutUrl?: string; closing?: Record<string,{state:string;invoice:string}>
}
export const user = 'yuna'
export const day = (offset = 0) => {
  const d = new Date(); d.setDate(d.getDate() + offset)
  return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')
}
export function applicant(id: string, approved = false): Application {
  return {id, status: approved ? '승인' : '신청', clicks: 0, ordered: 0, returned: 0}
}
function seed(id: string, kind: Kind, title: string, product: string, category: string): Campaign {
  return {id,kind,title,product,category, phase:'모집 중',capacity:8,close:day(4),announce:day(5),start:day(7),end:day(15),due:day(18),
    guide:kind === '공구' ? '공구 일정과 광고 표시를 게시물에 포함해 주세요.' : '광고 표시를 포함해 게시하고 콘텐츠를 30일간 유지해 주세요.',
    offer:product, description:product+'을 소개하는 '+kind+' 캠페인입니다.',url:'',image:'',reward:kind === '공구' ? '00%' : '00,000원',apps:[]}
}
export const storageKey = 'allinone.frontend.screens.v1'
function initial(): Model {
  const group = seed('jeju','공구','제주 감귤 첫 수확 공구','제주 노지감귤 3kg','푸드')
  group.apps = [applicant(user),applicant('min')]
  const seeding = seed('morning','시딩','모닝 블렌드 체험단','모닝 블렌드 드립백','푸드')
  const ugc = seed('studio','UGC','홈 리추얼 콘텐츠 제작','리넨 룸 스프레이','라이프')
  const previous = JSON.parse(localStorage.getItem('gumipick.campaigns.v1') || '[]') as {
    id:string; title:string; product:string; capacity:number; applicants:{id:string;status:string;code?:string;ordered:number;returned:number}[]
  }[]
  const existing = previous.map(c=>({...seed(c.id,'공구',c.title,c.product,'푸드'),capacity:c.capacity,apps:c.applicants.map(a=>({
    ...applicant(a.id,a.status==='approved'),code:a.code,ordered:a.ordered,returned:a.returned
  }))}))
  return {campaigns:[...(existing.length ? existing : [group]),seeding,ugc],brand:{name:'귤밭상점',business:'',contact:'',email:'',inquiry:''},
    malls:{},creator:{email:'',handle:'yuna.table',account:'',categories:['푸드'],consent:false},
    profile:{name:'유나의 식탁',slug:'yuna',bio:'직접 써보고 고른 식탁 위의 일상.',link:'',image:''},alerts:[],views:0}
}
export function read():Model {
  const stored=localStorage.getItem(storageKey)
  const model:Model=stored ? JSON.parse(stored) : initial()
  let changed=!stored
  for(const campaign of model.campaigns){
    if(campaign.announce>=day())continue
    for(const application of campaign.apps){
      if(application.status!=='신청')continue
      application.status='거절'
      changed=true
    }
  }
  if(!changed)return model
  localStorage.setItem(storageKey,JSON.stringify(model))
  return model
}
export type Props = {m: Model; edit: (change:(m:Model)=>void)=>void; message:(s:string)=>void}
export const mine = (c:Campaign) => c.apps.find(a=>a.id===user)
export const approved = (c:Campaign) => c.apps.filter(a=>a.status==='승인').length
export const open = (c:Campaign) => c.phase==='모집 중' && c.close>=day() && approved(c)<c.capacity
export const canApprove = (c:Campaign) => c.phase==='모집 중' && c.announce>=day() && approved(c)<c.capacity
export const period = (c:Campaign) => c.start>day() ? '판매예정' : c.end<day() ? '판매완료' : '판매중'
export const reward = (c:Campaign) => ({'시딩':'구매비','공구':'판매 수수료','UGC':'리워드'}[c.kind]+' '+c.reward)
export const stage = (c:Campaign,a:Application) => a.status!=='승인' ? a.status : c.kind==='공구' ? (a.code ? period(c) : '상품 구성 협의') : a.stage || (c.kind==='시딩' ? '구매 인증' : '제품 수령')
export const safeUrl = (raw:string) => {try {const u=new URL(raw);return ['https:','http:'].includes(u.protocol) ? u.href : ''}catch{return ''}}
export const navigate = (path:string) => {location.hash='/'+path}
export const tracked = (c:Campaign,a:Application) => location.origin+location.pathname+'#/go/'+c.id+'/'+a.code
export const signedHandle = (m:Model,id:string) => '@'+(id===user ? m.creator.handle : 'min.kitchen')
export function changeCampaign(edit:Props['edit'],id:string,fn:(c:Campaign)=>void) {
  edit(m=>{const c=m.campaigns.find(c=>c.id===id);if(c)fn(c)})
}
export const campaignPath = (c:Campaign) => 'creator/detail/'+c.id




