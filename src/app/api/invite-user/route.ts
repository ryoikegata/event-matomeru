import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE as string
);

export async function POST(req: Request) {
  try {
    const { email, tenant_id, role_id } = await req.json();

    if (!email || !tenant_id) {
      return NextResponse.json(
        { error: "Email and Tenant ID are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      email,
      {
        data: {
          name: "",
          tenant_id,
          role_id: Number(role_id),
        },
        redirectTo: `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/login?tenant_id=${tenant_id}&role_id=${Number(role_id)}`,
      }
    );

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Invitation sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
