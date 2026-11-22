/* MT ContentLab: an independent, front-end-only CMS workflow prototype.
 * All content is fictional. Changes persist in this browser via localStorage.
 */
(() => {
  'use strict';
  const STORAGE_KEY = 'contentops-lab-items-v1'; // Keep the original key so existing demo data survives the rename.
  const STATUSES = ['Draft', 'In review', 'Scheduled', 'Published'];
  const TYPES = ['Article', 'Guide', 'Resource', 'Announcement'];
  const SECTIONS = ['Education', 'Health & wellbeing', 'Platform updates', 'Resources'];
  const COLORS = {'Draft':'#a7b2b9','In review':'#e8b46f','Scheduled':'#a6a7df','Published':'#59b895'};
  const icons = {
    document:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M14 3v5h5M9 13h6M9 17h5"/></svg>',
    layers:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/></svg>',
    clock:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></svg>',
    check:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
    eye:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'
  };
  const $ = (id) => document.getElementById(id);
  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slugify = (text) => String(text || '').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,120);
  const offsetDate = (days) => new Date(Date.now() + days * 86400000).toISOString();
  const isoDay = (days) => offsetDate(days).slice(0,10);
  const sampleItems = () => [
    {id:'demo-001',title:'A practical guide to accessible content',type:'Guide',section:'Education',owner:'Avery Chen',status:'In review',summary:'A practical introduction to writing and structuring content for more accessible digital experiences.',body:'Accessible content starts with clear language, meaningful headings, and descriptive links. These fundamentals make digital experiences easier for everyone to use.\n\nEstablish consistent authoring guidelines so contributors know what good looks like. Provide inline help, validation, and examples instead of relying on policy documents alone.\n\nMeasure success through adoption, reduction in content defects, and feedback from people using assistive technologies.',tags:['accessibility','guidelines'],updatedAt:offsetDate(-1),publishAt:null},
    {id:'demo-002',title:'Preparing for the new school year',type:'Article',section:'Education',owner:'Jordan Lee',status:'Published',summary:'A seasonal checklist for families and educators getting organized for the year ahead.',body:'A little preparation can make the start of a school year easier. Put important dates, school contacts, and essential resources in one accessible place.\n\nCreate a short checklist, identify where families can get help, and keep information current as school policies change.',tags:['planning','families'],updatedAt:offsetDate(-2),publishAt:null},
    {id:'demo-003',title:'Introducing our resource hub',type:'Announcement',section:'Platform updates',owner:'Taylor Morgan',status:'Scheduled',summary:'A look at the redesigned resource experience and the tools available to readers.',body:'The new resource hub brings frequently used documents, guides, and announcements into a single, searchable experience.\n\nReaders can browse by topic or explore featured resources. Editorial teams can organize resources using structured metadata.',tags:['launch','resources'],updatedAt:offsetDate(-2),publishAt:isoDay(7)},
    {id:'demo-004',title:'Healthy habits: small steps that stick',type:'Guide',section:'Health & wellbeing',owner:'Morgan Patel',status:'Draft',summary:'A plain-language guide to building sustainable daily routines.',body:'Small, consistent actions are often easier to maintain than dramatic changes. Start by choosing one achievable habit and identifying when it fits into a typical day.',tags:['wellbeing','habits'],updatedAt:offsetDate(-3),publishAt:null},
    {id:'demo-005',title:'Making digital resources easier to find',type:'Resource',section:'Resources',owner:'Avery Chen',status:'In review',summary:'A resource that outlines how naming, tagging, and structured fields improve discoverability.',body:'A resource library is only useful when readers can find what they need. Start with consistent names and practical categories.\n\nStructured metadata helps content stay discoverable as the library grows. Editorial teams need simple, predictable fields rather than a large collection of optional labels.',tags:['search','metadata'],updatedAt:offsetDate(-4),publishAt:null},
    {id:'demo-006',title:'Behind the scenes: content model updates',type:'Announcement',section:'Platform updates',owner:'Jordan Lee',status:'Published',summary:'What changed in the content model and why those changes matter to contributors.',body:'We refined several content fields to support consistent reuse across channels. The updated model places more emphasis on meaningful summaries, ownership, and predictable taxonomies.\n\nContributors should notice fewer ambiguous fields and clearer publishing expectations.',tags:['content model','product'],updatedAt:offsetDate(-5),publishAt:null},
    {id:'demo-007',title:'Editorial review checklist',type:'Resource',section:'Resources',owner:'Taylor Morgan',status:'Draft',summary:'A checklist for quality, readability, and consistency prior to publication.',body:'Before publication, review the title, summary, links, accessibility, and supporting metadata. Confirm that information is accurate and ownership is clear.',tags:['quality','workflow'],updatedAt:offsetDate(-6),publishAt:null},
    {id:'demo-008',title:'Supporting multilingual content teams',type:'Article',section:'Education',owner:'Morgan Patel',status:'Scheduled',summary:'A look at workflows that help international contributors coordinate changes and translations.',body:'Multilingual publishing needs more than translated text. Teams must coordinate regional owners, review states, and content relationships.\n\nA good authoring experience makes those dependencies visible and prevents accidental updates to unreviewed translations.',tags:['localization','workflow'],updatedAt:offsetDate(-7),publishAt:isoDay(12)}
  ];
  function normalize(item) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
    const title = String(item.title ?? '').trim().slice(0,140);
    if (!title) return null;
    return {
      id: /^[a-zA-Z0-9-]{1,80}$/.test(String(item.id || '')) ? item.id : createId(),
      title,
      type: TYPES.includes(item.type) ? item.type : 'Article',
      section: SECTIONS.includes(item.section) ? item.section : 'Resources',
      owner: String(item.owner ?? 'Editorial team').trim().slice(0,70) || 'Editorial team',
      status: STATUSES.includes(item.status) ? item.status : 'Draft',
      summary: String(item.summary ?? '').slice(0,260),
      body: String(item.body ?? '').slice(0,30000),
      tags: Array.isArray(item.tags) ? item.tags.slice(0,12).map(t=>String(t).trim().slice(0,30)).filter(Boolean) : [],
      slug: slugify(item.slug || title),
      updatedAt: !Number.isNaN(Date.parse(item.updatedAt)) ? item.updatedAt : new Date().toISOString(),
      publishAt: /^\d{4}-\d{2}-\d{2}$/.test(item.publishAt || '') ? item.publishAt : null
    };
  }
  function createId() {return 'item-' + (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now()+'-'+Math.floor(Math.random()*100000));}
  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.slice(0,500).map(normalize).filter(Boolean);
      }
    } catch (err) {console.warn('Unable to load saved demo data:',err);}
    return sampleItems().map(normalize);
  }
  let items = load();
  let view = 'overview';
  let toastTimer;
  let slugModified = false;
  function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(items));return true;}catch(err){console.warn(err);showToast('Browser storage is unavailable. Export your work to save it.');return false;}}
  function showToast(message){const node=$('toast');node.textContent=message;node.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.classList.remove('visible'),3500);}
  function relativeDate(date) {
    const t = new Date(date).getTime();
    if (!Number.isFinite(t)) return 'Unknown';
    const d = Math.max(0,Math.floor((Date.now()-t)/86400000));
    if(d===0)return 'Today';if(d===1)return 'Yesterday';if(d<30)return `${d} days ago`;
    return new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric'}).format(t);
  }
  function getCounts(){return Object.fromEntries(STATUSES.map(status=>[status,items.filter(i=>i.status===status).length]));}
  function metricCard(label,value,note,color,icon){return `<div class="metric-card"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon ${color}">${icon}</span></div><div class="metric-value">${value}</div><div class="metric-note">${note}</div></div>`;}
  function renderMetrics(){const n=getCounts();$('metrics').innerHTML=[
    metricCard('Total content',items.length,'Across all types and sections','mint',icons.layers),
    metricCard('In review',n['In review'],'Awaiting editorial approval','amber',icons.clock),
    metricCard('Scheduled',n.Scheduled,'Planned for future release','purple',icons.document),
    metricCard('Published',n.Published,'Marked complete in workflow','blue',icons.check)
  ].join('');$('nav-count').textContent=items.length;$('review-count').textContent=n['In review'];$('attention-count').textContent=n['In review'];}
  function renderOverview(){const n=getCounts();$('workflow-bars').innerHTML=STATUSES.map(status=>`<div class="workflow-row"><div class="workflow-row-top"><span class="workflow-name">${status}</span><span class="workflow-number">${n[status]}</span></div><div class="bar-track"><div class="bar-fill" style="width:${items.length?100*n[status]/items.length:0}%;background:${COLORS[status]}"></div></div></div>`).join('');
    const queue=items.filter(i=>i.status==='In review').sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt)).slice(0,3);
    $('attention-list').innerHTML=queue.length?queue.map(i=>`<button type="button" class="attention-item" data-action="edit" data-id="${escapeHTML(i.id)}"><span class="attention-icon">${escapeHTML(i.type.charAt(0))}</span><span class="attention-copy"><span class="attention-title" style="display:block">${escapeHTML(i.title)}</span><span class="attention-meta" style="display:block">${escapeHTML(i.owner)} · ${relativeDate(i.updatedAt)}</span></span><span class="attention-arrow">↗</span></button>`).join(''):'<div class="preview-empty">No items awaiting review. Nice work!</div>';
  }
  function filteredItems(){const q=$('search-input').value.trim().toLocaleLowerCase();const status=$('status-filter').value;const type=$('type-filter').value;const sort=$('sort-select').value;return items.filter(item => {
    const matches = !q || [item.title,item.summary,item.owner,item.section,item.slug,...item.tags].join(' ').toLocaleLowerCase().includes(q);
    return matches&&(status==='All'||item.status===status)&&(type==='All'||item.type===type);
  }).sort((a,b)=>sort==='title-asc'?a.title.localeCompare(b.title):sort==='updated-asc'?new Date(a.updatedAt)-new Date(b.updatedAt):new Date(b.updatedAt)-new Date(a.updatedAt));}
  function renderTable(){const list=filteredItems();$('result-count').textContent=`${list.length} ${list.length===1?'item':'items'}`;
    $('content-tbody').innerHTML=list.map(item=>`<tr><td><div class="content-main"><span class="doc-icon">${icons.document}</span><div style="min-width:0"><button class="content-name" type="button" data-action="edit" data-id="${escapeHTML(item.id)}">${escapeHTML(item.title)}</button><div class="content-subline">${escapeHTML(item.owner)} · ${escapeHTML(item.tags.join(', ')||'No tags')}</div><div class="mobile-status"><span class="status-pill status-${item.status.toLowerCase().replace(/\s+/g,'-')}">${item.status}</span></div></div></div></td><td><div class="cell-primary">${escapeHTML(item.type)}</div><div class="cell-secondary">${escapeHTML(item.section)}</div></td><td><span class="status-pill status-${item.status.toLowerCase().replace(/\s+/g,'-')}">${item.status}</span></td><td><div class="cell-primary">${relativeDate(item.updatedAt)}</div><div class="cell-secondary">${escapeHTML(item.owner)}</div></td><td class="row-actions"><button type="button" class="mini-action" data-action="preview" data-id="${escapeHTML(item.id)}" aria-label="Preview ${escapeHTML(item.title)}">Preview</button></td></tr>`).join('');
    $('empty-state').hidden=list.length>0;$('content-tbody').parentElement.parentElement.hidden=list.length===0;
  }
  function render(){renderMetrics();renderOverview();renderTable();}
  function navigate(next){view=next;const overview=next==='overview';const review=next==='review';$('metrics').hidden=!overview;$('overview-panels').hidden=!overview; // hidden overrides display via CSS below
    $('page-title').innerHTML=overview?'Good morning, content team<span class="period">.</span>':review?'Review queue<span class="period">.</span>':'Content library<span class="period">.</span>';
    $('page-subtitle').textContent=overview?"A clear view of what's moving through your publishing workflow.":review?'Give pending content the attention it needs.':'Search, organize, and manage content across the workspace.';
    $('breadcrumb').textContent=overview?'Overview':review?'Review queue':'Content library';
    $('library-heading').textContent=review?'Awaiting review':overview?'Content library':'All content';
    $('library-description').textContent=review?'Items currently in the editorial review stage.':'Browse, organize and manage structured content.';
    document.querySelectorAll('[data-nav]').forEach(el=>{el.classList.toggle('active',el.dataset.nav===next);if(el.dataset.nav===next)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
    $('search-input').value='';$('type-filter').value='All';$('status-filter').value=review?'In review':'All';renderTable();
    if(!overview)$('library-panel').scrollIntoView({block:'nearest',behavior:'smooth'});
  }
  function openEditor(id){const item=items.find(i=>i.id===id);const isEdit=Boolean(item);$('editor-heading').textContent=isEdit?'Edit content record':'Create new content';$('delete-content-btn').hidden=!isEdit;$('edit-id').value=item?.id||'';$('field-title').value=item?.title||'';$('field-type').value=item?.type||'Article';$('field-section').value=item?.section||'Education';$('field-slug').value=item?.slug||'';$('field-summary').value=item?.summary||'';$('field-body').value=item?.body||'';$('field-owner').value=item?.owner||'Editorial team';$('field-tags').value=(item?.tags||[]).join(', ');$('field-status').value=item?.status||'Draft';$('field-publish-at').value=item?.publishAt||'';$('form-error').hidden=true;slugModified=isEdit;$('editor-dialog').showModal();$('field-title').focus();}
  function openPreview(id){const item=items.find(i=>i.id===id);if(!item)return;const container=$('preview-body');container.replaceChildren();function element(tag,text,className){const node=document.createElement(tag);if(className)node.className=className;node.textContent=text;container.append(node);return node;}
    element('div',`${item.section} / ${item.type}`,'preview-section');element('h1',item.title,'preview-title');if(item.summary)element('p',item.summary,'preview-summary');element('div',`By ${item.owner} · ${item.status}`,'preview-meta');
    const paras=item.body.trim().split(/\n\s*\n/).filter(Boolean);if(paras.length)paras.forEach(text=>element('p',text,'preview-paragraph'));else element('p','There is no body content yet.','preview-empty');
    $('preview-dialog').showModal();
  }
  function closeEditor(){$('editor-dialog').close();}
  function saveFromForm(event){event.preventDefault();const id=$('edit-id').value;const title=$('field-title').value.trim();const summary=$('field-summary').value.trim();const body=$('field-body').value.trim();const status=$('field-status').value;const planned=$('field-publish-at').value;
    let error='';if(!title)error='A title is required to save content.';else if((status==='In review'||status==='Scheduled'||status==='Published')&&(!summary||!body))error='Items in review, scheduled, or published need a summary and body content.';else if(status==='Scheduled'&&!planned)error='Choose a planned publish date for scheduled content.';
    if(error){$('form-error').textContent=error;$('form-error').hidden=false;return;}
    const current=items.find(item=>item.id===id);
    const updated=normalize({id:current?.id||createId(),title,type:$('field-type').value,section:$('field-section').value,owner:$('field-owner').value,status,summary,body,slug:$('field-slug').value.trim()||slugify(title),tags:$('field-tags').value.split(',').map(t=>t.trim()).filter(Boolean),updatedAt:new Date().toISOString(),publishAt:planned||null});
    if(current)items=items.map(i=>i.id===id?updated:i);else items.unshift(updated);
    persist();render();closeEditor();showToast(current?'Content updated successfully.':'New content created.');
  }
  function deleteCurrent(){const id=$('edit-id').value;const item=items.find(i=>i.id===id);if(!item)return;if(!window.confirm(`Delete "${item.title}"? This cannot be undone unless you have exported your data.`))return;items=items.filter(i=>i.id!==id);persist();render();closeEditor();showToast('Content deleted.');}
  function downloadJSON(){const data={app:'MT ContentLab',version:1,exportedAt:new Date().toISOString(),items};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='mt-contentlab-export.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);showToast('Content exported as JSON.');}
  async function handleImport(event){const file=event.target.files?.[0];event.target.value='';if(!file)return;if(file.size>2_000_000){showToast('Import must be smaller than 2 MB.');return;}
    try{const parsed=JSON.parse(await file.text());if(!parsed||!['MT ContentLab','ContentOps Lab'].includes(parsed.app)||parsed.version!==1||!Array.isArray(parsed.items)||parsed.items.length>500)throw new Error('Invalid MT ContentLab export');const imported=parsed.items.map(normalize);if(imported.some(x=>!x))throw new Error('Records missing required titles');const ids=new Set(imported.map(i=>i.id));if(ids.size!==imported.length)throw new Error('Duplicate content IDs');if(!window.confirm(`Replace the current ${items.length} records with ${imported.length} records from this file?`))return;items=imported;persist();render();navigate('overview');showToast('Data imported successfully.');}catch(err){console.warn(err);showToast('Import failed. Use a valid MT ContentLab JSON export.');}
  }
  function resetDemo(){if(!window.confirm('Reset all demo content? Your local changes will be lost. Export first if you want a backup.'))return;items=sampleItems().map(normalize);persist();navigate('overview');render();showToast('Original sample records restored.');}
  document.querySelectorAll('[data-nav]').forEach(btn=>btn.addEventListener('click',()=>navigate(btn.dataset.nav)));
  $('new-content-btn').addEventListener('click',()=>openEditor());
  $('view-all-btn').addEventListener('click',()=>navigate('library'));
  $('open-review-btn').addEventListener('click',()=>navigate('review'));
  $('reset-btn').addEventListener('click',resetDemo);
  $('export-btn').addEventListener('click',downloadJSON);
  $('import-btn').addEventListener('click',()=>$('import-file').click());
  $('import-file').addEventListener('change',handleImport);
  $('clear-filters-btn').addEventListener('click',()=>{if(view==='review')navigate('library');else{$('search-input').value='';$('status-filter').value='All';$('type-filter').value='All';renderTable();}});
  ['search-input','status-filter','type-filter','sort-select'].forEach(id=>$(id).addEventListener(id==='search-input'?'input':'change',renderTable));
  $('content-tbody').addEventListener('click',ev=>{const btn=ev.target.closest('[data-action]');if(!btn)return;btn.dataset.action==='preview'?openPreview(btn.dataset.id):openEditor(btn.dataset.id);});
  $('attention-list').addEventListener('click',ev=>{const btn=ev.target.closest('[data-action="edit"]');if(btn)openEditor(btn.dataset.id);});
  $('close-editor').addEventListener('click',closeEditor);$('cancel-editor').addEventListener('click',closeEditor);$('editor-form').addEventListener('submit',saveFromForm);$('delete-content-btn').addEventListener('click',deleteCurrent);$('close-preview').addEventListener('click',()=>$('preview-dialog').close());
  $('field-title').addEventListener('input',()=>{if(!slugModified)$('field-slug').value=slugify($('field-title').value);});
  $('field-slug').addEventListener('input',()=>{slugModified=true;});
  // Keep native dialog modality; close when clicking outside its content.
  [$('editor-dialog'),$('preview-dialog')].forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();}));
  render();
})();
