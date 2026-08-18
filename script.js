const entrar=document.getElementById('entrar'),abertura=document.getElementById('abertura'),site=document.getElementById('site'),header=document.getElementById('cabecalho');
const menuToggle=document.getElementById('menuToggle'),menu=document.getElementById('menuPrincipal');
entrar.addEventListener('click',()=>{abertura.style.display='none';site.classList.remove('oculto');window.scrollTo(0,0);});
function headerState(){if(site.classList.contains('oculto'))return;header.classList.toggle('fixo',window.scrollY>30)}
window.addEventListener('scroll',headerState,{passive:true});
if(menuToggle&&menu){
 menuToggle.addEventListener('click',()=>{const open=menu.classList.toggle('aberto');menuToggle.classList.toggle('aberto',open);menuToggle.setAttribute('aria-expanded',open?'true':'false')});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('aberto');menuToggle.classList.remove('aberto');menuToggle.setAttribute('aria-expanded','false')}));
}

/* V73 — revelação suave dos blocos de conteúdo ao rolar a página.
   Não altera nenhuma posição: apenas anima a opacidade (ver styles.css). */
(function(){
  var reduzMovimento=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var seletores=['.hero-copy','.ponte h2','.ponte p','.conteudo-duplo article','.entrelinhas-copy','.sentido-copy','.perguntas-copy','.escuta-esquerda','.escuta-direita','.mudanca-pergunta','.mudanca-conteudo','.mudanca-destaque','.atendimento-titulo','.atendimento-passo','.atendimento-fecho'];
  var alvos=document.querySelectorAll(seletores.join(','));
  if(!alvos.length)return;
  if(reduzMovimento||!('IntersectionObserver' in window)){
    alvos.forEach(function(el){el.classList.add('reveal','in-view')});
    return;
  }
  alvos.forEach(function(el){el.classList.add('reveal')});
  var obs=new IntersectionObserver(function(entradas){
    entradas.forEach(function(entrada){
      if(entrada.isIntersecting){entrada.target.classList.add('in-view');obs.unobserve(entrada.target)}
    });
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  alvos.forEach(function(el){obs.observe(el)});
})();
