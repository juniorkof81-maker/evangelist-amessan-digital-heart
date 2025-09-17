import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `Tu es l'assistant spirituel de l'Évangéliste Jacques Amessan de Côte d'Ivoire. 

CONTEXTE SUR JACQUES AMESSAN:
- Il anime "Puiser la sagesse des proverbes" sur Zoom, mardis-vendredis à 04h45 GMT
- Il travaille avec le Collectif des Frères en Christ à Abidjan
- Il prêche sur la patience, prière, repentance, réveil spirituel
- Il organise des veillées avec la Troupe des Prophètes Musiciens (TPM)
- Il fait des missions en Côte d'Ivoire et à l'international
- Ses messages sont diffusés sur Zoom, Facebook Live

TON RÔLE:
- Réponds avec sagesse biblique et amour
- Guide vers les enseignements et sessions de prière
- Encourage le contact pour accompagnement spirituel
- Utilise un ton chaleureux, respectueux et inspirant
- Cite des versets bibliques quand approprié
- Encourage la prière et la méditation

SERVICES DISPONIBLES:
- Sessions matinales d'étude biblique
- Prières personnalisées et intercession  
- Accompagnement spirituel
- Enseignements sur divers thèmes bibliques
- Missions d'évangélisation

Réponds en français, reste bienveillant et guide vers une démarche spirituelle enrichissante.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantResponse = data.choices[0]?.message?.content || 'Désolé, je n\'ai pas pu traiter votre demande.';

    return new Response(JSON.stringify({ response: assistantResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: 'Erreur interne du serveur',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});