// @ts-nocheck
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
        const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

        if (!supabaseUrl || !serviceRoleKey || !anonKey) {
            return new Response(JSON.stringify({ error: "Missing environment configuration." }), {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        const authHeader = req.headers.get("Authorization");

        if (!authHeader) {
            return new Response(JSON.stringify({ error: "Missing authorization header" }), {
                status: 401,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        // First verify the token with anon key client
        const anonClient = createClient(supabaseUrl, anonKey, {
            global: { headers: { Authorization: authHeader } }
        });

        const { data: { user }, error: userError } = await anonClient.auth.getUser();

        if (userError || !user) {
            console.error("Auth error:", userError);
            return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
                status: 401,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        // Now use service role for admin operations
        const supabase = createClient(supabaseUrl, serviceRoleKey, {
            auth: { persistSession: false }
        });

        // Delete user from approved_users table
        await supabase.from("approved_users").delete().eq("user_id", user.id);

        // Delete the user account
        const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);

        if (deleteError) {
            return new Response(JSON.stringify({ error: deleteError.message }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return new Response(JSON.stringify({ error: "An unexpected error occurred" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
    }
});
