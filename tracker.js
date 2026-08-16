(function () {
  // =====================================================
  // CONFIGURAÇÃO — Projeto CHAT (nova oferta)
  // =====================================================
  const SUPABASE_URL      = "https://ubqjrrssgmonlccumgyu.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicWpycnNzZ21vbmxjY3VtZ3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwOTgzMzksImV4cCI6MjA5NTY3NDMzOX0.SY4YxCfywNwMcA3qrOXdzM3j5ABAO3RWc9rJFHWC6eQ";
  const TABLE             = "funnel_events";
  const TOKEN             = "98f664fb28793c678b29305b881efaf62f3b00e055b3bb70ce1c046096472cba";

  // =====================================================
  // PROTEÇÃO — bloqueia envios de domínios não autorizados
  // =====================================================
  const DOMINIOS_PERMITIDOS = [
    "aberto-convespaco.shop",
    "www.aberto-convespaco.shop",
    "aces-atend-agora.online",
    "www.aces-atend-agora.online",
    "atende-espacoaberto.shop",
    "www.atende-espacoaberto.shop",
    "atende-garant.online",
    "www.atende-garant.online",
    "atendimento-abert.online",
    "www.atendimento-abert.online",
    "atendimento-integral.online",
    "www.atendimento-integral.online",
    "espaco-atende.shop",
    "www.espaco-atende.shop",
    "integral-espaco.online",
    "www.integral-espaco.online",
    "permit-aces-atende.shop",
    "www.permit-aces-atende.shop",
    "atende-chamd.online",
    "www.atende-chamd.online",
    "atende-comp.online",
    "www.atende-comp.online",
    "atende-desen.online",
    "www.atende-desen.online",
    "atende-prioridad.online",
    "www.atende-prioridad.online",
    "atende-total.online",
    "www.atende-total.online",
    "atendi-inicial.online",
    "www.atendi-inicial.online",
    "atendimen-desen.online",
    "www.atendimen-desen.online",
    "atendiment-acesso.online",
    "www.atendiment-acesso.online",
    "atendiment-espac.online",
    "www.atendiment-espac.online",
    "atendiment-segur.online",
    "www.atendiment-segur.online",
    "atendimento-espaco.online",
    "www.atendimento-espaco.online",
    "atendimento-hoje.online",
    "www.atendimento-hoje.online",
    "atendimento-inicio.online",
    "www.atendimento-inicio.online",
    "atendimento-ofici.online",
    "www.atendimento-ofici.online",
    "atendimento-plataform.online",
    "www.atendimento-plataform.online",
    "atendiment-ingres.online",
    "www.atendiment-ingres.online",
    "atende-imediat.online",
    "www.atende-imediat.online",
    "atendiment-acessar.online",
    "www.atendiment-acessar.online",
    "antend-perf.online",
    "www.antend-perf.online",
    "antendimento-gerad.online",
    "www.antendimento-gerad.online",
    "antende-avanc.online",
    "www.antende-avanc.online",
    "atendi-rapid.online",
    "www.atendi-rapid.online",
    "atendiment-rapid.online",
    "www.atendiment-rapid.online",
    "atende-aberto.online",
    "www.atende-aberto.online",
    "atende-seguro.online",
    "www.atende-seguro.online",
    "atendi-top.online",
    "www.atendi-top.online",
    "atendimento-seguro.online",
    "www.atendimento-seguro.online",
    "espaco-atendi.online",
    "www.espaco-atendi.online",
    "espaco-atende.online",
    "www.espaco-atende.online",
    "abert-atende.online",
    "www.abert-atende.online",
    "aberto-antendimento.online",
    "www.aberto-antendimento.online",
    "seguro-atende.online",
    "www.seguro-atende.online",
    "projeto-atendimento.online",
    "www.projeto-atendimento.online",
    "atendimen-agor.online",
    "www.atendimen-agor.online",
    "atende-sucesso.online",
    "www.atende-sucesso.online",
    "atendiment-valo.online",
    "www.atendiment-valo.online",
    "atend-ofic.online",
    "www.atend-ofic.online",
    "atende-registr.online",
    "www.atende-registr.online",
    "atendiment-exat.online",
    "www.atendiment-exat.online",
    "atendimento-ja.online",
    "www.atendimento-ja.online",
    "atend-agor.online",
    "www.atend-agor.online",
    "atend-hoj.online",
    "www.atend-hoj.online",
    "atende-confirmacao.online",
    "www.atende-confirmacao.online",
    "atende-suces.online",
    "www.atende-suces.online",
    "atend-atualiza.online",
    "www.atend-atualiza.online",
    "atend-top.online",
    "www.atend-top.online",
    "atendi-agil.online",
    "www.atendi-agil.online",
    "atendi-agor.online",
    "www.atendi-agor.online",
    "atendi-entrar.online",
    "www.atendi-entrar.online",
    "atendiment-agiliz.online",
    "www.atendiment-agiliz.online",
    "atendiment-abert.online",
    "www.atendiment-abert.online",
    "atendimento-atualizado.online",
    "www.atendimento-atualizado.online",
  ];

  if (!DOMINIOS_PERMITIDOS.includes(window.location.hostname)) {
    return; // domínio não autorizado — encerra silenciosamente
  }

  // =====================================================
  // MAPA DO FUNIL
  // =====================================================
  const FUNNEL_STEPS = {
    // Etapa 1 — Início
    "/":                     "inicio",
    "/index.htm":            "inicio",
    // Etapa 2 — Entrar
    "/entrar":               "entrar",
    "/entrar/":              "entrar",
    "/entrar/index.htm":     "entrar",
    // Etapa 3 — Chat
    "/chat":                 "chat",
    "/chat/":                "chat",
    "/chat/index.htm":       "chat",
  };

  // =====================================================
  // CONTROLE INTERNO
  // =====================================================
  let sessionStartedAt = Date.now();

  // =====================================================
  // UTILITÁRIOS
  // =====================================================
  function generateId(prefix) {
    return prefix + "_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
  }

  function getLeadId() {
    let id = localStorage.getItem("lead_id");
    if (!id) { id = generateId("lead"); localStorage.setItem("lead_id", id); }
    return id;
  }

  function getSessionId() {
    let id = sessionStorage.getItem("session_id");
    if (!id) { id = generateId("sess"); sessionStorage.setItem("session_id", id); }
    return id;
  }

  function getCurrentStep() {
    const path = window.location.pathname;
    // Tenta match exato primeiro, depois sem barra final, depois com barra
    return FUNNEL_STEPS[path]
      || FUNNEL_STEPS[path.replace(/\/+$/, "")]
      || FUNNEL_STEPS[path.replace(/\/+$/, "") + "/"]
      || null;
  }

  function persistUtms() {
    const params = new URLSearchParams(window.location.search);
    ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"].forEach(k => {
      const v = params.get(k);
      // Ignora macros do Google Ads não substituídas (ex: "{campaignid}")
      if (v && !/^\{.*\}$/.test(v.trim())) {
        localStorage.setItem(k, v);
      }
    });
  }

  function getUtms() {
    return {
      source:   localStorage.getItem("utm_source")   || "",
      medium:   localStorage.getItem("utm_medium")   || "",
      campaign: localStorage.getItem("utm_campaign") || "",
      term:     localStorage.getItem("utm_term")     || "",
      content:  localStorage.getItem("utm_content")  || "",
    };
  }

  function getDevice() {
    const ua = navigator.userAgent || "";
    return {
      type:   /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ? "mobile" : "desktop",
      screen: window.screen ? window.screen.width + "x" + window.screen.height : "",
      lang:   navigator.language || "",
    };
  }

  function getLeadData() {
    // Tenta ler de "leadData" (chave usada na confirmação)
    let apiData = {};
    try {
      const raw = localStorage.getItem("leadData") || localStorage.getItem("userData");
      if (raw) apiData = JSON.parse(raw);
    } catch(e) {}
    return {
      nome:     apiData.nome || apiData.NOME || localStorage.getItem("nome") || "",
      cpf:      apiData.cpf  || apiData.CPF  || localStorage.getItem("cpf")  || "",
      email:    localStorage.getItem("email")    || "",
      telefone: localStorage.getItem("telefone") || "",
    };
  }



  // =====================================================
  // ENVIO PARA SUPABASE
  // =====================================================
  function send(eventName, extra) {
    const step    = getCurrentStep();
    const payload = {
      event:      eventName,
      event_at:   new Date().toISOString(),
      lead_id:    getLeadId(),
      session_id: getSessionId(),
      step:       step,
      page_path:  window.location.pathname,
      utms:       getUtms(),
      device:     getDevice(),
      lead_data:  getLeadData(),
      hostname:   window.location.hostname,
      token:      TOKEN,
      extra:      extra || {},
    };

    const body    = JSON.stringify(payload);
    const url     = SUPABASE_URL + "/rest/v1/" + TABLE;
    const headers = {
      "Content-Type":  "application/json",
      "apikey":        SUPABASE_ANON_KEY,
      "Authorization": "Bearer " + SUPABASE_ANON_KEY,
      "Prefer":        "return=minimal",
    };

    fetch(url, { method: "POST", headers, body, keepalive: true })
      .catch(() => {});
  }

  // =====================================================
  // FUNÇÕES PÚBLICAS
  // =====================================================
  window.trackEvent = function (eventName, extra) {
    send(eventName, extra || {});
  };

  window.trackAdvance = function (toStep, extra) {
    send("step_advance", Object.assign({ to_step: toStep || "" }, extra || {}));
  };

  window.trackApi = function (stage, status, extra) {
    send("api_" + stage, Object.assign({ api_status: status }, extra || {}));
  };

  window.trackFormSubmit = function (formName, extra) {
    send("form_submitted", Object.assign({ form_name: formName || "" }, extra || {}));
  };

  window.trackCheckoutClick = function (extra) {
    // Força step="checkout" no payload para o dashboard contabilizar corretamente
    const step = getCurrentStep();
    const payload = {
      event:      "page_view",
      event_at:   new Date().toISOString(),
      lead_id:    getLeadId(),
      session_id: getSessionId(),
      step:       "checkout",
      page_path:  window.location.pathname,
      utms:       getUtms(),
      device:     getDevice(),
      lead_data:  getLeadData(),
      hostname:   window.location.hostname,
      token:      TOKEN,
      extra:      extra || {},
    };
    const body = JSON.stringify(payload);
    const url  = SUPABASE_URL + "/rest/v1/" + TABLE;
    const headers = {
      "Content-Type":  "application/json",
      "apikey":        SUPABASE_ANON_KEY,
      "Authorization": "Bearer " + SUPABASE_ANON_KEY,
      "Prefer":        "return=minimal",
    };
    fetch(url, { method: "POST", headers, body, keepalive: true }).catch(() => {});
  };

  // =====================================================
  // AUTO-TRACKING
  // =====================================================
  function trackPageView() {
    const step = getCurrentStep();
    send("page_view", { step_name: step }); // único evento por página
  }

  function watchClicks() {
    // Só captura cliques em elementos com data-track-event explícito
    document.addEventListener("click", function (e) {
      const el = e.target.closest("[data-track-event]");
      if (!el) return;
      send(el.getAttribute("data-track-event"), {
        label:     el.getAttribute("data-track-label") || el.innerText.trim().slice(0, 80),
        next_step: el.getAttribute("data-track-next-step") || "",
      });
    });
  }





  // =====================================================
  // INICIALIZAÇÃO
  // =====================================================
  function init() {
    persistUtms();
    if (!localStorage.getItem("entry_at")) {
      localStorage.setItem("entry_at",   new Date().toISOString());
      localStorage.setItem("first_page", window.location.pathname);
    }
    trackPageView();
    watchClicks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();