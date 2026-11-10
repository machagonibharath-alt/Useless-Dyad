(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const list = $("property-list");
  if (!list) return;
  const configReady = Boolean(window.UD_SUPABASE_URL && window.UD_SUPABASE_ANON_KEY && window.supabase);
  const db = configReady ? window.supabase.createClient(window.UD_SUPABASE_URL, window.UD_SUPABASE_ANON_KEY) : null;
  const sample = [
    {id:"UD-001",title:"G+1 Independent House",property_type:"Independent House",locality:"Turkayamjal",city:"Hyderabad",price:12000000,area_sq_yards:150,floors:2,bedrooms:0,description:"New independent house near TCS Adibatla.",video_url:"https://youtu.be/E79koeAgsaA",photos:["https://img.youtube.com/vi/E79koeAgsaA/hqdefault.jpg"],status:"available"},
    {id:"UD-002",title:"2 BHK Independent House",property_type:"Independent House",locality:"Nadergul",city:"Hyderabad",price:7400000,bedrooms:2,description:"Independent 2 BHK house in Nadergul.",video_url:"https://youtu.be/K_PAbQWEpQM",photos:["https://img.youtube.com/vi/K_PAbQWEpQM/hqdefault.jpg"],status:"available"},
    {id:"UD-003",title:"G+1 Independent House",property_type:"Independent House",locality:"Turkayamjal",city:"Hyderabad",price:13900000,area_sq_yards:200,floors:2,description:"New G+1 independent house near TCS Adibatla.",video_url:"https://youtu.be/4cgiVLTqe0w",photos:["https://img.youtube.com/vi/4cgiVLTqe0w/hqdefault.jpg"],status:"available"}
  ];
  let properties = [];
  const money = (n) => n >= 10000000 ? "₹" + (n / 10000000).toFixed(2).replace(/0+$/,"").replace(/\.$/,"") + " Cr" : "₹" + (n / 100000).toFixed(n % 100000 ? 1 : 0).replace(/\.0$/,"") + " Lakhs";
  const safe = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function card(p) {
    const image = (p.photos && p.photos[0]) || (p.video_url ? "https://img.youtube.com/vi/" + (p.video_url.match(/(?:v=|youtu\.be\/)([\w-]+)/)||[])[1] + "/hqdefault.jpg" : "");
    const specs = [];
    if (p.bedrooms) specs.push(p.bedrooms + " BHK");
    if (p.area_sq_yards) specs.push(p.area_sq_yards + " Sq Yards");
    if (p.floors) specs.push(p.floors + " Floors");
    if (p.bathrooms) specs.push(p.bathrooms + " Baths");
    const wa = "https://wa.me/" + (window.UD_WHATSAPP_NUMBER || "919949313533") + "?text=" + encodeURIComponent("Hi, I am interested in " + p.title + " (" + p.id + ") in " + p.locality + ". Please share details.");
    return '<article class="property-card"><div class="property-image"><a href="' + (p.video_url ? safe(p.video_url) : wa) + '" target="_blank" rel="noopener noreferrer"><img src="' + safe(image) + '" alt="' + safe(p.title) + '" loading="lazy"><span class="property-price">' + money(Number(p.price)||0) + '</span><span class="property-status">' + safe(p.status || "Available") + '</span></a></div><div class="property-info"><div class="property-id">' + safe(p.id || "UD LISTING") + '</div><h3>' + safe(p.title) + '</h3><div class="property-location">📍 ' + safe([p.locality,p.city].filter(Boolean).join(" • ")) + '</div><div class="property-details">' + specs.map(x=>"<span>"+safe(x)+"</span>").join("") + '</div>' + (p.description ? '<p class="property-description">' + safe(p.description) + '</p>' : '') + '<a href="' + wa + '" target="_blank" rel="noopener noreferrer" class="property-button whatsapp">Enquire on WhatsApp ↗</a>' + (p.video_url ? '<a href="' + safe(p.video_url) + '" target="_blank" rel="noopener noreferrer" class="property-button">▶ Property video</a>' : '') + '</div></article>';
  }
  function render() {
    const q = ($("property-search").value || "").trim().toLowerCase();
    const type = $("filter-type").value;
    const bhk = $("filter-bhk").value;
    const budget = Number($("filter-budget").value || 0);
    const filtered = properties.filter(p => p.status === "available" && (!q || [p.id,p.title,p.locality,p.city,p.description].join(" ").toLowerCase().includes(q)) && (!type || p.property_type === type) && (!bhk || (Number(p.bedrooms)||0) >= Number(bhk)) && (!budget || Number(p.price) <= budget));
    $("property-count").textContent = filtered.length + (filtered.length === 1 ? " property available" : " properties available");
    list.innerHTML = filtered.length ? filtered.map(card).join("") : '<p class="market-empty">No matching properties. Try changing your filters or message us on WhatsApp.</p>';
  }
  ["property-search","filter-type","filter-bhk","filter-budget"].forEach(id => $(id).addEventListener(id==="property-search"?"input":"change",render));
  async function load() {
    if (!configReady) {
      properties = sample;
      render();
      const note = document.createElement("p");
      note.className = "market-config-note";
      note.textContent = "Preview listings shown. Connect the database to publish and manage your live inventory.";
      list.after(note);
      return;
    }
    const {data,error} = await db.from("properties").select("*").eq("status","available").order("created_at",{ascending:false});
    if (error) { list.innerHTML = '<p class="market-empty">Property listings are temporarily unavailable. Please contact us on WhatsApp.</p>'; $("property-count").textContent="Unable to load listings"; return; }
    properties = data || [];
    render();
  }
  load();
})();
