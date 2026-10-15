// Optional live AI integration. Configure AI_GATEWAY_API_KEY in Vercel to enable.
// Without credentials, client-side guided demo replies stay active.
module.exports=async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  const message=typeof req.body?.message==='string'?req.body.message.trim():'';
  if(!message||message.length>450)return res.status(400).json({error:'Please send a message (1–450 characters).'});
  const key=process.env.AI_GATEWAY_API_KEY;
  if(!key)return res.status(503).json({error:'Live AI not configured; use guided demo.'});
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),8500);
  try{
    const response=await fetch('https://ai-gateway.vercel.sh/v1/chat/completions',{
      method:'POST',signal:controller.signal,
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},
      body:JSON.stringify({model:process.env.AI_GATEWAY_MODEL||'openai/gpt-4o-mini',max_tokens:240,temperature:.5,messages:[
        {role:'system',content:'You are ECHO, a concise creative studio concierge for fictional Atlanta studio concept ROOM 808. Never claim this is a real studio or that a live reservation is confirmed. Rooms: The Booth $60/hour (vocal suite), Red Room $90/hour (flagship), Penthouse $125/hour (large creative suite). Engineer included in every room. Optional hourly producer add-ons: Kai Vice trap $60, Nova Blu R&B $55, Mars 808 experimental hip-hop $50, Juno Rae vocal engineering $45. Mixing/mastering service concept from $100 per track. Direct people to the Book Session tab to create browser-local demo bookings. Never claim to check live calendar availability. Answer warmly and briefly, usually 2–4 sentences.'},
        {role:'user',content:message}
      ]})
    });
    if(!response.ok)return res.status(502).json({error:'AI service unavailable.'});
    const data=await response.json();const reply=data?.choices?.[0]?.message?.content;
    if(typeof reply!=='string')return res.status(502).json({error:'Empty AI response.'});
    return res.status(200).json({reply,mode:'live'});
  }catch{return res.status(502).json({error:'AI service unavailable.'});}finally{clearTimeout(timeout);}
};
